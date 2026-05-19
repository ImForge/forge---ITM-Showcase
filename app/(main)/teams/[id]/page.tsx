'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { showToast } from '@/components/ui/Toast'
import Link from 'next/link'
import { use } from 'react'

// ─── ROLE BADGE ───────────────────────────────────────────────────────────
function RoleBadge({ role }: { role: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    leader:      { bg: 'rgba(201,151,58,0.15)', color: 'var(--accent)'   },
    admin:       { bg: 'rgba(185,64,64,0.12)',  color: 'var(--danger)'   },
    contributor: { bg: 'rgba(74,124,89,0.12)',  color: 'var(--success)'  },
    member:      { bg: 'var(--bg-overlay)',     color: 'var(--text-muted)' },
  }
  const s = map[role] ?? map.member
  return (
    <span style={{
      fontSize: 9, padding: '2px 8px', borderRadius: 99,
      background: s.bg, color: s.color,
      fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
    }}>
      {role}
    </span>
  )
}

// ─── RESOURCE LINK CARD ───────────────────────────────────────────────────
function ResourceCard({ href, label, icon }: { href: string; label: string; icon: string }) {
  return (
    <a href={href} target="_blank" rel="noopener" style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '10px 14px', borderRadius: 10,
      background: 'var(--bg-overlay)',
      border: '1px solid var(--border-subtle)',
      transition: 'all 0.15s', textDecoration: 'none',
    }}
    onMouseEnter={e => {
      const el = e.currentTarget as HTMLAnchorElement
      el.style.borderColor = 'var(--accent)'
      el.style.background = 'var(--accent-dim)'
    }}
    onMouseLeave={e => {
      const el = e.currentTarget as HTMLAnchorElement
      el.style.borderColor = 'var(--border-subtle)'
      el.style.background = 'var(--bg-overlay)'
    }}>
      <span style={{ fontSize: 16 }}>{icon}</span>
      <span style={{ fontSize: 13, color: 'var(--text-secondary)', flex: 1,
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {label}
      </span>
      <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>↗</span>
    </a>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────
export default function TeamPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  const [team, setTeam]             = useState<any>(null)
  const [members, setMembers]       = useState<any[]>([])
  const [projects, setProjects]     = useState<any[]>([])
  const [userId, setUserId]         = useState<string | null>(null)
  const [myRole, setMyRole]         = useState<'leader' | 'member' | null>(null)
  const [loading, setLoading]       = useState(true)
  const [editing, setEditing]       = useState(false)
  const [inviteUsername, setInviteU]= useState('')
  const [inviting, setInviting]     = useState(false)
  const [activeSection, setSection] = useState<'projects' | 'members' | 'resources'>('projects')

  // Edit form state
  const [editName, setEditName]     = useState('')
  const [editDesc, setEditDesc]     = useState('')
  const [logoFile, setLogoFile]     = useState<File | null>(null)
  const [logoPreview, setLogoPrev]  = useState<string | null>(null)

  // Resources state (stored as JSON in team description hack-free — uses separate fields)
  const [githubUrl, setGithubUrl]   = useState('')
  const [figmaUrl, setFigmaUrl]     = useState('')
  const [driveUrl, setDriveUrl]     = useState('')
  const [extraLinks, setExtraLinks] = useState<Array<{ label: string; url: string }>>([])
  const [newLinkLabel, setNewLinkLabel] = useState('')
  const [newLinkUrl, setNewLinkUrl]     = useState('')

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
    setEditDesc(teamData.description ?? '')
    setLogoPrev(teamData.logo_url ?? null)

    // Parse stored resource links from team metadata field
    // We store them as JSON in a dedicated pattern in description
    // Format: actual description ||| {"github":"...","figma":"...","drive":"...","extra":[...]}
    const raw = teamData.description ?? ''
    const sep = raw.indexOf(' ||| ')
    if (sep !== -1) {
      try {
        const meta = JSON.parse(raw.slice(sep + 5))
        setGithubUrl(meta.github ?? '')
        setFigmaUrl(meta.figma ?? '')
        setDriveUrl(meta.drive ?? '')
        setExtraLinks(meta.extra ?? [])
        setEditDesc(raw.slice(0, sep))
      } catch {}
    }

    const { data: membersData } = await supabase
      .from('team_members')
      .select('*, profiles(id,username,avatar_url,full_name,github_url)')
      .eq('team_id', id)
    setMembers(membersData ?? [])

    const me = (membersData ?? []).find((m: any) => m.profile_id === uid)
    setMyRole(me?.role ?? null)

    const { data: projectsData } = await supabase
      .from('projects')
      .select('*, profiles!projects_submitted_by_fkey(username,avatar_url,full_name), project_tags(tags(id,name)), project_members(profile_id,profiles(id,username,avatar_url))')
      .eq('team_id', id).eq('status', 'approved')
      .order('created_at', { ascending: false })
    setProjects(projectsData ?? [])
    setLoading(false)
  }

  async function saveEdit() {
    const supabase = createClient()
    let logoUrl = team.logo_url

    if (logoFile) {
      const ext  = logoFile.name.split('.').pop()
      const path = `${id}-${Date.now()}.${ext}`
      const { error } = await supabase.storage.from('team-logos').upload(path, logoFile, { upsert: true })
      if (!error) {
        const { data } = supabase.storage.from('team-logos').getPublicUrl(path)
        logoUrl = data.publicUrl
      }
    }

    // Serialize resource links into description
    const meta = JSON.stringify({
      github: githubUrl.trim(),
      figma:  figmaUrl.trim(),
      drive:  driveUrl.trim(),
      extra:  extraLinks,
    })
    const fullDesc = editDesc.trim()
      ? `${editDesc.trim()} ||| ${meta}`
      : ` ||| ${meta}`

    await supabase.from('teams').update({
      name:        editName.trim(),
      description: fullDesc,
      logo_url:    logoUrl,
    }).eq('id', id)

    showToast('Team updated!', 'success')
    setEditing(false)
    await loadTeam(userId!)
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
    const { data: profile } = await supabase.from('profiles')
      .select('id').eq('username', inviteUsername.trim().toLowerCase()).maybeSingle()
    if (!profile) { showToast('User not found', 'error'); setInviting(false); return }
    const already = members.some((m: any) => m.profile_id === profile.id)
    if (already) { showToast('Already a member', 'error'); setInviting(false); return }
    await supabase.from('team_invitations').insert({ team_id: id, invited_by: userId!, invited_user: profile.id })
    showToast('Invitation sent!', 'success')
    setInviteU('')
    setInviting(false)
  }

  function addExtraLink() {
    if (!newLinkLabel.trim() || !newLinkUrl.trim()) return
    setExtraLinks(prev => [...prev, { label: newLinkLabel.trim(), url: newLinkUrl.trim() }])
    setNewLinkLabel('')
    setNewLinkUrl('')
  }

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', flexDirection: 'column', gap: 12 }}>
      <div style={{ fontSize: 32, opacity: 0.2 }}>◎</div>
      <div style={{ color: 'var(--text-muted)', fontSize: 14 }}>Loading workspace…</div>
    </div>
  )

  const isLeader = myRole === 'leader'
  const isMember = !!myRole

  // Parse description display (strip metadata)
  const displayDesc = team.description
    ? team.description.includes(' ||| ')
      ? team.description.slice(0, team.description.indexOf(' ||| '))
      : team.description
    : ''

  // Collect all resource links
  const resources: Array<{ icon: string; label: string; href: string }> = []
  if (githubUrl) resources.push({ icon: '⌥', label: 'GitHub Repository', href: githubUrl })
  if (figmaUrl)  resources.push({ icon: '◈', label: 'Figma Design',        href: figmaUrl })
  if (driveUrl)  resources.push({ icon: '◫', label: 'Google Drive',         href: driveUrl })
  extraLinks.forEach(l => resources.push({ icon: '◎', label: l.label, href: l.url }))

  // Build activity from real data
  const activity: Array<{ icon: string; text: string; time: string }> = []
  projects.slice(0, 3).forEach(p => {
    activity.push({
      icon: '◫',
      text: `Submitted: ${p.title}`,
      time: new Date(p.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
    })
  })
  members.slice(0, 2).forEach(m => {
    activity.push({
      icon: '⊕',
      text: `@${m.profiles?.username} joined as ${m.role}`,
      time: new Date(m.joined_at ?? team.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
    })
  })
  activity.push({ icon: '◎', text: `Team created`, time: new Date(team.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) })

  const sectionBtn = (s: typeof activeSection, label: string) => ({
    padding: '9px 18px', border: 'none', borderRadius: 8, cursor: 'pointer',
    background: activeSection === s ? 'var(--accent-dim)' : 'transparent',
    color: activeSection === s ? 'var(--accent)' : 'var(--text-secondary)',
    fontFamily: 'inherit', fontSize: 13,
    fontWeight: activeSection === s ? 500 : 400,
    transition: 'all 0.15s',
  })

  return (
    <div style={{ padding: '0 0 80px', width: '100%' }}>

      {/* ─── HERO BANNER ─────────────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-overlay) 100%)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '40px 48px 32px',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Decorative background glow */}
        <div style={{
          position: 'absolute', top: -60, right: -60,
          width: 300, height: 300, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,151,58,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
            <Link href="/teams" style={{ fontSize: 13, color: 'var(--text-muted)' }}>Teams</Link>
            <span style={{ color: 'var(--border)', fontSize: 16 }}>›</span>
            <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{team.name}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24, flexWrap: 'wrap' }}>
            {/* Logo */}
            <div style={{
              width: 80, height: 80, borderRadius: 20, flexShrink: 0,
              background: 'var(--bg-elevated)', overflow: 'hidden',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 32, color: 'var(--accent)',
              border: '2px solid var(--border-subtle)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            }}>
              {team.logo_url
                ? <img src={team.logo_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                : team.name[0]?.toUpperCase()}
            </div>

            {/* Name + desc */}
            <div style={{ flex: 1, minWidth: 200 }}>
              <h1 style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 'clamp(36px, 5vw, 52px)',
                fontWeight: 400, lineHeight: 1, marginBottom: 8,
              }}>
                {team.name}
              </h1>
              {displayDesc && (
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: 560 }}>
                  {displayDesc}
                </p>
              )}

              {/* Inline member avatars */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 14 }}>
                <div style={{ display: 'flex' }}>
                  {members.slice(0, 6).map((m, i) => (
                    <div key={m.profile_id} style={{
                      width: 32, height: 32, borderRadius: '50%',
                      background: 'var(--bg-overlay)', overflow: 'hidden',
                      border: '2px solid var(--bg-surface)',
                      marginLeft: i > 0 ? -10 : 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 12, color: 'var(--accent)',
                      zIndex: members.length - i, position: 'relative',
                      flexShrink: 0,
                    }}>
                      {m.profiles?.avatar_url
                        ? <img src={m.profiles.avatar_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                        : m.profiles?.username?.[0]?.toUpperCase()}
                    </div>
                  ))}
                  {members.length > 6 && (
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%',
                      background: 'var(--accent-dim)', border: '2px solid var(--bg-surface)',
                      marginLeft: -10, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 10, color: 'var(--accent)', fontWeight: 700,
                      position: 'relative',
                    }}>
                      +{members.length - 6}
                    </div>
                  )}
                </div>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  {members.length} member{members.length !== 1 ? 's' : ''}
                </span>
                {isMember && myRole && (
                  <RoleBadge role={myRole} />
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'flex-start' }}>
              {isLeader && (
                <button onClick={() => setEditing(o => !o)} style={{
                  padding: '10px 18px', borderRadius: 10, fontSize: 13,
                  background: editing ? 'var(--bg-overlay)' : 'var(--accent-dim)',
                  border: `1px solid ${editing ? 'var(--border)' : 'var(--accent)'}`,
                  cursor: 'pointer', fontFamily: 'inherit',
                  color: editing ? 'var(--text-secondary)' : 'var(--accent)',
                  fontWeight: 500, transition: 'all 0.2s',
                }}>
                  {editing ? '✕ Cancel' : '✎ Edit'}
                </button>
              )}
              {!isLeader && isMember && (
                <button onClick={leaveTeam} style={{
                  padding: '10px 18px', borderRadius: 10, fontSize: 13,
                  background: 'none', border: '1px solid var(--danger)',
                  cursor: 'pointer', fontFamily: 'inherit', color: 'var(--danger)',
                }}>
                  Leave Team
                </button>
              )}
              {isLeader && (
                <button onClick={deleteTeam} style={{
                  padding: '10px 18px', borderRadius: 10, fontSize: 13,
                  background: 'none', border: '1px solid var(--border)',
                  cursor: 'pointer', fontFamily: 'inherit', color: 'var(--text-muted)',
                }}>
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ─── STATS BAR ───────────────────────────────────────────── */}
      <div style={{
        display: 'flex', gap: 1,
        background: 'var(--border)',
        borderBottom: '1px solid var(--border)',
      }}>
        {[
          { label: 'Projects',  value: projects.length },
          { label: 'Members',   value: members.length  },
          { label: 'Resources', value: resources.length },
          { label: 'Since',     value: new Date(team.created_at).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }) },
        ].map(({ label, value }) => (
          <div key={label} style={{
            flex: 1, background: 'var(--bg-surface)',
            padding: '14px 20px', textAlign: 'center',
          }}>
            <div style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 28, fontWeight: 300, color: 'var(--text-primary)', lineHeight: 1,
            }}>
              {value}
            </div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 4 }}>
              {label}
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '32px 48px', maxWidth: 1200, margin: '0 auto' }}>

        {/* ─── EDIT PANEL ──────────────────────────────────────── */}
        {editing && (
          <div className="animate-fade-up" style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 20, padding: '32px',
            marginBottom: 32,
          }}>
            <h2 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 26, marginBottom: 24 }}>
              Edit Team
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              {/* Left col */}
              <div style={{ display: 'grid', gap: 14 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>
                    Team Name
                  </label>
                  <input value={editName} onChange={e => setEditName(e.target.value)}
                    style={{ width: '100%', padding: '11px 14px', borderRadius: 10 }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>
                    Description
                  </label>
                  <textarea value={editDesc} onChange={e => setEditDesc(e.target.value)} rows={3}
                    style={{ width: '100%', padding: '11px 14px', borderRadius: 10, resize: 'vertical' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>
                    Team Logo
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    {logoPreview && (
                      <div style={{ width: 48, height: 48, borderRadius: 12, overflow: 'hidden' }}>
                        <img src={logoPreview} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                      </div>
                    )}
                    <label style={{
                      padding: '9px 18px', border: '1px solid var(--border)',
                      borderRadius: 8, cursor: 'pointer', fontSize: 12, color: 'var(--text-secondary)',
                      display: 'inline-block',
                    }}>
                      <input type="file" accept="image/*" style={{ display: 'none' }} onChange={e => {
                        const f = e.target.files?.[0]
                        if (f) { setLogoFile(f); setLogoPrev(URL.createObjectURL(f)) }
                      }} />
                      {logoPreview ? 'Replace logo' : 'Upload logo'}
                    </label>
                  </div>
                </div>
              </div>

              {/* Right col — Resources */}
              <div style={{ display: 'grid', gap: 14 }}>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: -6 }}>
                  Shared Resources
                </div>
                {[
                  { label: '⌥ GitHub URL',   val: githubUrl, set: setGithubUrl, ph: 'https://github.com/org/repo' },
                  { label: '◈ Figma URL',    val: figmaUrl,  set: setFigmaUrl,  ph: 'https://figma.com/file/...'  },
                  { label: '◫ Drive URL',    val: driveUrl,  set: setDriveUrl,  ph: 'https://drive.google.com/...' },
                ].map(({ label, val, set, ph }) => (
                  <div key={label}>
                    <label style={{ display: 'block', fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>{label}</label>
                    <input value={val} onChange={e => set(e.target.value)} placeholder={ph}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: 8 }} />
                  </div>
                ))}
                {/* Custom link */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr auto', gap: 6, alignItems: 'end' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>Label</label>
                    <input value={newLinkLabel} onChange={e => setNewLinkLabel(e.target.value)}
                      placeholder="Notion, Slides…" style={{ width: '100%', padding: '9px 10px', borderRadius: 8 }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>URL</label>
                    <input value={newLinkUrl} onChange={e => setNewLinkUrl(e.target.value)}
                      placeholder="https://…" style={{ width: '100%', padding: '9px 10px', borderRadius: 8 }} />
                  </div>
                  <button onClick={addExtraLink} style={{
                    padding: '9px 12px', background: 'var(--accent-dim)', border: '1px solid var(--accent)',
                    borderRadius: 8, cursor: 'pointer', fontFamily: 'inherit', color: 'var(--accent)', fontSize: 13,
                  }}>
                    + Add
                  </button>
                </div>
              </div>
            </div>

            {/* Invite + Save row */}
            <div style={{ display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap', alignItems: 'center', paddingTop: 20, borderTop: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', gap: 8, flex: 1, minWidth: 240 }}>
                <input value={inviteUsername} onChange={e => setInviteU(e.target.value)}
                  placeholder="Invite by @username"
                  style={{ flex: 1, padding: '10px 14px', borderRadius: 10 }}
                  onKeyDown={e => e.key === 'Enter' && inviteMember()} />
                <button onClick={inviteMember} disabled={inviting} style={{
                  padding: '10px 18px', background: 'var(--bg-overlay)', border: '1px solid var(--border)',
                  borderRadius: 10, cursor: 'pointer', fontFamily: 'inherit', fontSize: 13,
                  color: 'var(--text-secondary)',
                }}>
                  {inviting ? '…' : 'Invite'}
                </button>
              </div>
              <button onClick={saveEdit} style={{
                padding: '11px 28px', background: 'var(--accent)', color: '#1c1917',
                border: 'none', borderRadius: 10, cursor: 'pointer',
                fontFamily: 'inherit', fontSize: 13, fontWeight: 600,
              }}>
                Save Changes →
              </button>
            </div>
          </div>
        )}

        {/* ─── MAIN GRID: content + sidebar ────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 28, alignItems: 'start' }}>

          {/* LEFT — Main content */}
          <div>
            {/* Section tabs */}
            <div style={{
              display: 'flex', gap: 4,
              background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)',
              borderRadius: 12, padding: 4, marginBottom: 24, width: 'fit-content',
            }}>
              {(['projects', 'members', 'resources'] as const).map(s => (
                <button key={s} onClick={() => setSection(s)} style={sectionBtn(s, s)}>
                  {s === 'projects'  ? `◫ Projects (${projects.length})`   : ''}
                  {s === 'members'   ? `⊕ Members (${members.length})`     : ''}
                  {s === 'resources' ? `◎ Resources (${resources.length})` : ''}
                </button>
              ))}
            </div>

            {/* PROJECTS */}
            {activeSection === 'projects' && (
              projects.length === 0 ? (
                <div style={{
                  textAlign: 'center', padding: '64px 40px',
                  background: 'var(--bg-surface)',
                  border: '2px dashed var(--border)',
                  borderRadius: 20,
                }}>
                  <div style={{ fontSize: 48, opacity: 0.2, marginBottom: 16 }}>◫</div>
                  <h3 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 26, marginBottom: 8 }}>
                    Start building together.
                  </h3>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 24 }}>
                    Create your first collaborative project and it appears here.
                  </p>
                  {isMember && (
                    <Link href="/projects/submit" style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      padding: '12px 24px', borderRadius: 10,
                      background: 'var(--accent)', color: '#1c1917',
                      fontSize: 13, fontWeight: 600,
                    }}>
                      Submit First Project →
                    </Link>
                  )}
                </div>
              ) : (
                <div style={{ display: 'grid', gap: 14 }}>
                  {projects.map((p: any) => {
                    const tags = (p.project_tags ?? []).map((pt: any) => pt.tags).filter(Boolean)
                    const collabs = p.project_members ?? []
                    return (
                      <Link key={p.id} href={`/projects/${p.id}`} style={{
                        background: 'var(--bg-surface)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 16, padding: '20px',
                        display: 'block', textDecoration: 'none',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLAnchorElement
                        el.style.borderColor = 'var(--accent)'
                        el.style.boxShadow = '0 4px 20px rgba(201,151,58,0.1)'
                        el.style.transform = 'translateY(-1px)'
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLAnchorElement
                        el.style.borderColor = 'var(--border-subtle)'
                        el.style.boxShadow = 'none'
                        el.style.transform = 'translateY(0)'
                      }}>
                        <div style={{ display: 'flex', gap: 16 }}>
                          {/* Thumbnail */}
                          <div style={{
                            width: 72, height: 72, borderRadius: 12, flexShrink: 0,
                            background: 'var(--bg-overlay)', overflow: 'hidden',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 24, color: 'var(--text-muted)',
                          }}>
                            {p.thumbnail_url
                              ? <img src={p.thumbnail_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                              : '◫'}
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: 'flex', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                              {tags.slice(0, 3).map((t: any) => (
                                <span key={t.id} className="tag-pill">{t.name}</span>
                              ))}
                            </div>
                            <h3 style={{
                              fontFamily: 'var(--font-cormorant), Georgia, serif',
                              fontSize: 20, fontWeight: 400, lineHeight: 1.2, marginBottom: 6,
                            }}>
                              {p.title}
                            </h3>
                            {p.description && (
                              <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 10 }}>
                                {p.description.slice(0, 100)}{p.description.length > 100 ? '…' : ''}
                              </p>
                            )}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                              {/* Collaborator avatars */}
                              <div style={{ display: 'flex' }}>
                                {collabs.slice(0, 4).map((c: any, i: number) => (
                                  <div key={c.profile_id} style={{
                                    width: 22, height: 22, borderRadius: '50%',
                                    background: 'var(--bg-overlay)', overflow: 'hidden',
                                    border: '2px solid var(--bg-surface)',
                                    marginLeft: i > 0 ? -7 : 0,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: 9, color: 'var(--accent)',
                                    position: 'relative', zIndex: collabs.length - i,
                                  }}>
                                    {c.profiles?.avatar_url
                                      ? <img src={c.profiles.avatar_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                                      : c.profiles?.username?.[0]?.toUpperCase()}
                                  </div>
                                ))}
                              </div>
                              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                                {collabs.length} contributor{collabs.length !== 1 ? 's' : ''}
                              </span>
                              <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--accent)' }}>
                                ★ {p.star_count}
                              </span>
                              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                                {new Date(p.updated_at ?? p.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                  {isMember && (
                    <Link href="/projects/submit" style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                      padding: '14px', borderRadius: 14,
                      border: '2px dashed var(--border)',
                      color: 'var(--text-muted)', fontSize: 13,
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--accent)'; (e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-muted)' }}>
                      + Submit another project
                    </Link>
                  )}
                </div>
              )
            )}

            {/* MEMBERS */}
            {activeSection === 'members' && (
              <div style={{ display: 'grid', gap: 10 }}>
                {members.map((m: any) => (
                  <Link key={m.profile_id} href={`/profile/${m.profiles?.username}`} style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '16px 20px', borderRadius: 14,
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    textDecoration: 'none', transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLAnchorElement
                    el.style.borderColor = 'var(--accent)'
                    el.style.transform = 'translateX(4px)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLAnchorElement
                    el.style.borderColor = 'var(--border-subtle)'
                    el.style.transform = 'translateX(0)'
                  }}>
                    {/* Avatar */}
                    <div style={{
                      width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
                      background: 'var(--bg-overlay)', overflow: 'hidden',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 18, color: 'var(--accent)',
                      border: '2px solid var(--border-subtle)',
                    }}>
                      {m.profiles?.avatar_url
                        ? <img src={m.profiles.avatar_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                        : m.profiles?.username?.[0]?.toUpperCase()}
                    </div>
                    {/* Info */}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                        <span style={{ fontSize: 15, fontWeight: 500, color: 'var(--text-primary)' }}>
                          {m.profiles?.full_name || m.profiles?.username}
                        </span>
                        <RoleBadge role={m.role} />
                        {m.profile_id === userId && (
                          <span style={{ fontSize: 9, color: 'var(--text-muted)', background: 'var(--bg-overlay)', padding: '1px 6px', borderRadius: 99 }}>
                            You
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                        @{m.profiles?.username}
                      </div>
                    </div>
                    {/* GitHub link if available */}
                    {m.profiles?.github_url && (
                      <a href={m.profiles.github_url} target="_blank" rel="noopener"
                        onClick={e => e.stopPropagation()}
                        style={{ fontSize: 13, color: 'var(--text-muted)', padding: '6px 10px',
                          borderRadius: 8, background: 'var(--bg-overlay)', border: '1px solid var(--border-subtle)' }}>
                        ⌥ GitHub
                      </a>
                    )}
                    <span style={{ fontSize: 18, color: 'var(--border)', marginLeft: 4 }}>›</span>
                  </Link>
                ))}
              </div>
            )}

            {/* RESOURCES */}
            {activeSection === 'resources' && (
              resources.length === 0 ? (
                <div style={{
                  textAlign: 'center', padding: '60px 40px',
                  background: 'var(--bg-surface)',
                  border: '2px dashed var(--border)',
                  borderRadius: 20,
                }}>
                  <div style={{ fontSize: 40, opacity: 0.2, marginBottom: 12 }}>◎</div>
                  <div style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 22, marginBottom: 8 }}>
                    No shared resources yet
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>
                    Leaders can add GitHub, Figma, Drive links and more.
                  </p>
                  {isLeader && (
                    <button onClick={() => setEditing(true)} style={{
                      padding: '10px 22px', borderRadius: 10,
                      background: 'var(--accent-dim)', border: '1px solid var(--accent)',
                      color: 'var(--accent)', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit',
                    }}>
                      Add Resources →
                    </button>
                  )}
                </div>
              ) : (
                <div style={{ display: 'grid', gap: 10 }}>
                  {resources.map((r, i) => (
                    <ResourceCard key={i} href={r.href} label={r.label} icon={r.icon} />
                  ))}
                </div>
              )
            )}
          </div>

          {/* RIGHT — Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Activity Feed */}
            <div style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 16, padding: '20px',
            }}>
              <div style={{
                fontSize: 10, letterSpacing: '0.15em', color: 'var(--text-muted)',
                textTransform: 'uppercase', marginBottom: 12,
              }}>
                Recent Activity
              </div>
              {activity.map((a, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 10,
                  padding: '9px 0',
                  borderBottom: i < activity.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                }}>
                  <div style={{
                    width: 26, height: 26, borderRadius: 7, flexShrink: 0,
                    background: 'var(--bg-overlay)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12,
                  }}>
                    {a.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4 }}>{a.text}</div>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>{a.time}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick invite (leader only) */}
            {isLeader && (
              <div style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 16, padding: '20px',
              }}>
                <div style={{ fontSize: 10, letterSpacing: '0.15em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 12 }}>
                  Quick Invite
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input value={inviteUsername} onChange={e => setInviteU(e.target.value)}
                    placeholder="@username"
                    style={{ flex: 1, padding: '9px 12px', borderRadius: 8, fontSize: 13 }}
                    onKeyDown={e => e.key === 'Enter' && inviteMember()} />
                  <button onClick={inviteMember} disabled={inviting} style={{
                    padding: '9px 14px', background: 'var(--accent)', color: '#1c1917',
                    border: 'none', borderRadius: 8, cursor: 'pointer',
                    fontFamily: 'inherit', fontSize: 13, fontWeight: 600,
                  }}>
                    {inviting ? '…' : 'Send'}
                  </button>
                </div>
              </div>
            )}

            {/* Top resources preview */}
            {resources.length > 0 && activeSection !== 'resources' && (
              <div style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 16, padding: '20px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <div style={{ fontSize: 10, letterSpacing: '0.15em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Resources
                  </div>
                  <button onClick={() => setSection('resources')} style={{
                    fontSize: 11, color: 'var(--accent)', background: 'none', border: 'none',
                    cursor: 'pointer', fontFamily: 'inherit',
                  }}>
                    View all →
                  </button>
                </div>
                <div style={{ display: 'grid', gap: 8 }}>
                  {resources.slice(0, 3).map((r, i) => (
                    <ResourceCard key={i} href={r.href} label={r.label} icon={r.icon} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
