'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

type ProjectNode = {
  id: string; title: string; description: string | null
  star_count: number; semester: string | null; submitted_by: string
  profiles: { username: string; avatar_url: string | null; full_name: string | null } | null
  project_tags: Array<{ tags: { id: string; name: string } | null }>
  children: ProjectNode[]; depth: number
}
type BuildOnRow = { parent_project_id: string; child_project_id: string }

function getGradient(seed: string) {
  const p = [
    { from: '#1a0f2e', to: '#0a0e1a', glow: 'rgba(139,92,246,0.4)'  },
    { from: '#0d1f1a', to: '#060f14', glow: 'rgba(16,185,129,0.35)' },
    { from: '#1a1200', to: '#180e00', glow: 'rgba(201,151,58,0.45)' },
    { from: '#0f1c2e', to: '#060a14', glow: 'rgba(59,130,246,0.4)'  },
  ]
  let h = 0
  for (let i = 0; i < seed.length; i++) h = seed.charCodeAt(i) + ((h << 5) - h)
  return p[Math.abs(h) % p.length]
}
function getInitials(t: string) {
  const w = t.trim().split(/\s+/)
  return w.length === 1 ? w[0].slice(0, 2).toUpperCase() : (w[0][0] + w[1][0]).toUpperCase()
}

export default function BuildOnPage() {
  const [roots, setRoots]         = useState<ProjectNode[]>([])
  const [loading, setLoading]     = useState(true)
  const [expanded, setExpanded]   = useState<Set<string>>(new Set())
  const [search, setSearch]       = useState('')
  const [totalChains, setTotal]   = useState(0)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: buildOns } = await supabase.from('build_ons').select('parent_project_id, child_project_id')
      const relations = (buildOns as BuildOnRow[]) ?? []
      const { data: allProjectsRaw } = await supabase.from('projects')
        .select(`id, title, description, star_count, semester, submitted_by,
          profiles!projects_submitted_by_fkey(username, avatar_url, full_name),
          project_tags(tags(id, name))`)
        .eq('status', 'approved').order('star_count', { ascending: false })

      const projectMap = new Map<string, ProjectNode>()
      for (const p of (allProjectsRaw as any[]) ?? [])
        projectMap.set(p.id, { ...p, children: [], depth: 0 })

      const childIds = new Set(relations.map(r => r.child_project_id))
      for (const { parent_project_id, child_project_id } of relations) {
        const parent = projectMap.get(parent_project_id)
        const child  = projectMap.get(child_project_id)
        if (parent && child) parent.children.push(child)
      }

      const rootNodes: ProjectNode[] = []
      for (const [id, node] of projectMap.entries()) {
        if (relations.some(r => r.parent_project_id === id) && !childIds.has(id))
          rootNodes.push(node)
      }

      function setDepth(node: ProjectNode, depth: number) {
        node.depth = depth; node.children.forEach(c => setDepth(c, depth + 1))
      }
      rootNodes.forEach(r => setDepth(r, 0))
      setRoots(rootNodes)
      setTotal(relations.length)
      setExpanded(new Set(rootNodes.map(r => r.id)))
      setLoading(false)
    }
    load()
  }, [])

  function toggleExpand(id: string) {
    setExpanded(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function matchesSearch(node: ProjectNode): boolean {
    if (!search) return true
    const q = search.toLowerCase()
    return node.title.toLowerCase().includes(q) || node.children.some(c => matchesSearch(c))
  }

  function countChain(node: ProjectNode): number {
    return 1 + node.children.reduce((acc, c) => acc + countChain(c), 0)
  }

  function TreeNode({ node }: { node: ProjectNode }) {
    const hasChildren = node.children.length > 0
    const isOpen = expanded.has(node.id)
    const tags = node.project_tags?.map(pt => pt.tags).filter(Boolean) ?? []
    const g = getGradient(node.title)

    return (
      <div style={{ marginBottom: 8 }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          {/* Indent line */}
          {node.depth > 0 && (
            <div style={{ width: node.depth * 20, flexShrink: 0, position: 'relative', alignSelf: 'stretch' }}>
              <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 1, background: 'var(--border-subtle)' }} />
              <div style={{ position: 'absolute', right: 0, top: 20, width: 12, height: 1, background: 'var(--border-subtle)' }} />
            </div>
          )}

          {/* Card */}
          <div style={{ flex: 1, minWidth: 0, background: node.depth === 0 ? 'var(--accent-light)' : 'var(--bg-surface)', border: `1px solid ${node.depth === 0 ? 'rgba(201,151,58,0.25)' : 'var(--border-subtle)'}`, borderRadius: 12, padding: '12px 14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {/* Initials square */}
              <div style={{ width: 36, height: 36, borderRadius: 9, flexShrink: 0, background: `linear-gradient(145deg, ${g.from}, ${g.to})`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, background: g.glow, filter: 'blur(8px)', opacity: 0.6 }} />
                <span style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.65)', position: 'relative', zIndex: 1 }}>{getInitials(node.title)}</span>
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <Link href={`/projects/${node.id}`} style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 16, fontWeight: 400, color: node.depth === 0 ? 'var(--accent)' : 'var(--text-primary)', lineHeight: 1.2, display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {node.title}
                </Link>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>
                  @{node.profiles?.username}{node.semester ? ` · ${node.semester}` : ''}{hasChildren ? ` · ${node.children.length} built on this` : ''}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                <span style={{ fontSize: 11, color: 'var(--accent)' }}>★ {node.star_count}</span>
                {hasChildren && (
                  <button onClick={() => toggleExpand(node.id)} style={{ width: 26, height: 26, borderRadius: 7, background: isOpen ? 'var(--accent-dim)' : 'var(--bg-overlay)', border: `1px solid ${isOpen ? 'var(--accent)' : 'var(--border-subtle)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: isOpen ? 'var(--accent)' : 'var(--text-muted)', cursor: 'pointer', flexShrink: 0 }}>
                    {isOpen ? '▾' : '▸'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Children */}
        {hasChildren && isOpen && (
          <div style={{ marginLeft: Math.min(node.depth + 1, 3) * 20 + 10, marginTop: 6 }}>
            {node.children.map(child => <TreeNode key={child.id} node={child} />)}
          </div>
        )}
      </div>
    )
  }

  const filtered = roots.filter(matchesSearch)

  return (
    <div style={{ width: '100%', padding: 'clamp(20px,4vw,48px) clamp(16px,4vw,48px) 80px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: 36 }}>
          <p style={{ fontSize: 10, letterSpacing: '0.15em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 10 }}>Knowledge Lineage</p>
          <h1 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(40px, 7vw, 72px)', fontWeight: 400, lineHeight: 1, marginBottom: 10 }}>Build-on Tree</h1>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: 500 }}>How ideas compound at ITM University. Every project that built on another, chained together.</p>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 1, background: 'var(--border)', borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border)', marginBottom: 28 }}>
          {[{ label: 'Chains', value: totalChains }, { label: 'Origin Projects', value: roots.length }].map(({ label, value }) => (
            <div key={label} style={{ flex: 1, background: 'var(--bg-surface)', padding: '16px 12px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 32, fontWeight: 300 }}>{value}</div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Search */}
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search projects…" style={{ width: '100%', padding: '11px 14px', borderRadius: 10, marginBottom: 24 }} />

        {/* Tree */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: 28, opacity: 0.3, marginBottom: 12 }}>◫</div>
            Building the tree…
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', background: 'var(--bg-surface)', border: '2px dashed var(--border)', borderRadius: 20 }}>
            <div style={{ fontSize: 36, opacity: 0.2, marginBottom: 12 }}>◫</div>
            <div style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 22, marginBottom: 8 }}>
              {search ? 'No matches found' : 'No build-on chains yet'}
            </div>
            {!search && <Link href="/projects/submit" style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 600 }}>Submit a Project →</Link>}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {filtered.map(root => (
              <div key={root.id} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 16, padding: '16px' }}>
                <div style={{ fontSize: 9, letterSpacing: '0.15em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 12, paddingBottom: 10, borderBottom: '1px solid var(--border-subtle)' }}>
                  Knowledge chain · {countChain(root)} project{countChain(root) !== 1 ? 's' : ''}
                </div>
                <TreeNode node={root} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
