'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { showToast } from '@/components/ui/Toast'
import type { TeamWithRelations, TeamInvitation } from '@/lib/types/database'

type Tab = 'mine' | 'browse' | 'invitations'

// ─── ROLE BADGE ───────────────────────────────────────────────────────────
function RoleBadge({ role }: { role: string }) {
  const styles: Record<string, { bg: string; color: string; label: string }> = {
    leader:      { bg: 'rgba(201,151,58,0.15)', color: 'var(--accent)',   label: 'Leader'      },
    admin:       { bg: 'rgba(185,64,64,0.12)',  color: 'var(--danger)',   label: 'Admin'       },
    contributor: { bg: 'rgba(74,124,89,0.12)',  color: 'var(--success)',  label: 'Contributor' },
    member:      { bg: 'var(--bg-overlay)',     color: 'var(--text-muted)', label: 'Member'    },
  }
  const s = styles[role] ?? styles.member
  return (
    <span style={{
      fontSize: 9, padding: '2px 8px', borderRadius: 99,
      background: s.bg, color: s.color,
      fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
      flexShrink: 0,
    }}>
      {s.label}
    </span>
  )
}

// ─── MEMBER AVATAR STACK ──────────────────────────────────────────────────
function AvatarStack({ members, max = 4 }: { members: any[]; max?: number }) {
  const shown = members.slice(0, max)
  const extra = members.length - max
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {shown.map((m, i) => (
        <div key={m.profile_id} style={{
          width: 26, height: 26, borderRadius: '50%',
          background: 'var(--bg-overlay)',
          border: '2px solid var(--bg-surface)',
          overflow: 'hidden', marginLeft: i > 0 ? -8 : 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 10, color: 'var(--accent)', flexShrink: 0,
          zIndex: shown.length - i,
          position: 'relative',
        }}>
          {m.profiles?.avatar_url
            ? <img src={m.profiles.avatar_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
            : m.profiles?.username?.[0]?.toUpperCase()}
        </div>
      ))}
      {extra > 0 && (
        <div style={{
          width: 26, height: 26, borderRadius: '50%',
          background: 'var(--accent-dim)', border: '2px solid var(--bg-surface)',
          marginLeft: -8, display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: 9,
          color: 'var(--accent)', fontWeight: 600, flexShrink: 0,
        }}>
          +{extra}
        </div>
      )}
    </div>
  )
}

// ─── ACTIVITY FEED ITEM ───────────────────────────────────────────────────
function ActivityItem({ icon, text, time }: { icon: string; text: string; time: string }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: 10,
      padding: '10px 0',
      borderBottom: '1px solid var(--border-subtle)',
    }}>
      <div style={{
        width: 28, height: 28, borderRadius: 8, flexShrink: 0,
        background: 'var(--bg-overlay)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 13,
      }}>
        {icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.4 }}>{text}</div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{time}</div>
      </div>
    </div>
  )
}

// ─── TEAM CARD ────────────────────────────────────────────────────────────
function TeamCard({ team, isMember, userId }: {
  team: TeamWithRelations
  isMember: boolean
  userId: string | null
}) {
  const members    = team.team_members ?? []
  const myMembership = members.find((m: any) => m.profile_id === userId)
  const myRole     = myMembership?.role ?? null

  // Build activity feed from real data
  const activities: Array<{ icon: string; text: string; time: string }> = []
  members.slice(0, 3).forEach(m => {
    if (m.role === 'leader') {
      activities.push({
        icon: '◎',
        text: `@${m.profiles?.username} leads this team`,
        time: 'Team leader',
      })
    }
  })
  if (members.length > 1) {
    activities.push({
      icon: '⊕',
      text: `${members.length} members collaborating`,
      time: 'Active now',
    })
  }

  return (
    <div
      onClick={() => window.location.href = `/teams/${team.id}`}
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 20, overflow: 'hidden',
        cursor: 'pointer', transition: 'all 0.25s cubic-bezier(0.22,1,0.36,1)',
        position: 'relative',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement
        el.style.transform = 'translateY(-3px)'
        el.style.borderColor = 'var(--accent)'
        el.style.boxShadow = '0 12px 40px rgba(201,151,58,0.12)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement
        el.style.transform = 'translateY(0)'
        el.style.borderColor = 'var(--border-subtle)'
        el.style.boxShadow = 'none'
      }}
    >
      {/* Banner strip */}
      <div style={{
        height: 6,
        background: isMember
          ? 'linear-gradient(90deg, var(--accent), rgba(201,151,58,0.3))'
          : 'var(--bg-overlay)',
      }} />

      <div style={{ padding: '20px' }}>
        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 16 }}>
          {/* Logo */}
          <div style={{
            width: 52, height: 52, borderRadius: 14, flexShrink: 0,
            background: 'var(--bg-overlay)', overflow: 'hidden',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22, color: 'var(--accent)',
            border: '1px solid var(--border-subtle)',
          }}>
            {team.logo_url
              ? <img src={team.logo_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
              : team.name[0]?.toUpperCase()}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
              <h3 style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 20, fontWeight: 400, color: 'var(--text-primary)',
                lineHeight: 1.1,
              }}>
                {team.name}
              </h3>
              {myRole && <RoleBadge role={myRole} />}
            </div>
            {team.description && (
              <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>
                {team.description.slice(0, 70)}{team.description.length > 70 ? '…' : ''}
              </p>
            )}
          </div>
        </div>

        {/* Mini activity feed */}
        {activities.length > 0 && (
          <div style={{
            background: 'var(--bg-overlay)',
            borderRadius: 10, padding: '10px 12px',
            marginBottom: 14,
          }}>
            <div style={{ fontSize: 9, letterSpacing: '0.12em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 6 }}>
              Activity
            </div>
            {activities.map((a, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                paddingTop: i > 0 ? 6 : 0,
                borderTop: i > 0 ? '1px solid var(--border-subtle)' : 'none',
              }}>
                <span style={{ fontSize: 11 }}>{a.icon}</span>
                <span style={{ fontSize: 11, color: 'var(--text-secondary)', flex: 1 }}>{a.text}</span>
                <span style={{ fontSize: 10, color: 'var(--text-muted)', flexShrink: 0 }}>{a.time}</span>
              </div>
            ))}
          </div>
        )}

        {/* Footer: avatars + member count */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          paddingTop: 14, borderTop: '1px solid var(--border-subtle)',
        }}>
          <AvatarStack members={members} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              {members.length} member{members.length !== 1 ? 's' : ''}
            </span>
            {isMember ? (
              <span style={{
                fontSize: 10, padding: '3px 10px', borderRadius: 99,
                background: 'rgba(74,124,89,0.1)', color: 'var(--success)',
                fontWeight: 600,
              }}>
                ✓ Joined
              </span>
            ) : (
              <span style={{
                fontSize: 10, padding: '3px 10px', borderRadius: 99,
                background: 'var(--accent-dim)', color: 'var(--accent)',
                fontWeight: 600,
              }}>
                View →
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────
export default function TeamsPage() {
  const [tab, setTab]               = useState<Tab>('mine')
  const [myTeams, setMyTeams]       = useState<TeamWithRelations[]>([])
  const [allTeams, setAllTeams]     = useState<TeamWithRelations[]>([])
  const [invitations, setInvites]   = useState<TeamInvitation[]>([])
  const [userId, setUserId]         = useState<string | null>(null)
  const [loading, setLoading]       = useState(true)
  const [creating, setCreating]     = useState(false)
  const [newName, setNewName]       = useState('')
  const [newDesc, setNewDesc]       = useState('')
  const [pendingCount, setPending]  = useState(0)
  const [showCreate, setShowCreate] = useState(false)
  const [search, setSearch]         = useState('')

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
    const { data: team, error } = await supabase.from('teams')
      .insert({ name: newName.trim(), description: newDesc.trim() || null, created_by: userId })
      .select().single()
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
    } else {
      showToast('Invitation declined')
    }
    await loadAll(userId!)
  }

  const tabStyle = (t: Tab) => ({
    padding: '9px 18px', border: 'none', borderRadius: 8,
    background: tab === t ? 'var(--accent-dim)' : 'transparent',
    color: tab === t ? 'var(--accent)' : 'var(--text-secondary)',
    fontFamily: 'inherit', fontSize: 13,
    fontWeight: tab === t ? 500 : 400,
    cursor: 'pointer', transition: 'all 0.15s',
    position: 'relative' as const,
  })

  const browsedTeams = allTeams.filter(t =>
    !search || t.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ padding: '48px 48px 80px', width: '100%' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* ─── HEADER ─── */}
        <div className="animate-fade-up" style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <h1 style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 'clamp(48px, 7vw, 72px)',
                fontWeight: 400, lineHeight: 1, marginBottom: 8,
              }}>
                Teams
              </h1>
              <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>
                {allTeams.length} team{allTeams.length !== 1 ? 's' : ''} at ITM University
              </p>
            </div>
            <button onClick={() => setShowCreate(o => !o)} style={{
              padding: '12px 24px', borderRadius: 12,
              background: showCreate ? 'var(--bg-overlay)' : 'var(--accent)',
              color: showCreate ? 'var(--text-secondary)' : '#1c1917',
              border: showCreate ? '1px solid var(--border)' : 'none',
              fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
              transition: 'all 0.2s',
            }}>
              {showCreate ? '✕ Cancel' : '+ Create Team'}
            </button>
          </div>
        </div>

        {/* ─── GLOBAL STATS ─── */}
        <div className="animate-fade-up delay-1" style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: 1, background: 'var(--border)',
          borderRadius: 16, overflow: 'hidden',
          border: '1px solid var(--border)',
          marginBottom: 36,
        }}>
          {[
            { num: allTeams.length,   label: 'Total Teams'  },
            { num: myTeams.length,    label: 'My Teams'     },
            { num: allTeams.reduce((acc, t) => acc + (t.team_members?.length ?? 0), 0), label: 'Total Members' },
            { num: pendingCount,      label: 'Invitations'  },
          ].map(({ num, label }) => (
            <div key={label} style={{ background: 'var(--bg-surface)', padding: '20px 16px', textAlign: 'center' }}>
              <div style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 40, fontWeight: 300, color: 'var(--text-primary)', lineHeight: 1, marginBottom: 6,
              }}>
                {num}
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* ─── CREATE FORM ─── */}
        {showCreate && (
          <div className="animate-fade-up" style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 20, padding: '32px', marginBottom: 32,
          }}>
            <h2 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 28, marginBottom: 6 }}>
              New Team
            </h2>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 24 }}>
              You&apos;ll be the leader. Invite others after creation.
            </p>
            <div style={{ display: 'grid', gap: 14 }}>
              <input value={newName} onChange={e => setNewName(e.target.value)}
                placeholder="Team name (e.g. Team Nebula)" style={{ padding: '12px 14px', borderRadius: 10 }} />
              <textarea value={newDesc} onChange={e => setNewDesc(e.target.value)}
                placeholder="What does your team work on? What's the goal?" rows={3}
                style={{ padding: '12px 14px', borderRadius: 10, resize: 'vertical' }} />
              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={createTeam} disabled={creating || !newName.trim()} style={{
                  padding: '12px 28px',
                  background: newName.trim() ? 'var(--accent)' : 'var(--border)',
                  color: newName.trim() ? '#1c1917' : 'var(--text-muted)',
                  border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 600,
                  cursor: newName.trim() ? 'pointer' : 'not-allowed', fontFamily: 'inherit',
                  transition: 'all 0.2s',
                }}>
                  {creating ? 'Creating…' : 'Create Team →'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ─── TABS ─── */}
        <div className="animate-fade-up delay-2" style={{
          display: 'flex', gap: 4,
          background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)',
          borderRadius: 12, padding: 4, marginBottom: 28, width: 'fit-content',
        }}>
          <button style={tabStyle('mine')} onClick={() => setTab('mine')}>
            My Teams {myTeams.length > 0 && `(${myTeams.length})`}
          </button>
          <button style={tabStyle('browse')} onClick={() => setTab('browse')}>
            Browse All
          </button>
          <button style={{ ...tabStyle('invitations'), paddingRight: pendingCount > 0 ? 28 : 18 }}
            onClick={() => setTab('invitations')}>
            Invitations
            {pendingCount > 0 && (
              <span style={{
                position: 'absolute', top: 5, right: 5,
                width: 14, height: 14, borderRadius: '50%',
                background: 'var(--danger)', color: 'white',
                fontSize: 8, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {pendingCount}
              </span>
            )}
          </button>
        </div>

        {/* ─── CONTENT ─── */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: 32, opacity: 0.3, marginBottom: 12 }}>◎</div>
            Loading teams…
          </div>
        ) : (
          <>

            {/* MY TEAMS */}
            {tab === 'mine' && (
              myTeams.length === 0 ? (
                <div style={{
                  textAlign: 'center', padding: '80px 40px',
                  background: 'var(--bg-surface)',
                  border: '2px dashed var(--border)',
                  borderRadius: 20,
                }}>
                  <div style={{ fontSize: 48, opacity: 0.2, marginBottom: 16 }}>◎</div>
                  <h3 style={{
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: 28, fontWeight: 400, marginBottom: 8,
                  }}>
                    You&apos;re not in any teams yet
                  </h3>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 24 }}>
                    Create one or browse existing teams to join.
                  </p>
                  <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button onClick={() => setShowCreate(true)} style={{
                      padding: '11px 24px', borderRadius: 10,
                      background: 'var(--accent)', color: '#1c1917',
                      border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                    }}>
                      + Create Team
                    </button>
                    <button onClick={() => setTab('browse')} style={{
                      padding: '11px 24px', borderRadius: 10,
                      background: 'none', border: '1px solid var(--border)',
                      fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', color: 'var(--text-secondary)',
                    }}>
                      Browse Teams →
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
                  {myTeams.map(t => (
                    <TeamCard key={t.id} team={t} isMember={true} userId={userId} />
                  ))}
                </div>
              )
            )}

            {/* BROWSE ALL */}
            {tab === 'browse' && (
              <>
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search teams…"
                  style={{ width: '100%', maxWidth: 400, padding: '10px 14px', borderRadius: 10, marginBottom: 24 }}
                />
                {browsedTeams.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
                    No teams found
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
                    {browsedTeams.map(t => (
                      <TeamCard
                        key={t.id} team={t}
                        isMember={myTeams.some(m => m.id === t.id)}
                        userId={userId}
                      />
                    ))}
                  </div>
                )}
              </>
            )}

            {/* INVITATIONS */}
            {tab === 'invitations' && (
              invitations.length === 0 ? (
                <div style={{
                  textAlign: 'center', padding: '80px 40px',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 20,
                }}>
                  <div style={{ fontSize: 36, opacity: 0.2, marginBottom: 12 }}>🔔</div>
                  <div style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 22, marginBottom: 8 }}>
                    No pending invitations
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                    When someone invites you to a team, it shows up here.
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {invitations.map(inv => (
                    <div key={inv.id} style={{
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 16, padding: '20px 24px',
                      display: 'flex', alignItems: 'center', gap: 16,
                      flexWrap: 'wrap',
                    }}>
                      <div style={{
                        width: 48, height: 48, borderRadius: 14, flexShrink: 0,
                        background: 'var(--bg-overlay)', overflow: 'hidden',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 20, color: 'var(--accent)',
                        border: '1px solid var(--border-subtle)',
                      }}>
                        {inv.teams?.logo_url
                          ? <img src={inv.teams.logo_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                          : inv.teams?.name?.[0]?.toUpperCase()}
                      </div>
                      <div style={{ flex: 1, minWidth: 160 }}>
                        <div style={{
                          fontFamily: 'var(--font-cormorant), Georgia, serif',
                          fontSize: 20, fontWeight: 400, color: 'var(--text-primary)', marginBottom: 3,
                        }}>
                          {inv.teams?.name}
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                          Invited by @{(inv.profiles as any)?.username}
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button onClick={() => respondInvite(inv.id, 'accepted', inv.team_id)} style={{
                          padding: '9px 20px', background: 'var(--success)', color: 'white',
                          border: 'none', borderRadius: 9, cursor: 'pointer',
                          fontFamily: 'inherit', fontSize: 13, fontWeight: 600,
                        }}>
                          Accept
                        </button>
                        <button onClick={() => respondInvite(inv.id, 'declined', inv.team_id)} style={{
                          padding: '9px 16px', background: 'none',
                          border: '1px solid var(--border)', borderRadius: 9,
                          cursor: 'pointer', fontFamily: 'inherit',
                          fontSize: 13, color: 'var(--text-secondary)',
                        }}>
                          Decline
                        </button>
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
