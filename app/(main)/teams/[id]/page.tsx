'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { showToast } from '@/components/ui/Toast'
import Link from 'next/link'
import { use } from 'react'

function RoleBadge({ role }: { role: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    leader: { bg: 'rgba(201,151,58,0.15)', color: 'var(--accent)' },
    member: { bg: 'var(--bg-overlay)',     color: 'var(--text-muted)' },
  }
  const s = map[role] ?? map.member
  return <span style={{ fontSize: 9, padding: '2px 8px', borderRadius: 99, background: s.bg, color: s.color, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', flexShrink: 0 }}>{role}</span>
}

function ResourceCard({ href, label, icon }: { href: string; label: string; icon: string }) {
  return (
    <a href={href} target="_blank" rel="noopener" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 10, background: 'var(--bg-overlay)', border: '1px solid var(--border-subtle)', textDecoration: 'none', transition: 'all 0.15s' }}>
      <span style={{ fontSize: 16 }}>{icon}</span>
      <span style={{ fontSize: 13, color: 'var(--text-secondary)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{label}</span>
      <span style={{ fontSize: 11, color: 'var(--text-muted)', flexShrink: 0 }}>↗</span>
    </a>
  )
}

export default function TeamPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [team, setTeam]             = useState<any>(null)
  const [members, setMembers]       = useState<any[]>([])
  const [projects, setProjects]     = useState<any[]>([])
  const [userId, setUserId]         = useState<string | null>(null)
  const [myRole, setMyRole]         = useState<'leader' | 'member' | null>(null)
  const [loading, setLoading]       = useState(true)
  const [editing, setEditing]       = useState(false)
  const [activeSection, setSection] = useState<'projects' | 'members' | 'resources'>('projects')
  const [inviteUsername, setInviteU]= useState('')
  const [inviting, setInviting]     = useState(false)
  const [editName, setEditName]     = useState('')
  const [editDesc, setEditDesc]     = useState('')
  const [logoFile, setLogoFile]     = useState<File | null>(null)
  const [logoPreview, setLogoPrev]  = useState<string | null>(null)
  const [githubUrl, setGithubUrl]   = useState('')
  const [figmaUrl, setFigmaUrl]     = useState('')
  const [driveUrl, setDriveUrl]     = useState('')
  const [extraLinks, setExtraLinks] = useState<Array<{ label: string; url: string }>>([])
  const [newLinkLabel, setNewLinkLabel]    = useState('')
  const [newLinkUrl, setNewLinkUrl]      = useState('')

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) { window.location.href = '/login'; return }
      setUserId(user.id)
      await loadTeam(user.id)
    })
  }, [id])

  async function loadTeam(uid: string) {
    setLoading(true)
    const supabase = createClient()
    const { data: teamData } = await supabase.from('teams').select('*').eq('id', id).single()
    if (!teamData) { showToast('Team not found', 'error'); setLoading(false); return }
    setTeam(teamData)
    setEditName(teamData.name)
    setLogoPrev(teamData.logo_url ?? null)
    const raw = teamData.description ?? ''
    const sep = raw.indexOf(' ||| ')
    if (sep !== -1) {
      try {
        const meta = JSON.parse(raw.slice(sep + 5))
        setGithubUrl(meta.github ?? ''); setFigmaUrl(meta.figma ?? ''); setDriveUrl(meta.drive ?? ''); setExtraLinks(meta.extra ?? [])
        setEditDesc(raw.slice(0, sep))
      } catch { setEditDesc(raw) }
    } else setEditDesc(raw)

    const { data: membersData } = await supabase.from('team_members').select('*, profiles(id,username,avatar_url,full_name,github_url)').eq('team_id', id)
    setMembers(membersData ?? [])
    const me = (membersData ?? []).find((m: any) => m.profile_id === uid)
    setMyRole(me?.role ?? null)

    const { data: projectsData } = await supabase.from('projects').select('*, profiles!projects_submitted_by_fkey(username,avatar_url,full_name), project_tags(tags(id,name)), project_members(profile_id,profiles(id,username,avatar_url))').eq('team_id', id).eq('status', 'approved').order('created_at', { ascending: false })
    setProjects(projectsData ?? [])
    setLoading(false)
  }

  async function saveEdit() {
    const supabase = createClient()
    let logoUrl = team.logo_url
    if (logoFile) {
      const ext = logoFile.name.split('.').pop()
      const path = `${id}-${Date.now()}.${ext}`
      const { error } = await supabase.storage.from('team-logos').upload(path, logoFile, { upsert: true })
      if (!error) { const { data } = supabase.storage.from('team-logos').getPublicUrl(path); logoUrl = data.publicUrl }
    }
    const meta = JSON.stringify({ github: githubUrl.trim(), figma: figmaUrl.trim(), drive: driveUrl.trim(), extra: extraLinks })
    const fullDesc = editDesc.trim() ? `${editDesc.trim()} ||| ${meta}` : ` ||| ${meta}`
    await supabase.from('teams').update({ name: editName.trim(), description: fullDesc, logo_url: logoUrl }).eq('id', id)
    showToast('Team updated!', 'success'); setEditing(false); await loadTeam(userId!)
  }

  async function leaveTeam() {
    if (!confirm('Leave this team?')) return
    const supabase = createClient()
    await supabase.from('team_members').delete().eq('team_id', id).eq('profile_id', userId!)
    window.location.href = '/teams'
  }

  async function deleteTeam() {
    if (!confirm('Delete this team permanently?')) return
    const supabase = createClient()
    await supabase.from('teams').delete().eq('id', id)
    window.location.href = '/teams'
  }

  async function inviteMember() {
    if (!inviteUsername.trim()) return
    setInviting(true)
    const supabase = createClient()
    const { data: profile } = await supabase.from('profiles').select('id').eq('username', inviteUsername.trim().toLowerCase()).maybeSingle()
    if (!profile) { showToast('User not found', 'error'); setInviting(false); return }
    const already = members.some((m: any) => m.profile_id === profile.id)
    if (already) { showToast('Already a member', 'error'); setInviting(false); return }
    await supabase.from('team_invitations').insert({ team_id: id, invited_by: userId!, invited_user: profile.id })
    showToast('Invitation sent!', 'success'); setInviteU(''); setInviting(false)
  }

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', flexDirection: 'column', gap: 12 }}>
      <div style={{ fontSize: 28, opacity: 0.2 }}>◎</div>
      <div style={{ color: 'var(--text-muted)', fontSize: 14 }}>Loading workspace…</div>
    </div>
  )

  const isLeader = myRole === 'leader'
  const isMember = !!myRole
  const displayDesc = team.description?.includes(' ||| ') ? team.description.slice(0, team.description.indexOf(' ||| ')) : team.description ?? ''
  const resources: Array<{ icon: string; label: string; href: string }> = []
  if (githubUrl) resources.push({ icon: '⌥', label: 'GitHub Repository', href: githubUrl })
  if (figmaUrl)  resources.push({ icon: '◈', label: 'Figma Design', href: figmaUrl })
  if (driveUrl)  resources.push({ icon: '◫', label: 'Google Drive', href: driveUrl })
  extraLinks.forEach(l => resources.push({ icon: '◎', label: l.label, href: l.url }))

  const activity: Array<{ icon: string; text: string; time: string }> = []
  projects.slice(0, 3).forEach(p => activity.push({ icon: '◫', text: `Submitted: ${p.title}`, time: new Date(p.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) }))
  members.slice(0, 2).forEach(m => activity.push({ icon: '⊕', text: `@${m.profiles?.username} joined`, time: new Date(m.joined_at ?? team.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) }))

  const sBtn = (s: typeof activeSection) => ({
    padding: '8px 12px', border: 'none', borderRadius: 8, cursor: 'pointer',
    background: activeSection === s ? 'var(--accent-dim)' : 'transparent',
    color: activeSection === s ? 'var(--accent)' : 'var(--text-secondary)',
    fontFamily: 'inherit', fontSize: 12, fontWeight: activeSection === s ? 500 : 400, transition: 'all 0.15s', whiteSpace: 'nowrap' as const,
  })

  return (
    <div style={{ width: '100%', paddingBottom: 80 }}>

      {/* HERO BANNER */}
      <div style={{ background: 'linear-gradient(135deg, var(--bg-surface), var(--bg-overlay))', borderBottom: '1px solid var(--border-subtle)', padding: 'clamp(20px,4vw,40px) clamp(16px,4vw,48px) clamp(16px,3vw,32px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, fontSize: 13 }}>
            <Link href="/teams" style={{ color: 'var(--text-muted)' }}>Teams</Link>
            <span style={{ color: 'var(--border)' }}>›</span>
            <span style={{ color: 'var(--text-secondary)' }}>{team.name}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ width: 64, height: 64, borderRadius: 16, flexShrink: 0, background: 'var(--bg-elevated)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, color: 'var(--accent)', border: '2px solid var(--border-subtle)' }}>
              {team.logo_url ? <img src={team.logo_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" /> : team.name[0]?.toUpperCase()}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h1 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 400, lineHeight: 1, marginBottom: 6 }}>{team.name}</h1>
              {displayDesc && <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{displayDesc}</p>}
              {/* Member avatars */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex' }}>
                  {members.slice(0, 5).map((m, i) => (
                    <div key={m.profile_id} style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--bg-overlay)', overflow: 'hidden', border: '2px solid var(--bg-surface)', marginLeft: i > 0 ? -9 : 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: 'var(--accent)', position: 'relative', zIndex: members.length - i }}>
                      {m.profiles?.avatar_url ? <img src={m.profiles.avatar_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" /> : m.profiles?.username?.[0]?.toUpperCase()}
                    </div>
                  ))}
                </div>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{members.length} members</span>
                {isMember && myRole && <RoleBadge role={myRole} />}
              </div>
            </div>
            {/* Actions */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {isLeader && <button onClick={() => setEditing(o => !o)} style={{ padding: '9px 16px', borderRadius: 10, fontSize: 12, background: editing ? 'var(--bg-overlay)' : 'var(--accent-dim)', border: `1px solid ${editing ? 'var(--border)' : 'var(--accent)'}`, cursor: 'pointer', fontFamily: 'inherit', color: editing ? 'var(--text-secondary)' : 'var(--accent)', fontWeight: 500 }}>{editing ? '✕ Cancel' : '✎ Edit'}</button>}
              {!isLeader && isMember && <button onClick={leaveTeam} style={{ padding: '9px 16px', borderRadius: 10, fontSize: 12, background: 'none', border: '1px solid var(--danger)', cursor: 'pointer', fontFamily: 'inherit', color: 'var(--danger)' }}>Leave</button>}
              {isLeader && <button onClick={deleteTeam} style={{ padding: '9px 16px', borderRadius: 10, fontSize: 12, background: 'none', border: '1px solid var(--border)', cursor: 'pointer', fontFamily: 'inherit', color: 'var(--text-muted)' }}>Delete</button>}
            </div>
          </div>
        </div>
      </div>

      {/* STATS BAR */}
      <div style={{ display: 'flex', gap: 1, background: 'var(--border)', borderBottom: '1px solid var(--border)' }}>
        {[{ label: 'Projects', value: projects.length }, { label: 'Members', value: members.length }, { label: 'Resources', value: resources.length }].map(({ label, value }) => (
          <div key={label} style={{ flex: 1, background: 'var(--bg-surface)', padding: '12px 10px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 24, fontWeight: 300 }}>{value}</div>
            <div style={{ fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 3 }}>{label}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: 'clamp(16px,3vw,32px) clamp(16px,4vw,48px)', maxWidth: 1100, margin: '0 auto' }}>

        {/* EDIT PANEL */}
        {editing && (
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 16, padding: 'clamp(16px,3vw,28px)', marginBottom: 24 }}>
            <h2 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 22, marginBottom: 20 }}>Edit Team</h2>
            <div style={{ display: 'grid', gap: 12 }}>
              <input value={editName} onChange={e => setEditName(e.target.value)} style={{ padding: '11px 14px', borderRadius: 10, width: '100%' }} />
              <textarea value={editDesc} onChange={e => setEditDesc(e.target.value)} rows={2} style={{ padding: '11px 14px', borderRadius: 10, resize: 'vertical', width: '100%' }} />
              {/* Logo */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {logoPreview && <div style={{ width: 44, height: 44, borderRadius: 10, overflow: 'hidden' }}><img src={logoPreview} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" /></div>}
                <label style={{ padding: '8px 16px', border: '1px solid var(--border)', borderRadius: 8, cursor: 'pointer', fontSize: 12, color: 'var(--text-secondary)', display: 'inline-block' }}>
                  <input type="file" accept="image/*" style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (f) { setLogoFile(f); setLogoPrev(URL.createObjectURL(f)) } }} />
                  {logoPreview ? 'Replace logo' : 'Upload logo'}
                </label>
              </div>
              {/* Resources */}
              <div style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Shared Resources</div>
              {[
                { label: '⌥ GitHub', val: githubUrl, set: setGithubUrl, ph: 'https://github.com/org/repo' },
                { label: '◈ Figma',  val: figmaUrl,  set: setFigmaUrl,  ph: 'https://figma.com/file/...' },
                { label: '◫ Drive',  val: driveUrl,  set: setDriveUrl,  ph: 'https://drive.google.com/...' },
              ].map(({ label, val, set, ph }) => (
                <div key={label} style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 8, alignItems: 'center' }}>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{label}</span>
                  <input value={val} onChange={e => set(e.target.value)} placeholder={ph} style={{ padding: '9px 12px', borderRadius: 8, width: '100%' }} />
                </div>
              ))}
              {/* Custom link */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr auto', gap: 8 }}>
                <input value={newLinkLabel} onChange={e => setNewLinkLabel(e.target.value)} placeholder="Label" style={{ padding: '9px 10px', borderRadius: 8 }} />
                <input value={newLinkUrl} onChange={e => setNewLinkUrl(e.target.value)} placeholder="https://…" style={{ padding: '9px 10px', borderRadius: 8 }} />
                <button onClick={() => { if (newLinkLabel && newLinkUrl) { setExtraLinks(p => [...p, { label: newLinkLabel, url: newLinkUrl }]); setNewLinkLabel(''); setNewLinkUrl('') } }} style={{ padding: '9px 12px', background: 'var(--accent-dim)', border: '1px solid var(--accent)', borderRadius: 8, cursor: 'pointer', fontFamily: 'inherit', color: 'var(--accent)', fontSize: 12 }}>+</button>
              </div>
              {/* Invite */}
              <div style={{ display: 'flex', gap: 8 }}>
                <input value={inviteUsername} onChange={e => setInviteU(e.target.value)} placeholder="Invite by @username" style={{ flex: 1, padding: '10px 14px', borderRadius: 10 }} onKeyDown={e => e.key === 'Enter' && inviteMember()} />
                <button onClick={inviteMember} disabled={inviting} style={{ padding: '10px 16px', background: 'var(--bg-overlay)', border: '1px solid var(--border)', borderRadius: 10, cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, color: 'var(--text-secondary)' }}>{inviting ? '…' : 'Invite'}</button>
              </div>
              <button onClick={saveEdit} style={{ padding: '12px', background: 'var(--accent)', color: '#1c1917', border: 'none', borderRadius: 10, cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 600 }}>Save Changes →</button>
            </div>
          </div>
        )}

        {/* SECTION TABS */}
        <div style={{ display: 'flex', gap: 4, background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: 4, marginBottom: 20, overflowX: 'auto', width: 'fit-content', maxWidth: '100%' }}>
          <button style={sBtn('projects')} onClick={() => setSection('projects')}>◫ Projects ({projects.length})</button>
          <button style={sBtn('members')} onClick={() => setSection('members')}>⊕ Members ({members.length})</button>
          <button style={sBtn('resources')} onClick={() => setSection('resources')}>◎ Resources ({resources.length})</button>
        </div>

        {/* PROJECTS */}
        {activeSection === 'projects' && (
          projects.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--bg-surface)', border: '2px dashed var(--border)', borderRadius: 16 }}>
              <div style={{ fontSize: 36, opacity: 0.2, marginBottom: 12 }}>◫</div>
              <h3 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 22, marginBottom: 8 }}>Start building together.</h3>
              {isMember && <Link href="/projects/submit" style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 600 }}>Submit first project →</Link>}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {projects.map((p: any) => {
                const tags = (p.project_tags ?? []).map((pt: any) => pt.tags).filter(Boolean)
                return (
                  <Link key={p.id} href={`/projects/${p.id}`} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 14, padding: '14px', display: 'flex', gap: 14, textDecoration: 'none', alignItems: 'center' }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 4 }}>
                        {tags.slice(0, 2).map((t: any) => <span key={t.id} className="tag-pill">{t.name}</span>)}
                      </div>
                      <div style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 18, fontWeight: 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</div>
                      {p.description && <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.description}</div>}
                    </div>
                    <span style={{ fontSize: 12, color: 'var(--accent)', flexShrink: 0 }}>★ {p.star_count}</span>
                  </Link>
                )
              })}
              {isMember && <Link href="/projects/submit" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '14px', borderRadius: 12, border: '2px dashed var(--border)', fontSize: 13, color: 'var(--text-muted)' }}>+ Submit another project</Link>}
            </div>
          )
        )}

        {/* MEMBERS */}
        {activeSection === 'members' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {members.map((m: any) => (
              <Link key={m.profile_id} href={`/profile/${m.profiles?.username}`} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 12, background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', textDecoration: 'none' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', flexShrink: 0, background: 'var(--bg-overlay)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, color: 'var(--accent)' }}>
                  {m.profiles?.avatar_url ? <img src={m.profiles.avatar_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" /> : m.profiles?.username?.[0]?.toUpperCase()}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>{m.profiles?.full_name || m.profiles?.username}</span>
                    <RoleBadge role={m.role} />
                    {m.profile_id === userId && <span style={{ fontSize: 9, color: 'var(--text-muted)', background: 'var(--bg-overlay)', padding: '1px 6px', borderRadius: 99 }}>You</span>}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>@{m.profiles?.username}</div>
                </div>
                <span style={{ fontSize: 18, color: 'var(--border)', flexShrink: 0 }}>›</span>
              </Link>
            ))}
            {/* Quick invite for leaders */}
            {isLeader && (
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                <input value={inviteUsername} onChange={e => setInviteU(e.target.value)} placeholder="Invite by @username" style={{ flex: 1, padding: '10px 14px', borderRadius: 10 }} onKeyDown={e => e.key === 'Enter' && inviteMember()} />
                <button onClick={inviteMember} disabled={inviting} style={{ padding: '10px 16px', background: 'var(--accent)', color: '#1c1917', border: 'none', borderRadius: 10, cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 600 }}>{inviting ? '…' : 'Invite'}</button>
              </div>
            )}
          </div>
        )}

        {/* RESOURCES */}
        {activeSection === 'resources' && (
          resources.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--bg-surface)', border: '2px dashed var(--border)', borderRadius: 16 }}>
              <div style={{ fontSize: 32, opacity: 0.2, marginBottom: 10 }}>◎</div>
              <div style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 20, marginBottom: 6 }}>No shared resources yet</div>
              {isLeader && <button onClick={() => setEditing(true)} style={{ fontSize: 13, color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>Add Resources →</button>}
            </div>
          ) : (
            <div style={{ display: 'grid', gap: 10 }}>
              {resources.map((r, i) => <ResourceCard key={i} href={r.href} label={r.label} icon={r.icon} />)}
            </div>
          )
        )}

        {/* Activity feed */}
        {activity.length > 0 && (
          <div style={{ marginTop: 28, background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 14, padding: '16px' }}>
            <div style={{ fontSize: 9, letterSpacing: '0.15em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 14 }}>Recent Activity</div>
            {activity.map((a, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '8px 0', borderBottom: i < activity.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
                <div style={{ width: 24, height: 24, borderRadius: 7, flexShrink: 0, background: 'var(--bg-overlay)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>{a.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{a.text}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
