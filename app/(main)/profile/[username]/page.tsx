// Profile — Server Component
// Aesthetic: digital identity / creative presence. Not a dashboard.
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Profile, ProjectWithRelations, AssignmentWithProfile } from '@/lib/types/database'
import {
  SocialPill, FeaturedCard, TinyProjectCard,
  SavedCard, HeatCell, TeamSidebarLink,
  AssignmentSidebarLink, AchievementBadge,
} from '@/components/profile/ProfileClient'

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params
  return { title: `@${username} · Forge` }
}

// ─── MILESTONE SYSTEM ─────────────────────────────────────────────────────
// Museum-style — minimal, earned, not gamified
function getMilestones(projects: ProjectWithRelations[], totalStars: number) {
  const ms: Array<{ year: string; label: string }> = []
  if (projects.length >= 1) {
    const year = new Date(projects[projects.length - 1]?.created_at ?? '').getFullYear()
    ms.push({ year: String(year || new Date().getFullYear()), label: 'FIRST RELEASE' })
  }
  if (projects.length >= 5)  ms.push({ year: String(projects.length), label: 'WORKS ARCHIVED' })
  if (totalStars  >= 10)     ms.push({ year: String(totalStars),       label: 'STARS EARNED'   })
  if (totalStars  >= 50)     ms.push({ year: '50+',                    label: 'STARS EARNED'   })
  if (projects.length >= 10) ms.push({ year: '10+',                    label: 'PROJECTS LIVE'  })
  return ms.slice(0, 4)
}

// ─── HEATMAP ──────────────────────────────────────────────────────────────
function buildHeatmap(projects: ProjectWithRelations[], assignments: AssignmentWithProfile[]) {
  const counts: Record<string, number> = {}
  const now = new Date()
  for (let w = 51; w >= 0; w--)
    for (let d = 0; d < 7; d++) {
      const dt = new Date(now); dt.setDate(dt.getDate() - (w * 7 + d))
      counts[dt.toISOString().slice(0, 10)] = 0
    }
  projects.forEach(p => { const k = p.created_at?.slice(0, 10); if (k && k in counts) counts[k] = (counts[k] ?? 0) + 2 })
  assignments.forEach(a => { const k = a.created_at?.slice(0, 10); if (k && k in counts) counts[k] = (counts[k] ?? 0) + 1 })
  return counts
}

function timeAgo(date: string) {
  const days = Math.floor((Date.now() - new Date(date).getTime()) / 86400000)
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 7)  return `${days}d ago`
  if (days < 30) return `${Math.floor(days / 7)}w ago`
  if (days < 365) return `${Math.floor(days / 30)}mo ago`
  return `${Math.floor(days / 365)}y ago`
}

function buildTimeline(projects: ProjectWithRelations[], assignments: AssignmentWithProfile[]) {
  type Ev = { date: string; icon: string; text: string; sub: string }
  const events: Ev[] = []
  projects.forEach(p => events.push({ date: p.created_at, icon: '◫', text: p.title, sub: `${p.star_count} stars` }))
  assignments.forEach(a => events.push({ date: a.created_at, icon: '☰', text: a.title, sub: a.subject }))
  return events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 6)
}

// ─── PAGE ─────────────────────────────────────────────────────────────────
export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: pr } = await supabase.from('profiles').select('*').eq('username', username.toLowerCase()).single()
  if (!pr) notFound()
  const profile = pr as unknown as Profile
  const isOwn = user?.id === profile.id

  const [{ data: projectsRaw }, { data: assignmentsRaw }, { data: savesRaw }, { data: teamsRaw }] = await Promise.all([
    supabase.from('projects').select(`*, views, profiles!projects_submitted_by_fkey(id,username,avatar_url,full_name), project_tags(tag_id,tags(id,name,color)), project_members(profile_id,role,profiles!project_members_profile_id_fkey(id,username,avatar_url,full_name))`).eq('submitted_by', profile.id).eq('status', 'approved').order('star_count', { ascending: false }),
    supabase.from('assignments').select('*,profiles(id,username,avatar_url,full_name)').eq('submitted_by', profile.id).order('created_at', { ascending: false }).limit(8),
    isOwn ? supabase.from('saves').select(`project_id, projects(*, profiles!projects_submitted_by_fkey(id,username,avatar_url,full_name), project_tags(tag_id,tags(id,name,color)), project_members(profile_id,role,profiles!project_members_profile_id_fkey(id,username,avatar_url,full_name)))`).eq('user_id', profile.id).not('project_id', 'is', null) : Promise.resolve({ data: [] }),
    supabase.from('team_members').select('role,teams(id,name,logo_url)').eq('profile_id', profile.id),
  ])

  const projects      = (projectsRaw as unknown as ProjectWithRelations[]) ?? []
  const assignments   = (assignmentsRaw as unknown as AssignmentWithProfile[]) ?? []
  const savedProjects = (savesRaw as any[])?.map((s: any) => s.projects).filter(Boolean) as ProjectWithRelations[] ?? []
  const teams         = (teamsRaw as any[]) ?? []

  const totalStars = projects.reduce((a, p) => a + (p.star_count ?? 0), 0)
  const featured   = projects[0] ?? null
  const rest        = projects.slice(1)

  const milestones = getMilestones(projects, totalStars)
  const heatmap    = buildHeatmap(projects, assignments)
  const timeline   = buildTimeline(projects, assignments)

  const socialLinks = [
    profile.github_url       && { href: profile.github_url,    label: 'GitHub',    icon: '⌥', color: '#6e7681' },
    profile.twitter_url      && { href: profile.twitter_url,   label: 'Twitter',   icon: '✦', color: '#1da1f2' },
    profile.instagram_url    && { href: profile.instagram_url, label: 'Instagram', icon: '◎', color: '#e1306c' },
    profile.discord_username && { href: `https://discord.com/users/${profile.discord_username}`, label: 'Discord', icon: '◈', color: '#5865f2' },
    profile.spotify_url      && { href: profile.spotify_url,   label: 'Spotify',   icon: '♪', color: '#1db954' },
  ].filter(Boolean) as Array<{ href: string; label: string; icon: string; color: string }>

  // Heatmap
  const heatDates = Object.entries(heatmap).sort(([a], [b]) => a.localeCompare(b))
  const heatWeeks: Array<Array<{ date: string; count: number }>> = []
  for (let i = 0; i < heatDates.length; i += 7)
    heatWeeks.push(heatDates.slice(i, i + 7).map(([date, count]) => ({ date, count })))
  const maxCount = Math.max(...Object.values(heatmap), 1)
  function heatColor(n: number) {
    if (n === 0) return 'var(--bg-overlay)'
    const v = Math.min(n / maxCount, 1)
    if (v < 0.25) return 'rgba(201,151,58,0.2)'
    if (v < 0.5)  return 'rgba(201,151,58,0.45)'
    if (v < 0.75) return 'rgba(201,151,58,0.7)'
    return 'var(--accent)'
  }

  return (
    <div style={{ width: '100%', paddingBottom: 120 }}>

      {/* ─────────────────────────────────────────────────────────
          CINEMATIC BANNER
          Dark atmospheric — almost film poster energy
      ───────────────────────────────────────────────────────── */}
      <div style={{
        width: '100%', height: 280, position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(160deg, #100d0a 0%, #1a1410 35%, #0d0f14 65%, #080a0f 100%)',
      }}>
        {/* Film grain */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 512 512\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.06\'/%3E%3C/svg%3E")', backgroundSize: '256px 256px', pointerEvents: 'none', opacity: 0.8 }} />
        {/* Primary glow — warm */}
        <div style={{ position: 'absolute', top: '-30%', left: '20%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,151,58,0.12) 0%, transparent 65%)', pointerEvents: 'none' }} />
        {/* Secondary glow — cool */}
        <div style={{ position: 'absolute', bottom: '-40%', right: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(80,100,200,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />
        {/* Giant watermark username */}
        <div style={{
          position: 'absolute', bottom: -16, right: -8,
          fontFamily: 'var(--font-cormorant), Georgia, serif',
          fontSize: 'clamp(96px, 18vw, 200px)',
          fontWeight: 300, lineHeight: 0.85,
          color: 'rgba(255,255,255,0.03)',
          letterSpacing: '-0.04em',
          userSelect: 'none', pointerEvents: 'none',
          whiteSpace: 'nowrap',
        }}>
          {profile.username}
        </div>
        {/* Vignette */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)', pointerEvents: 'none' }} />
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 48px' }}>

        {/* ─────────────────────────────────────────────────────
            IDENTITY HEADER
            Avatar overlapping banner + name + presence statement
        ──────────────────────────────────────────────────── */}
        <div style={{ marginBottom: 72 }}>
          {/* Avatar row — overlaps banner by 60px */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: -60 }}>
            <div style={{
              width: 120, height: 120, borderRadius: '50%',
              background: 'linear-gradient(145deg, #1a1612, #0d0f14)',
              overflow: 'hidden', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 46, color: 'rgba(201,151,58,0.7)',
              border: '3px solid var(--bg-base)',
              boxShadow: '0 12px 48px rgba(0,0,0,0.5)',
              position: 'relative',
            }}>
              {profile.avatar_url
                ? <img src={profile.avatar_url} alt={profile.username} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : <span style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontWeight: 300 }}>{profile.username[0]?.toUpperCase()}</span>}
            </div>
            {isOwn && (
              <Link href="/profile/settings" style={{
                padding: '8px 18px', borderRadius: 99,
                border: '1px solid var(--border-subtle)',
                background: 'transparent',
                fontSize: 12, color: 'var(--text-muted)', fontWeight: 400,
                letterSpacing: '0.04em',
                transition: 'all 0.2s',
              }}>
                Edit
              </Link>
            )}
          </div>

          {/* Name */}
          <div style={{ marginTop: 24, marginBottom: 6 }}>
            <h1 style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(40px, 5vw, 62px)',
              fontWeight: 400, lineHeight: 0.95,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
            }}>
              {profile.full_name || profile.username}
            </h1>
          </div>

          {/* Username + batch — minimal */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
            <span style={{ fontSize: 14, color: 'var(--accent)', fontWeight: 400, opacity: 0.8 }}>
              @{profile.username}
            </span>
            {profile.graduation_year && (
              <>
                <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--border)', flexShrink: 0, display: 'inline-block' }} />
                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Batch of {profile.graduation_year}</span>
              </>
            )}
            {profile.role === 'admin' && (
              <>
                <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--border)', flexShrink: 0, display: 'inline-block' }} />
                <span style={{ fontSize: 11, color: 'var(--danger)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>Admin</span>
              </>
            )}
          </div>

          {/* Bio — big, editorial */}
          {profile.bio && (
            <p style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(22px, 3vw, 30px)',
              fontWeight: 300, fontStyle: 'italic',
              color: 'var(--text-secondary)',
              lineHeight: 1.4, maxWidth: 600,
              marginBottom: 32,
              letterSpacing: '-0.01em',
            }}>
              &ldquo;{profile.bio}&rdquo;
            </p>
          )}

          {/* Social links — text only, no boxes */}
          {socialLinks.length > 0 && (
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {socialLinks.map(s => <SocialPill key={s.href} {...s} />)}
            </div>
          )}
        </div>

        {/* ─────────────────────────────────────────────────────
            MILESTONES — museum-style, minimal
        ──────────────────────────────────────────────────── */}
        {milestones.length > 0 && (
          <section style={{ marginBottom: 80 }}>
            <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
              {milestones.map((m, i) => (
                <div key={i}>
                  <div style={{
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: 48, fontWeight: 300,
                    color: 'var(--text-primary)', lineHeight: 1,
                    letterSpacing: '-0.02em',
                  }}>
                    {m.year}
                  </div>
                  <div style={{
                    fontSize: 9, color: 'var(--text-muted)',
                    letterSpacing: '0.2em', textTransform: 'uppercase',
                    marginTop: 6, fontWeight: 500,
                  }}>
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ─────────────────────────────────────────────────────
            SELECTED WORK — one dominant featured card, then
            smaller works below in a clean list
        ──────────────────────────────────────────────────── */}
        {projects.length > 0 && (
          <section style={{ marginBottom: 80 }}>
            {/* Section label */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 16,
              marginBottom: 32,
            }}>
              <span style={{
                fontSize: 9, letterSpacing: '0.25em', color: 'var(--text-muted)',
                textTransform: 'uppercase', fontWeight: 500,
              }}>
                Selected Work
              </span>
              <div style={{ flex: 1, height: 1, background: 'var(--border-subtle)' }} />
              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                {projects.length} project{projects.length !== 1 ? 's' : ''}
              </span>
            </div>

            {/* Featured — full width, dominant */}
            {featured && <FeaturedCard project={featured} />}

            {/* Rest — clean compact list */}
            {rest.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12, marginTop: 14 }}>
                {rest.map(p => <TinyProjectCard key={p.id} project={p} />)}
              </div>
            )}
          </section>
        )}

        {/* ─────────────────────────────────────────────────────
            ACTIVITY — contribution heatmap
            No title, just the visual — let it speak
        ──────────────────────────────────────────────────── */}
        {projects.length > 0 && (
          <section style={{ marginBottom: 80 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
              <span style={{ fontSize: 9, letterSpacing: '0.25em', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 500 }}>
                Contributions
              </span>
              <div style={{ flex: 1, height: 1, background: 'var(--border-subtle)' }} />
              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                {projects.length + assignments.length} total
              </span>
            </div>
            <div style={{ overflowX: 'auto', paddingBottom: 4 }}>
              <div style={{ display: 'flex', gap: 3, minWidth: 'fit-content' }}>
                {heatWeeks.map((week, wi) => (
                  <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {week.map(({ date, count }) => (
                      <HeatCell key={date} date={date} count={count} color={heatColor(count)} />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ─────────────────────────────────────────────────────
            FRAGMENTS — activity timeline
            Minimal, typographic
        ──────────────────────────────────────────────────── */}
        {timeline.length > 0 && (
          <section style={{ marginBottom: 80 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
              <span style={{ fontSize: 9, letterSpacing: '0.25em', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 500 }}>
                Fragments
              </span>
              <div style={{ flex: 1, height: 1, background: 'var(--border-subtle)' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {timeline.map((e, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'baseline', gap: 20,
                  padding: '16px 0',
                  borderBottom: i < timeline.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                }}>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)', minWidth: 70, flexShrink: 0, textAlign: 'right' }}>
                    {timeAgo(e.date)}
                  </span>
                  <span style={{ fontSize: 10, color: 'var(--border)' }}>{e.icon}</span>
                  <span style={{
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: 20, fontWeight: 400,
                    color: 'var(--text-primary)', lineHeight: 1.2,
                    flex: 1,
                  }}>
                    {e.text}
                  </span>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)', flexShrink: 0 }}>
                    {e.sub}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Saved — own profile only, quiet section */}
        {isOwn && savedProjects.length > 0 && (
          <section style={{ marginBottom: 80 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
              <span style={{ fontSize: 9, letterSpacing: '0.25em', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 500 }}>Saved</span>
              <div style={{ flex: 1, height: 1, background: 'var(--border-subtle)' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
              {savedProjects.map(p => <SavedCard key={p.id} project={p} />)}
            </div>
          </section>
        )}

        {/* Teams — small, unobtrusive */}
        {teams.length > 0 && (
          <section style={{ marginBottom: 80 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
              <span style={{ fontSize: 9, letterSpacing: '0.25em', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 500 }}>Teams</span>
              <div style={{ flex: 1, height: 1, background: 'var(--border-subtle)' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {teams.map((t: any, i: number) => <TeamSidebarLink key={i} team={t.teams} role={t.role} />)}
            </div>
          </section>
        )}

        {/* Empty */}
        {projects.length === 0 && assignments.length === 0 && (
          <div style={{ paddingTop: 80, textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 32, fontWeight: 300, color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: 16 }}>
              Nothing here yet.
            </div>
            {isOwn && (
              <Link href="/projects/submit" style={{ fontSize: 13, color: 'var(--accent)' }}>
                Submit your first project →
              </Link>
            )}
          </div>
        )}

      </div>
    </div>
  )
}
