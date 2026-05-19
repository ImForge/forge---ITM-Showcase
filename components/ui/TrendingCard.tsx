'use client'
// Cards as preserved artifacts — not posts.
// Classification marks, archive IDs, monospace metadata.
import Link from 'next/link'
import { useState } from 'react'
import type { ProjectWithRelations, AssignmentWithProfile } from '@/lib/types/database'

// ─── GRADIENT ENGINE ──────────────────────────────────────────────────────
function getGradient(seed: string) {
  const p = [
    { from: '#1a0f2e', to: '#0a0e1a', glow: 'rgba(139,92,246,0.5)'   },
    { from: '#0d1f1a', to: '#060f14', glow: 'rgba(16,185,129,0.45)'  },
    { from: '#1f0d0d', to: '#180800', glow: 'rgba(239,68,68,0.45)'   },
    { from: '#0f1c2e', to: '#060a14', glow: 'rgba(59,130,246,0.45)'  },
    { from: '#1a1200', to: '#180e00', glow: 'rgba(201,151,58,0.55)'  },
    { from: '#1a0d1f', to: '#0c0814', glow: 'rgba(236,72,153,0.45)'  },
    { from: '#0d1f1f', to: '#060e14', glow: 'rgba(6,182,212,0.45)'   },
    { from: '#141a0d', to: '#0c1008', glow: 'rgba(132,204,22,0.4)'   },
  ]
  let h = 0
  for (let i = 0; i < seed.length; i++) h = seed.charCodeAt(i) + ((h << 5) - h)
  return p[Math.abs(h) % p.length]
}
function getInitials(t: string) {
  const w = t.trim().split(/\s+/)
  return w.length === 1 ? w[0].slice(0, 2).toUpperCase() : (w[0][0] + w[1][0]).toUpperCase()
}
function archiveId(id: string, idx: number) {
  const yr = new Date().getFullYear()
  return `${yr}/ITM/A-${String(idx + 1).padStart(3, '0')}`
}

function PosterBg({ title, height }: { title: string; height: number }) {
  const g = getGradient(title)
  return (
    <div style={{ width: '100%', height, background: `linear-gradient(160deg, ${g.from}, ${g.to})`, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.08\'/%3E%3C/svg%3E")', backgroundSize: '200px', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: '100%', height: '130%', background: g.glow, filter: 'blur(52px)', opacity: 0.55, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-30%', right: '-10%', width: '60%', height: '100%', background: g.glow, filter: 'blur(64px)', opacity: 0.18, pointerEvents: 'none' }} />
      <div style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: height * 0.44, fontWeight: 300, color: 'rgba(255,255,255,0.065)', letterSpacing: '-0.04em', lineHeight: 1, userSelect: 'none', position: 'relative', zIndex: 1 }}>
        {getInitials(title)}
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%', background: 'linear-gradient(transparent, rgba(0,0,0,0.72))', pointerEvents: 'none' }} />
    </div>
  )
}

function InitialSquare({ title, size = 48 }: { title: string; size?: number }) {
  const g = getGradient(title)
  return (
    <div style={{ width: size, height: size, borderRadius: size * 0.22, flexShrink: 0, background: `linear-gradient(145deg, ${g.from}, ${g.to})`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: g.glow, filter: 'blur(10px)', opacity: 0.65 }} />
      <span style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: size * 0.36, fontWeight: 500, color: 'rgba(255,255,255,0.6)', position: 'relative', zIndex: 1 }}>{getInitials(title)}</span>
    </div>
  )
}

// ─── HERO PROJECT CARD ────────────────────────────────────────────────────
export function HeroProjectCard({ project, archiveIndex = 0 }: { project: ProjectWithRelations; archiveIndex?: number }) {
  const tags    = project.project_tags?.map(pt => pt.tags).filter(Boolean) ?? []
  const author  = project.profiles
  const members = project.project_members ?? []
  const [hov, setHov] = useState(false)
  const aid = archiveId(project.id, archiveIndex)

  return (
    <Link href={`/projects/${project.id}`}
      style={{
        display: 'flex', flexDirection: 'column', borderRadius: 20, overflow: 'hidden',
        textDecoration: 'none', background: 'var(--bg-surface)',
        border: '1px solid transparent',
        transition: 'all 0.5s cubic-bezier(0.22,1,0.36,1)',
        transform: hov ? 'translateY(-6px) scale(1.008)' : 'translateY(0) scale(1)',
        boxShadow: hov ? '0 32px 80px rgba(0,0,0,0.3), 0 0 0 1px rgba(201,151,58,0.18)' : '0 2px 20px rgba(0,0,0,0.1)',
      }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>

      <div style={{ position: 'relative', flex: '1 0 320px' }}>
        <PosterBg title={project.title} height={320} />
        {/* Classification mark — top left */}
        <div style={{
          position: 'absolute', top: 14, left: 14,
          fontFamily: 'monospace', fontSize: 9,
          padding: '3px 10px', borderRadius: 4,
          background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.06)',
          color: 'rgba(201,151,58,0.8)',
          letterSpacing: '0.12em',
        }}>
          {aid}
        </div>
        {/* Stats — top right */}
        <div style={{ position: 'absolute', top: 14, right: 14, display: 'flex', gap: 6 }}>
          {[`★ ${project.star_count}`, `◎ ${(project as any).views ?? 0}`].map(l => (
            <span key={l} style={{ fontFamily: 'monospace', fontSize: 10, padding: '3px 10px', borderRadius: 4, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.55)' }}>{l}</span>
          ))}
        </div>
        {/* Title overlaid on poster */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 24px' }}>
          {tags.length > 0 && (
            <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
              {tags.slice(0, 3).map(t => (
                <span key={t!.id} style={{ fontSize: 9, padding: '2px 8px', borderRadius: 3, background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.09)', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>
                  {t!.name}
                </span>
              ))}
            </div>
          )}
          <h2 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 34, fontWeight: 300, color: 'rgba(255,255,255,0.88)', lineHeight: 1.0, letterSpacing: '-0.02em', margin: 0 }}>
            {project.title}
          </h2>
        </div>
      </div>

      <div style={{ padding: '20px 24px 24px' }}>
        {project.description && (
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 16, fontWeight: 300 }}>
            {project.description.slice(0, 120)}{project.description.length > 120 ? '…' : ''}
          </p>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 14, borderTop: '1px solid var(--border-subtle)', fontSize: 12, color: 'var(--text-muted)' }}>
          <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--bg-overlay)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: 'var(--accent)', flexShrink: 0 }}>
            {author?.avatar_url ? <img src={author.avatar_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" /> : author?.username?.[0]?.toUpperCase()}
          </div>
          <span>{author?.full_name || author?.username}</span>
          {members.length > 1 && <span style={{ opacity: 0.5 }}>· {members.length} contributors</span>}
          {project.semester && <span style={{ marginLeft: 'auto', opacity: 0.5 }}>{project.semester}</span>}
        </div>
      </div>
    </Link>
  )
}

// ─── SIDE PROJECT CARD ────────────────────────────────────────────────────
export function SideProjectCard({ project, archiveIndex = 0 }: { project: ProjectWithRelations; archiveIndex?: number }) {
  const tags = project.project_tags?.map(pt => pt.tags).filter(Boolean) ?? []
  const [hov, setHov] = useState(false)
  const aid = archiveId(project.id, archiveIndex)

  return (
    <Link href={`/projects/${project.id}`}
      style={{
        display: 'flex', alignItems: 'center', gap: 16, padding: '16px 18px',
        borderRadius: 14, textDecoration: 'none', flex: 1,
        background: hov ? 'var(--bg-elevated)' : 'var(--bg-surface)',
        border: '1px solid transparent',
        transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
        transform: hov ? 'translateX(8px)' : 'translateX(0)',
        boxShadow: hov ? '0 8px 32px rgba(0,0,0,0.18)' : '0 1px 8px rgba(0,0,0,0.05)',
      }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <InitialSquare title={project.title} size={52} />
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Archive ID — monospace metadata */}
        <div style={{ fontFamily: 'monospace', fontSize: 8, color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: 4, opacity: 0.6 }}>
          {aid}
        </div>
        <h3 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 20, fontWeight: 400, lineHeight: 1.15, color: 'var(--text-primary)', marginBottom: 5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', letterSpacing: '-0.01em' }}>
          {project.title}
        </h3>
        {project.description && (
          <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 5, display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }}>
            {project.description}
          </p>
        )}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {tags.slice(0, 2).map(t => <span key={t!.id} style={{ fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>{t!.name}</span>)}
          {tags.length > 0 && <span style={{ color: 'var(--border)', fontSize: 9 }}>·</span>}
          <span style={{ fontSize: 10, color: 'var(--accent)', opacity: 0.8 }}>★ {project.star_count}</span>
        </div>
      </div>
      <div style={{ fontSize: 20, color: hov ? 'var(--accent)' : 'var(--border)', transition: 'all 0.25s', transform: hov ? 'translateX(3px)' : 'translateX(0)', flexShrink: 0 }}>›</div>
    </Link>
  )
}

// ─── ARCHIVE CARD ─────────────────────────────────────────────────────────
export function ArchiveCard({ project, archiveIndex = 0 }: { project: ProjectWithRelations; archiveIndex?: number }) {
  const tags = project.project_tags?.map(pt => pt.tags).filter(Boolean) ?? []
  const [hov, setHov] = useState(false)
  const aid = archiveId(project.id, archiveIndex)

  return (
    <Link href={`/projects/${project.id}`}
      style={{
        borderRadius: 16, overflow: 'hidden', textDecoration: 'none',
        background: hov ? 'var(--bg-elevated)' : 'var(--bg-surface)',
        border: '1px solid transparent',
        transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
        transform: hov ? 'translateY(-5px) scale(1.012)' : 'translateY(0) scale(1)',
        boxShadow: hov ? '0 20px 48px rgba(0,0,0,0.22), 0 0 0 1px rgba(201,151,58,0.12)' : '0 1px 8px rgba(0,0,0,0.05)',
        display: 'flex', flexDirection: 'column',
      }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div style={{ position: 'relative' }}>
        <PosterBg title={project.title} height={96} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '8px 14px' }}>
          <div style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 19, fontWeight: 300, color: 'rgba(255,255,255,0.82)', lineHeight: 1.1 }}>
            {project.title}
          </div>
        </div>
        {/* Classification mark */}
        <div style={{ position: 'absolute', top: 8, right: 10, fontFamily: 'monospace', fontSize: 8, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>
          {aid}
        </div>
      </div>
      <div style={{ padding: '12px 14px 16px', flex: 1 }}>
        {project.description && (
          <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.55, marginBottom: 10, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden', fontWeight: 300 }}>
            {project.description}
          </p>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ flex: 1, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {tags.slice(0, 2).map(t => <span key={t!.id} style={{ fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>{t!.name}</span>)}
          </div>
          <span style={{ fontSize: 10, color: 'var(--accent)', opacity: 0.7, flexShrink: 0 }}>★ {project.star_count}</span>
        </div>
      </div>
    </Link>
  )
}

// ─── ASSIGNMENT CARD ──────────────────────────────────────────────────────
export function AssignmentCard({ assignment }: { assignment: AssignmentWithProfile }) {
  const [hov, setHov] = useState(false)
  const fi = assignment.file_url?.endsWith('.pdf')            ? { l: 'PDF',  c: 'rgba(239,68,68,0.75)'  } :
             assignment.file_url?.match(/\.(jpg|png|jpeg)/i) ? { l: 'IMG',  c: 'rgba(59,130,246,0.75)' } :
             assignment.file_url?.endsWith('.docx')           ? { l: 'DOC',  c: 'rgba(59,130,246,0.75)' } :
             assignment.file_url?.endsWith('.pptx')           ? { l: 'PPT',  c: 'rgba(234,179,8,0.75)'  } :
                                                                { l: 'FILE', c: 'rgba(160,152,144,0.7)' }
  return (
    <Link href={`/assignments/${assignment.id}`}
      style={{ display: 'flex', alignItems: 'flex-start', gap: 16, padding: '16px 18px', borderRadius: 12, textDecoration: 'none', background: hov ? 'var(--bg-elevated)' : 'var(--bg-surface)', border: '1px solid transparent', transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)', transform: hov ? 'translateX(5px)' : 'translateX(0)', boxShadow: hov ? '0 6px 24px rgba(0,0,0,0.14)' : '0 1px 6px rgba(0,0,0,0.04)' }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div style={{ fontFamily: 'monospace', fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', color: fi.c, paddingTop: 3, flexShrink: 0, minWidth: 28 }}>
        {fi.l}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: 'monospace', fontSize: 8, color: 'var(--text-muted)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 5 }}>
          {assignment.subject} · {assignment.semester}
        </div>
        <div style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 19, fontWeight: 400, color: 'var(--text-primary)', lineHeight: 1.15, marginBottom: 5, letterSpacing: '-0.01em' }}>
          {assignment.title}
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>@{assignment.profiles?.username}</div>
      </div>
      <div style={{ fontSize: 16, color: hov ? 'var(--accent)' : 'var(--border)', transition: 'all 0.2s', flexShrink: 0, paddingTop: 2 }}>›</div>
    </Link>
  )
}
