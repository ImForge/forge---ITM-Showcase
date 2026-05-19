'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { showToast } from '@/components/ui/Toast'
import type { TeamWithRelations, TeamInvitation } from '@/lib/types/database'

type Tab = 'mine' | 'browse' | 'invitations'

function RoleBadge({ role }: { role: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    leader: { bg: 'rgba(201,151,58,0.15)', color: 'var(--accent)'   },
    member: { bg: 'var(--bg-overlay)',     color: 'var(--text-muted)' },
  }
  const s = map[role] ?? map.member
  return <span style={{ fontSize: 9, padding: '2px 8px', borderRadius: 99, background: s.bg, color: s.color, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', flexShrink: 0 }}>{role}</span>
}

function TeamCard({ team, isMember, userId }: { team: TeamWithRelations; isMember: boolean; userId: string | null }) {
  const members = team.team_members ?? []
  const myRole = members.find((m: any) => m.profile_id === userId)?.role ?? null

  return (
    <div onClick={() => window.location.href = `/teams/${team.id}`} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 16, overflow: 'hidden', cursor: 'pointer', transition: 'all 0.25s' }}>
      {/* Color strip */}
      <div style={{ height: 4, background: isMember ? 'linear-gradient(90deg, var(--accent), rgba(201,151,58,0.2))' : 'var(--bg-overlay)' }} />
      <div style={{ padding: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, background: 'var(--bg-overlay)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: 'var(--accent)', border: '1px solid var(--border-subtle)' }}>
            {team.logo_url ? <img src={team.logo_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" /> : team.name[0]?.toUpperCase()}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <h3 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 19, fontWeight: 400, color: 'var(--text-primary)' }}>{team.name}</h3>
              {myRole && <RoleBadge role={myRole} />}
            </div>
            {team.description && (
              <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {team.description.includes(' ||| ') ? team.description.slice(0, team.description.indexOf(' ||| ')) : team.description}
              </p>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid var(--border-subtle)' }}>
          {/* Avatar stack */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ display: 'flex' }}>
              {members.slice(0, 4).map((m: any, i: number) => (
                <div key={m.profile_id} style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--bg-overlay)', border: '2px solid var(--bg-surface)', overflow: 'hidden', marginLeft: i > 0 ? -8 : 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: 'var(--accent)', position: 'relative', zIndex: members.length - i }}>
                  {m.profiles?.avatar_url ? <img src={m.profiles.avatar_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" /> : m.profiles?.username?.[0]?.toUpperCase()}
                </div>
              ))}
            </div>
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{members.length} member{members.length !== 1 ? 's' : ''}</span>
          </div>
          <span style={{ fontSize: 10, padding: '3px 10px', borderRadius: 99, background: isMember ? 'rgba(74,124,89,0.1)' : 'var(--accent-dim)', color: isMember ? 'var(--success)' : 'var(--accent)', fontWeight: 600 }}>
            {isMember ? '✓ Joined' : 'View →'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function TeamsPage() {
  const [tab, setTab]             = useState<Tab>('mine')
  const [myTeams, setMyTeams]     = useState<TeamWithRelations[]>([])
  const [allTeams, setAllTeams]   = useState<TeamWithRelations[]>([])
  const [invitations, setInvites] = useState<TeamInvitation[]>([])
  const [userId, setUserId]       = useState<string | null>(null)
  const [loading, setLoading]     = useState(true)
  const [creating, setCreating]   = useState(false)
  const [newName, setNewName]     = useState('')
  const [newDesc, setNewDesc]     = useState('')
  const [pendingCount, setPending]= useState(0)
  const [showCreate, setShowCreate] = useState(false)
  const [search, setSearch]       = useState('')

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) { window.location.href = '/login'; return }
      setUserId(user.id)
      await loadAll(user.id)
    })
  }, [])

  async function loadAll(uid: string) {
    setLoading(true)
    const supabase = createClient()
    const [{ data: memberRows }, { data: allRaw }, { data: inviteRaw }] = await Promise.all([
      supabase.from('team_members').select('team_id').eq('profile_id', uid),
      supabase.from('teams').select(`*, team_members(profile_id, role, profiles(id,username,avatar_url,full_name))`).order('created_at', { ascending: false }),
      supabase.from('team_invitations').select(`*, teams(id,name,logo_url), profiles!team_invitations_invited_by_fkey(id,username,avatar_url,full_name)`).eq('invited_user', uid).eq('status', 'pending'),
    ])
    const myTeamIds = (memberRows ?? []).map((r: any) => r.team_id)
    const all = (allRaw as unknown as TeamWithRelations[]) ?? []
    setMyTeams(all.filter(t => myTeamIds.includes(t.id)))
    setAllTeams(all)
    setInvites((inviteRaw as unknown as TeamInvitation[]) ?? [])
    setPending(inviteRaw?.length ?? 0)
    setLoading(false)
  }

  async function createTeam() {
    if (!newName.trim() || !userId) return
    setCreating(true)
    const supabase = createClient()
    const { data: team, error } = await supabase.from('teams').insert({ name: newName.trim(), description: newDesc.trim() || null, created_by: userId }).select().single()
    if (error || !team) { showToast('Failed to create team', 'error'); setCreating(false); return }
    await supabase.from('team_members').insert({ team_id: team.id, profile_id: userId, role: 'leader' })
    showToast('Team created!', 'success')
    window.location.href = `/teams/${team.id}`
  }

  async function respondInvite(inviteId: string, status: 'accepted' | 'declined', teamId: string) {
    const supabase = createClient()
    await supabase.from('team_invitations').update({ status }).eq('id', inviteId)
    if (status === 'accepted' && userId) {
      await supabase.from('team_members').insert({ team_id: teamId, profile_id: userId, role: 'member' })
      showToast('Joined team!', 'success')
    } else showToast('Invitation declined')
    await loadAll(userId!)
  }

  const tabStyle = (t: Tab) => ({
    padding: '9px 14px', border: 'none', borderRadius: 8,
    background: tab === t ? 'var(--accent-dim)' : 'transparent',
    color: tab === t ? 'var(--accent)' : 'var(--text-secondary)',
    fontFamily: 'inherit', fontSize: 12, fontWeight: tab === t ? 500 : 400,
    cursor: 'pointer', transition: 'all 0.15s', position: 'relative' as const, whiteSpace: 'nowrap' as const,
  })

  const browsed = allTeams.filter(t => !search || t.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div style={{ width: '100%', padding: 'clamp(20px,4vw,48px) clamp(16px,4vw,40px) 80px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 28, flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(40px, 7vw, 64px)', fontWeight: 400, lineHeight: 1 }}>Teams</h1>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 6 }}>{allTeams.length} team{allTeams.length !== 1 ? 's' : ''} at ITM University</p>
          </div>
          <button onClick={() => setShowCreate(o => !o)} style={{ padding: '11px 20px', borderRadius: 12, background: showCreate ? 'var(--bg-overlay)' : 'var(--accent)', color: showCreate ? 'var(--text-secondary)' : '#1c1917', border: showCreate ? '1px solid var(--border)' : 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }}>
            {showCreate ? '✕ Cancel' : '+ Create'}
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 1, background: 'var(--border)', borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border)', marginBottom: 24 }}>
          {[{ num: allTeams.length, label: 'Total Teams' }, { num: myTeams.length, label: 'My Teams' }, { num: pendingCount, label: 'Invites' }].map(({ num, label }) => (
            <div key={label} style={{ flex: 1, background: 'var(--bg-surface)', padding: '14px 8px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 28, fontWeight: 300, lineHeight: 1 }}>{num}</div>
              <div style={{ fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Create form */}
        {showCreate && (
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 16, padding: '20px', marginBottom: 20 }}>
            <h2 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 22, marginBottom: 16 }}>New Team</h2>
            <div style={{ display: 'grid', gap: 12 }}>
              <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Team name" style={{ padding: '11px 14px', borderRadius: 10, width: '100%' }} />
              <textarea value={newDesc} onChange={e => setNewDesc(e.target.value)} placeholder="What does your team work on?" rows={2} style={{ padding: '11px 14px', borderRadius: 10, resize: 'vertical', width: '100%' }} />
              <button onClick={createTeam} disabled={creating || !newName.trim()} style={{ padding: '12px', background: newName.trim() ? 'var(--accent)' : 'var(--border)', color: newName.trim() ? '#1c1917' : 'var(--text-muted)', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                {creating ? 'Creating…' : 'Create Team →'}
              </button>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: 4, marginBottom: 24, overflowX: 'auto' }}>
          <button style={tabStyle('mine')} onClick={() => setTab('mine')}>My Teams {myTeams.length > 0 && `(${myTeams.length})`}</button>
          <button style={tabStyle('browse')} onClick={() => setTab('browse')}>Browse All</button>
          <button style={{ ...tabStyle('invitations'), paddingRight: pendingCount > 0 ? 24 : 14 }} onClick={() => setTab('invitations')}>
            Invitations
            {pendingCount > 0 && <span style={{ position: 'absolute', top: 5, right: 5, width: 14, height: 14, borderRadius: '50%', background: 'var(--danger)', color: 'white', fontSize: 8, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{pendingCount}</span>}
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>Loading…</div>
        ) : (
          <>
            {tab === 'mine' && (
              myTeams.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--bg-surface)', border: '2px dashed var(--border)', borderRadius: 20 }}>
                  <div style={{ fontSize: 36, opacity: 0.2, marginBottom: 12 }}>◎</div>
                  <h3 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 22, marginBottom: 8 }}>Not in any teams yet</h3>
                  <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginTop: 16 }}>
                    <button onClick={() => setShowCreate(true)} style={{ padding: '10px 20px', borderRadius: 10, background: 'var(--accent)', color: '#1c1917', border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>+ Create Team</button>
                    <button onClick={() => setTab('browse')} style={{ padding: '10px 20px', borderRadius: 10, background: 'none', border: '1px solid var(--border)', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', color: 'var(--text-secondary)' }}>Browse →</button>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
                  {myTeams.map(t => <TeamCard key={t.id} team={t} isMember={true} userId={userId} />)}
                </div>
              )
            )}

            {tab === 'browse' && (
              <>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search teams…" style={{ width: '100%', padding: '10px 14px', borderRadius: 10, marginBottom: 16 }} />
                {browsed.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>No teams found</div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
                    {browsed.map(t => <TeamCard key={t.id} team={t} isMember={myTeams.some(m => m.id === t.id)} userId={userId} />)}
                  </div>
                )}
              </>
            )}

            {tab === 'invitations' && (
              invitations.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 16 }}>
                  <div style={{ fontSize: 28, opacity: 0.2, marginBottom: 10 }}>🔔</div>
                  <div style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 20 }}>No pending invitations</div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {invitations.map(inv => (
                    <div key={inv.id} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 14, padding: '16px', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                      <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, background: 'var(--bg-overlay)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: 'var(--accent)' }}>
                        {inv.teams?.logo_url ? <img src={inv.teams.logo_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" /> : inv.teams?.name?.[0]?.toUpperCase()}
                      </div>
                      <div style={{ flex: 1, minWidth: 120 }}>
                        <div style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 18, fontWeight: 400 }}>{inv.teams?.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Invited by @{(inv.profiles as any)?.username}</div>
                      </div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button onClick={() => respondInvite(inv.id, 'accepted', inv.team_id)} style={{ padding: '8px 16px', background: 'var(--success)', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 600 }}>Accept</button>
                        <button onClick={() => respondInvite(inv.id, 'declined', inv.team_id)} style={{ padding: '8px 14px', background: 'none', border: '1px solid var(--border)', borderRadius: 8, cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, color: 'var(--text-secondary)' }}>Decline</button>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}
          </>
        )}
      </div>
    </div>
  )
}
