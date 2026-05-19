'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import type { ProjectWithRelations, Tag } from '@/lib/types/database'

const SEMESTERS = ['1st Sem','2nd Sem','3rd Sem','4th Sem','5th Sem','6th Sem','7th Sem','8th Sem']

function getGradient(seed: string) {
  const p = [
    { from: '#1a0f2e', to: '#0a0e1a', glow: 'rgba(139,92,246,0.4)'  },
    { from: '#0d1f1a', to: '#060f14', glow: 'rgba(16,185,129,0.35)' },
    { from: '#1f0d0d', to: '#180800', glow: 'rgba(239,68,68,0.35)'  },
    { from: '#0f1c2e', to: '#060a14', glow: 'rgba(59,130,246,0.4)'  },
    { from: '#1a1200', to: '#180e00', glow: 'rgba(201,151,58,0.45)' },
    { from: '#1a0d1f', to: '#0c0814', glow: 'rgba(236,72,153,0.35)' },
    { from: '#0d1f1f', to: '#060e14', glow: 'rgba(6,182,212,0.35)'  },
    { from: '#141a0d', to: '#0c1008', glow: 'rgba(132,204,22,0.3)'  },
  ]
  let h = 0
  for (let i = 0; i < seed.length; i++) h = seed.charCodeAt(i) + ((h << 5) - h)
  return p[Math.abs(h) % p.length]
}
function getInitials(t: string) {
  const w = t.trim().split(/\s+/)
  return w.length === 1 ? w[0].slice(0, 2).toUpperCase() : (w[0][0] + w[1][0]).toUpperCase()
}

function ProjectCard({ project, index }: { project: ProjectWithRelations; index: number }) {
  const tags    = project.project_tags?.map(pt => pt.tags).filter(Boolean) ?? []
  const author  = project.profiles
  const members = project.project_members ?? []
  const g       = getGradient(project.title)
  const aid     = `${new Date().getFullYear()}/ITM/A-${String(index + 1).padStart(3, '0')}`

  return (
    <Link href={`/projects/${project.id}`} style={{
      display: 'block', borderRadius: 14, overflow: 'hidden',
      background: 'var(--bg-surface)', border: '1px solid transparent',
      textDecoration: 'none',
      boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
      transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
    }}>
      {/* Cinematic poster — no thumbnail */}
      <div style={{
        width: '100%', height: 100,
        background: `linear-gradient(160deg, ${g.from}, ${g.to})`,
        position: 'relative', overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: '100%', height: '130%', background: g.glow, filter: 'blur(40px)', opacity: 0.5 }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.07\'/%3E%3C/svg%3E")', backgroundSize: '200px', pointerEvents: 'none' }} />
        <span style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 44, fontWeight: 300, color: 'rgba(255,255,255,0.07)', letterSpacing: '-0.04em', position: 'relative', zIndex: 1 }}>{getInitials(project.title)}</span>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '55%', background: 'linear-gradient(transparent, rgba(0,0,0,0.7))' }} />
        {/* Title on poster */}
        <div style={{ position: 'absolute', bottom: 10, left: 14, right: 40 }}>
          <div style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 17, fontWeight: 300, color: 'rgba(255,255,255,0.85)', lineHeight: 1.1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {project.title}
          </div>
        </div>
        {/* Archive ID */}
        <div style={{ position: 'absolute', top: 8, right: 10, fontFamily: 'monospace', fontSize: 8, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em' }}>{aid}</div>
        {/* Stars */}
        <div style={{ position: 'absolute', bottom: 10, right: 12, fontSize: 11, color: 'rgba(201,151,58,0.8)' }}>★ {project.star_count}</div>
      </div>

      <div style={{ padding: '12px 14px' }}>
        {/* Tags */}
        {tags.length > 0 && (
          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 8 }}>
            {tags.slice(0, 3).map(t => (
              <span key={t!.id} style={{ fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>{t!.name}</span>
            ))}
          </div>
        )}
        {/* Description */}
        {project.description && (
          <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 10, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden', fontWeight: 300 }}>
            {project.description}
          </p>
        )}
        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 10, borderTop: '1px solid var(--border-subtle)' }}>
          <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--bg-overlay)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, color: 'var(--accent)', flexShrink: 0 }}>
            {author?.avatar_url ? <img src={author.avatar_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" /> : author?.username?.[0]?.toUpperCase()}
          </div>
          <span style={{ fontSize: 11, color: 'var(--text-muted)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {author?.full_name || author?.username}
          </span>
          {members.length > 1 && <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{members.length} collab</span>}
          {project.semester && <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{project.semester}</span>}
        </div>
      </div>
    </Link>
  )
}

export default function ProjectsPage() {
  const [projects, setProjects]     = useState<ProjectWithRelations[]>([])
  const [tags, setTags]             = useState<Tag[]>([])
  const [loading, setLoading]       = useState(true)
  const [search, setSearch]         = useState('')
  const [activeTags, setActiveTags] = useState<string[]>([])
  const [semester, setSemester]     = useState('')
  const [sort, setSort]             = useState<'recent' | 'stars' | 'views'>('stars')

  useEffect(() => {
    const supabase = createClient()
    supabase.from('tags').select('*').order('name').then(({ data }) => setTags((data as Tag[]) ?? []))
  }, [])

  useEffect(() => {
    async function load() {
      setLoading(true)
      const supabase = createClient()
      let q = supabase.from('projects').select(`
        *, views,
        profiles!projects_submitted_by_fkey(id,username,avatar_url,full_name),
        project_tags(tag_id,tags(id,name,color)),
        project_members(profile_id,role,profiles!project_members_profile_id_fkey(id,username,avatar_url,full_name))
      `).eq('status', 'approved')
      if (search)   q = q.ilike('title', `%${search}%`)
      if (semester) q = q.eq('semester', semester)
      if (sort === 'stars')  q = q.order('star_count', { ascending: false })
      if (sort === 'views')  q = q.order('views', { ascending: false })
      if (sort === 'recent') q = q.order('created_at', { ascending: false })
      const { data } = await q.limit(60)
      let result = (data as unknown as ProjectWithRelations[]) ?? []
      if (activeTags.length > 0)
        result = result.filter(p => p.project_tags?.some(pt => pt.tags && activeTags.includes(pt.tags.id)))
      setProjects(result)
      setLoading(false)
    }
    load()
  }, [search, activeTags, semester, sort])

  return (
    <div style={{ width: '100%', padding: 'clamp(16px,4vw,48px) clamp(12px,4vw,40px) 80px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(36px,7vw,64px)', fontWeight: 400, lineHeight: 1, marginBottom: 4 }}>
            Archive
          </h1>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            {loading ? '…' : `${projects.length} works preserved`}
          </p>
        </div>

        {/* Search */}
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search projects…"
          style={{ width: '100%', padding: '11px 14px', borderRadius: 10, marginBottom: 12 }} />

        {/* Filters row — wraps on mobile */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', marginBottom: 16 }}>
          <select value={semester} onChange={e => setSemester(e.target.value)} style={{ padding: '9px 12px', borderRadius: 9, fontSize: 13, flex: '1 1 140px', minWidth: 0 }}>
            <option value="">All Semesters</option>
            {SEMESTERS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          {/* Sort buttons */}
          <div style={{ display: 'flex', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 9, overflow: 'hidden', flex: '1 1 160px' }}>
            {(['stars','recent','views'] as const).map((s, i) => (
              <button key={s} onClick={() => setSort(s)} style={{
                flex: 1, padding: '9px 8px', border: 'none',
                borderRight: i < 2 ? '1px solid var(--border)' : 'none',
                background: sort === s ? 'var(--accent-dim)' : 'transparent',
                color: sort === s ? 'var(--accent)' : 'var(--text-secondary)',
                fontFamily: 'inherit', fontSize: 11, cursor: 'pointer',
              }}>
                {s === 'stars' ? '★' : s === 'recent' ? 'New' : 'Views'}
              </button>
            ))}
          </div>

          <Link href="/projects/submit" style={{
            padding: '9px 16px', borderRadius: 9,
            background: 'var(--accent)', color: '#1c1917',
            fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap', flexShrink: 0,
          }}>
            + Submit
          </Link>
        </div>

        {/* Tag filters — horizontal scroll on mobile */}
        {tags.length > 0 && (
          <div style={{ display: 'flex', gap: 7, overflowX: 'auto', paddingBottom: 8, marginBottom: 20 }}>
            {tags.map(tag => (
              <button key={tag.id} onClick={() => setActiveTags(prev => prev.includes(tag.id) ? prev.filter(x => x !== tag.id) : [...prev, tag.id])}
                style={{
                  padding: '5px 12px', borderRadius: 99, border: 'none',
                  background: activeTags.includes(tag.id) ? 'var(--accent-dim)' : 'var(--bg-overlay)',
                  color: activeTags.includes(tag.id) ? 'var(--accent)' : 'var(--text-secondary)',
                  fontSize: 11, fontFamily: 'inherit', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
                  fontWeight: activeTags.includes(tag.id) ? 600 : 400,
                }}>
                {tag.name}
              </button>
            ))}
          </div>
        )}

        {/* Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: 28, opacity: 0.3, marginBottom: 12 }}>◫</div>
            Loading archive…
          </div>
        ) : projects.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: 36, opacity: 0.3, marginBottom: 12 }}>◫</div>
            <div style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 22, marginBottom: 8 }}>No projects found</div>
            <div style={{ fontSize: 13 }}>Try a different search or tag</div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
            {projects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
          </div>
        )}
      </div>
    </div>
  )
}
