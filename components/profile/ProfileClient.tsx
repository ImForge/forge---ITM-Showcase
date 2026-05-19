'use client'
import Link from 'next/link'
import { useState } from 'react'
import type { ProjectWithRelations, AssignmentWithProfile } from '@/lib/types/database'

// ─── GRADIENT ENGINE ──────────────────────────────────────────────────────
function getGradient(seed: string) {
  const p = [
    { from: '#1a0f2e', to: '#0d1b2a', glow: 'rgba(139,92,246,0.4)'  },
    { from: '#0d1f1a', to: '#0a1628', glow: 'rgba(16,185,129,0.35)' },
    { from: '#1f0d0d', to: '#2a1200', glow: 'rgba(239,68,68,0.35)'  },
    { from: '#0f1c2e', to: '#0a0f1a', glow: 'rgba(59,130,246,0.4)'  },
    { from: '#1a1200', to: '#2a1800', glow: 'rgba(201,151,58,0.45)' },
    { from: '#1a0d1f', to: '#0f0a1f', glow: 'rgba(236,72,153,0.35)' },
    { from: '#0d1f1f', to: '#091520', glow: 'rgba(6,182,212,0.35)'  },
    { from: '#1a1a0d', to: '#121200', glow: 'rgba(132,204,22,0.3)'  },
  ]
  let h = 0
  for (let i = 0; i < seed.length; i++) h = seed.charCodeAt(i) + ((h << 5) - h)
  return p[Math.abs(h) % p.length]
}

function getInitials(title: string) {
  const w = title.trim().split(/\s+/)
  return w.length === 1 ? w[0].slice(0, 2).toUpperCase() : (w[0][0] + w[1][0]).toUpperCase()
}

function PosterBg({ title, height = 200 }: { title: string; height?: number }) {
  const g = getGradient(title)
  return (
    <div style={{ width: '100%', height, background: `linear-gradient(145deg, ${g.from}, ${g.to})`, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.06\'/%3E%3C/svg%3E")', backgroundSize: '200px 200px', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '5%', left: '50%', transform: 'translateX(-50%)', width: '90%', height: '90%', borderRadius: '50%', background: g.glow, filter: 'blur(50px)', pointerEvents: 'none' }} />
      <span style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: height * 0.42, fontWeight: 300, color: 'rgba(255,255,255,0.08)', letterSpacing: '-0.04em', lineHeight: 1, userSelect: 'none', position: 'relative', zIndex: 1 }}>
        {getInitials(title)}
      </span>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '55%', background: 'linear-gradient(transparent, rgba(0,0,0,0.65))', pointerEvents: 'none' }} />
    </div>
  )
}

function InitialSquare({ title, size = 44 }: { title: string; size?: number }) {
  const g = getGradient(title)
  return (
    <div style={{ width: size, height: size, borderRadius: size * 0.22, flexShrink: 0, background: `linear-gradient(145deg, ${g.from}, ${g.to})`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: g.glow.replace(/[\d.]+\)$/, '0.45)'), filter: 'blur(8px)' }} />
      <span style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: size * 0.36, fontWeight: 500, color: 'rgba(255,255,255,0.65)', position: 'relative', zIndex: 1, letterSpacing: '0.02em' }}>
        {getInitials(title)}
      </span>
    </div>
  )
}

// ─── SOCIAL PILL ──────────────────────────────────────────────────────────
export function SocialPill({ href, label, icon, color }: { href: string; label: string; icon: string; color: string }) {
  const [hov, setHov] = useState(false)
  return (
    <a href={href} target="_blank" rel="noopener"
      style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 14px', borderRadius: 99, background: 'transparent', border: `1px solid ${hov ? color : 'var(--border-subtle)'}`, fontSize: 12, color: hov ? color : 'var(--text-muted)', transition: 'all 0.2s', textDecoration: 'none' }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {icon} {label}
    </a>
  )
}

// ─── ACHIEVEMENT BADGE (kept for backward compat but unused in new page) ──
export function AchievementBadge({ icon, label, desc }: { icon: string; label: string; desc: string }) {
  const [hov, setHov] = useState(false)
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', borderRadius: 12, background: hov ? 'var(--accent-light)' : 'var(--bg-surface)', border: `1px solid ${hov ? 'var(--accent)' : 'var(--border-subtle)'}`, transition: 'all 0.2s', cursor: 'default' }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <span style={{ fontSize: 18 }}>{icon}</span>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{label}</div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{desc}</div>
      </div>
    </div>
  )
}

// ─── FEATURED CARD — cinematic, dominant ─────────────────────────────────
export function FeaturedCard({ project }: { project: ProjectWithRelations }) {
  const tags    = project.project_tags?.map(pt => pt.tags).filter(Boolean) ?? []
  const members = project.project_members ?? []
  const [hov, setHov] = useState(false)

  return (
    <Link href={`/projects/${project.id}`}
      style={{ display: 'block', borderRadius: 20, overflow: 'hidden', textDecoration: 'none', background: 'var(--bg-surface)', border: '1px solid', borderColor: hov ? 'rgba(255,255,255,0.06)' : 'var(--border-subtle)', transition: 'all 0.5s cubic-bezier(0.22,1,0.36,1)', transform: hov ? 'translateY(-6px) scale(1.005)' : 'translateY(0) scale(1)', boxShadow: hov ? '0 32px 80px rgba(0,0,0,0.35)' : '0 4px 20px rgba(0,0,0,0.1)', marginBottom: 16 }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>

      {/* Poster — title overlaid on gradient */}
      <div style={{ position: 'relative' }}>
        <PosterBg title={project.title} height={260} />
        {/* Title overlay on poster */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 28px 24px' }}>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
            {tags.slice(0, 3).map(t => (
              <span key={t!.id} style={{ fontSize: 9, padding: '3px 10px', borderRadius: 99, background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.06em', textTransform: 'uppercase' as const, fontWeight: 500 }}>
                {t!.name}
              </span>
            ))}
          </div>
          <div style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 36, fontWeight: 300, color: 'rgba(255,255,255,0.88)', lineHeight: 1.0, letterSpacing: '-0.02em' }}>
            {project.title}
          </div>
        </div>
        {/* Star badge */}
        <div style={{ position: 'absolute', top: 16, right: 16, fontSize: 11, padding: '4px 12px', borderRadius: 99, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)' }}>
          ★ {project.star_count}
        </div>
      </div>

      {/* Minimal text below */}
      <div style={{ padding: '20px 28px 24px' }}>
        {project.description && (
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 16, fontWeight: 300, maxWidth: 560 }}>
            {project.description}
          </p>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 12, color: 'var(--text-muted)' }}>
          {/* Collaborator stack */}
          {members.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ display: 'flex' }}>
                {members.slice(0, 4).map((m, i) => (
                  <div key={m.profile_id} style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--bg-overlay)', overflow: 'hidden', border: '2px solid var(--bg-surface)', marginLeft: i > 0 ? -7 : 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: 'var(--accent)' }}>
                    {m.profiles?.avatar_url ? <img src={m.profiles.avatar_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" /> : m.profiles?.username?.[0]?.toUpperCase()}
                  </div>
                ))}
              </div>
              <span>{members.length} collaborator{members.length !== 1 ? 's' : ''}</span>
            </div>
          )}
          {project.semester && <span style={{ opacity: 0.6 }}>· {project.semester}</span>}
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 12 }}>
            {project.repo_url  && <span style={{ color: 'var(--accent)', opacity: 0.8 }}>⌥ Repo</span>}
            {project.live_url  && <span style={{ color: 'var(--accent)', opacity: 0.8 }}>◎ Live</span>}
            <span style={{ opacity: 0.5 }}>{(project as any).views ?? 0} views</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

// ─── SMALL PROJECT CARD (not used in new profile but kept for compat) ─────
export function SmallProjectCard({ project }: { project: ProjectWithRelations }) {
  const tags = project.project_tags?.map(pt => pt.tags).filter(Boolean) ?? []
  const [hov, setHov] = useState(false)
  return (
    <Link href={`/projects/${project.id}`}
      style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid', borderColor: hov ? 'rgba(201,151,58,0.25)' : 'var(--border-subtle)', display: 'block', textDecoration: 'none', background: hov ? 'var(--bg-elevated)' : 'var(--bg-surface)', transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)', transform: hov ? 'translateY(-3px)' : 'translateY(0)', boxShadow: hov ? '0 10px 30px rgba(0,0,0,0.15)' : 'none' }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <PosterBg title={project.title} height={100} />
      <div style={{ padding: '14px' }}>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 6 }}>
          {tags.slice(0, 2).map(t => <span key={t!.id} className="tag-pill">{t!.name}</span>)}
        </div>
        <div style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 18, fontWeight: 400, color: 'var(--text-primary)' }}>{project.title}</div>
        <div style={{ fontSize: 11, color: 'var(--accent)', marginTop: 4 }}>★ {project.star_count}</div>
      </div>
    </Link>
  )
}

// ─── TINY PROJECT CARD — clean list item ─────────────────────────────────
// Used in "All Projects" grid below the featured card
export function TinyProjectCard({ project }: { project: ProjectWithRelations }) {
  const tags = project.project_tags?.map(pt => pt.tags).filter(Boolean) ?? []
  const [hov, setHov] = useState(false)
  return (
    <Link href={`/projects/${project.id}`}
      style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px', borderRadius: 12, border: '1px solid', borderColor: hov ? 'rgba(201,151,58,0.2)' : 'var(--border-subtle)', textDecoration: 'none', background: hov ? 'var(--bg-elevated)' : 'var(--bg-surface)', transition: 'all 0.25s cubic-bezier(0.22,1,0.36,1)', transform: hov ? 'translateX(6px)' : 'translateX(0)' }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <InitialSquare title={project.title} size={44} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 18, fontWeight: 400, color: 'var(--text-primary)', lineHeight: 1.15, marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {project.title}
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {tags.slice(0, 2).map(t => <span key={t!.id} style={{ fontSize: 10, color: 'var(--text-muted)' }}>{t!.name}</span>)}
          {tags.length > 0 && <span style={{ fontSize: 10, color: 'var(--border)' }}>·</span>}
          <span style={{ fontSize: 11, color: 'var(--accent)' }}>★ {project.star_count}</span>
        </div>
      </div>
      <span style={{ fontSize: 18, color: hov ? 'var(--accent)' : 'var(--border)', transition: 'color 0.2s, transform 0.2s', transform: hov ? 'translateX(3px)' : 'translateX(0)', flexShrink: 0 }}>›</span>
    </Link>
  )
}

// ─── SAVED CARD ───────────────────────────────────────────────────────────
export function SavedCard({ project }: { project: ProjectWithRelations }) {
  const [hov, setHov] = useState(false)
  return (
    <Link href={`/projects/${project.id}`}
      style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 10, background: 'transparent', border: `1px solid ${hov ? 'rgba(201,151,58,0.2)' : 'var(--border-subtle)'}`, textDecoration: 'none', transition: 'all 0.2s', transform: hov ? 'translateX(4px)' : 'translateX(0)' }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <InitialSquare title={project.title} size={32} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 15, fontWeight: 400, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{project.title}</div>
        <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>@{project.profiles?.username}</div>
      </div>
    </Link>
  )
}

// ─── HEAT CELL ────────────────────────────────────────────────────────────
export function HeatCell({ date, count, color }: { date: string; count: number; color: string }) {
  const [hov, setHov] = useState(false)
  return (
    <div title={`${date}: ${count}`} style={{ width: 12, height: 12, borderRadius: 3, background: color, transition: 'transform 0.15s', transform: hov ? 'scale(1.5)' : 'scale(1)', cursor: count > 0 ? 'pointer' : 'default' }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} />
  )
}

// ─── TEAM SIDEBAR LINK ────────────────────────────────────────────────────
export function TeamSidebarLink({ team, role }: { team: any; role: string }) {
  const [hov, setHov] = useState(false)
  return (
    <Link href={`/teams/${team?.id}`}
      style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', padding: '10px 12px', borderRadius: 10, background: hov ? 'var(--bg-overlay)' : 'transparent', transition: 'all 0.15s', transform: hov ? 'translateX(4px)' : 'translateX(0)' }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div style={{ width: 34, height: 34, borderRadius: 9, flexShrink: 0, background: 'var(--bg-overlay)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: 'var(--accent)', border: '1px solid var(--border-subtle)' }}>
        {team?.logo_url ? <img src={team.logo_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" /> : team?.name?.[0]?.toUpperCase()}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{team?.name}</div>
        <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'capitalize' }}>{role}</div>
      </div>
      <span style={{ fontSize: 16, color: hov ? 'var(--accent)' : 'var(--border)', transition: 'color 0.15s' }}>›</span>
    </Link>
  )
}

// ─── ASSIGNMENT SIDEBAR LINK ──────────────────────────────────────────────
export function AssignmentSidebarLink({ assignment }: { assignment: AssignmentWithProfile }) {
  const [hov, setHov] = useState(false)
  const icon = assignment.file_url?.endsWith('.pdf') ? '📄' : assignment.file_url?.match(/\.(jpg|png)/i) ? '🖼' : '📎'
  return (
    <Link href={`/assignments/${assignment.id}`}
      style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', padding: '8px 10px', borderRadius: 10, background: hov ? 'var(--bg-overlay)' : 'transparent', transition: 'background 0.15s' }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div style={{ width: 32, height: 32, borderRadius: 8, flexShrink: 0, background: 'var(--bg-overlay)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>{icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{assignment.title}</div>
        <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{assignment.subject}</div>
      </div>
    </Link>
  )
}
