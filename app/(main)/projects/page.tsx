'use client'
// Projects browse page — Client Component for live filtering
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import ProjectCard from '@/components/projects/ProjectCard'
import type { ProjectWithRelations, Tag } from '@/lib/types/database'

const SEMESTERS = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th']

export default function ProjectsPage() {
  const [projects, setProjects]     = useState<ProjectWithRelations[]>([])
  const [tags, setTags]             = useState<Tag[]>([])
  const [loading, setLoading]       = useState(true)
  const [search, setSearch]         = useState('')
  const [activeTags, setActiveTags] = useState<string[]>([])
  const [semester, setSemester]     = useState('')
  const [sort, setSort]             = useState<'recent' | 'stars' | 'views'>('stars')

  useEffect(() => {
    // Load tags
    const supabase = createClient()
    supabase.from('tags').select('*').order('name').then(({ data }) => {
      setTags((data as Tag[]) ?? [])
    })
  }, [])

  useEffect(() => {
    async function load() {
      setLoading(true)
      const supabase = createClient()

      let q = supabase
        .from('projects')
        .select(`
          *,
          profiles!projects_submitted_by_fkey ( id, username, avatar_url, full_name ),
          project_tags ( tag_id, tags ( id, name, color ) ),
          project_members ( profile_id, role, profiles!project_members_profile_id_fkey ( id, username, avatar_url, full_name ) )
        `)
        .eq('status', 'approved')

      if (search) q = q.ilike('title', `%${search}%`)
      if (semester) q = q.eq('semester', semester)
      if (sort === 'stars')  q = q.order('star_count', { ascending: false })
      if (sort === 'views')  q = q.order('views', { ascending: false })
      if (sort === 'recent') q = q.order('created_at', { ascending: false })

      const { data } = await q.limit(60)
      let result = (data as unknown as ProjectWithRelations[]) ?? []

      // Client-side tag filter
      if (activeTags.length > 0) {
        result = result.filter(p =>
          p.project_tags?.some(pt => pt.tags && activeTags.includes(pt.tags.id))
        )
      }

      setProjects(result)
      setLoading(false)
    }
    load()
  }, [search, activeTags, semester, sort])

  function toggleTag(id: string) {
    setActiveTags(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  return (
    <div style={{ padding: '48px 56px 80px', maxWidth: 1200, margin: '0 auto' }}>

      {/* Header */}
      <div className="animate-fade-up" style={{ marginBottom: 48 }}>
        <h1 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(48px, 6vw, 72px)',
          fontWeight: 400, color: 'var(--text-primary)',
          lineHeight: 1, marginBottom: 12,
        }}>
          All Projects
        </h1>
        <p style={{ fontSize: 15, color: 'var(--text-muted)', fontWeight: 300 }}>
          {projects.length} project{projects.length !== 1 ? 's' : ''} archived and growing
        </p>
      </div>

      {/* Search + Sort bar */}
      <div className="animate-fade-up delay-1" style={{
        display: 'flex', gap: 12, flexWrap: 'wrap',
        marginBottom: 24, alignItems: 'center',
      }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search projects…"
          style={{ flex: '1 1 240px', padding: '10px 14px', borderRadius: 10, minWidth: 200 }}
        />
        <select
          value={semester}
          onChange={e => setSemester(e.target.value)}
          style={{ padding: '10px 14px', borderRadius: 10, minWidth: 140 }}
        >
          <option value="">All Semesters</option>
          {SEMESTERS.map(s => <option key={s} value={s + ' Sem'}>{s} Semester</option>)}
        </select>
        <div style={{ display: 'flex', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
          {(['stars','recent','views'] as const).map(s => (
            <button key={s} onClick={() => setSort(s)} style={{
              padding: '9px 16px', border: 'none', cursor: 'pointer',
              background: sort === s ? 'var(--accent-dim)' : 'transparent',
              color: sort === s ? 'var(--accent)' : 'var(--text-secondary)',
              fontFamily: 'inherit', fontSize: 13, fontWeight: sort === s ? 500 : 400,
              transition: 'all 0.15s',
              borderRight: s !== 'views' ? '1px solid var(--border)' : 'none',
            }}>
              {s === 'stars' ? '★ Stars' : s === 'recent' ? '◷ Recent' : '◎ Views'}
            </button>
          ))}
        </div>
        <a href="/projects/submit" style={{
          padding: '10px 20px', borderRadius: 10,
          background: 'var(--accent)', color: '#1c1917',
          fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap',
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          + Submit Project
        </a>
      </div>

      {/* Tag filters */}
      {tags.length > 0 && (
        <div className="animate-fade-up delay-2" style={{
          display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 36,
        }}>
          {tags.map(tag => (
            <button key={tag.id} onClick={() => toggleTag(tag.id)}
              className={`tag-pill ${activeTags.includes(tag.id) ? 'active' : ''}`}
              style={{ cursor: 'pointer', border: 'none', fontFamily: 'inherit' }}
            >
              {tag.name}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: 32, marginBottom: 12, opacity: 0.4 }}>◫</div>
          Loading projects…
        </div>
      ) : projects.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: 40, marginBottom: 12, opacity: 0.3 }}>◫</div>
          <div style={{ fontSize: 18, fontFamily: 'Cormorant Garamond, serif', marginBottom: 8 }}>
            No projects found
          </div>
          <div style={{ fontSize: 13 }}>Try a different search or tag</div>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 20,
        }}>
          {projects.map((p, i) => (
            <div key={p.id} className={`animate-fade-up delay-${Math.min(i+1,5)}`}>
              <ProjectCard project={p} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
