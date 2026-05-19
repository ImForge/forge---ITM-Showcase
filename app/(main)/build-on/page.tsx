'use client'
// Build-on Explorer — shows the full knowledge lineage tree
// Every project that was built on top of another, chained together
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

type ProjectNode = {
  id: string
  title: string
  description: string | null
  thumbnail_url: string | null
  star_count: number
  semester: string | null
  submitted_by: string
  profiles: { username: string; avatar_url: string | null; full_name: string | null } | null
  project_tags: Array<{ tags: { id: string; name: string } | null }>
  // children built on top of this
  children: ProjectNode[]
  // depth in tree
  depth: number
}

type BuildOnRow = {
  parent_project_id: string
  child_project_id: string
}

export default function BuildOnPage() {
  const [roots, setRoots] = useState<ProjectNode[]>([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState<Set<string>>(new Set())
  const [search, setSearch] = useState('')
  const [totalChains, setTotalChains] = useState(0)

  useEffect(() => {
    async function load() {
      const supabase = createClient()

      // Fetch all build_on relationships
      const { data: buildOns } = await supabase
        .from('build_ons')
        .select('parent_project_id, child_project_id')
      const relations = (buildOns as BuildOnRow[]) ?? []

      // Fetch all projects involved in build-ons (parents + children)
      const allIds = new Set<string>()
      relations.forEach(r => { allIds.add(r.parent_project_id); allIds.add(r.child_project_id) })

      // Also fetch ALL approved projects so we can show standalone ones
      const { data: allProjectsRaw } = await supabase
        .from('projects')
        .select(`
          id, title, description, thumbnail_url, star_count, semester, submitted_by,
          profiles!projects_submitted_by_fkey(username, avatar_url, full_name),
          project_tags(tags(id, name))
        `)
        .eq('status', 'approved')
        .order('star_count', { ascending: false })

      const projectMap = new Map<string, ProjectNode>()
      for (const p of (allProjectsRaw as any[]) ?? []) {
        projectMap.set(p.id, { ...p, children: [], depth: 0 })
      }

      // Build the tree
      const childIds = new Set(relations.map(r => r.child_project_id))

      // Attach children to parents
      for (const { parent_project_id, child_project_id } of relations) {
        const parent = projectMap.get(parent_project_id)
        const child  = projectMap.get(child_project_id)
        if (parent && child) {
          parent.children.push(child)
        }
      }

      // Root nodes = projects that are parents but not children of anyone
      // OR projects that are children but whose parent isn't in our map
      const rootNodes: ProjectNode[] = []
      for (const [id, node] of projectMap.entries()) {
        // Is a parent in some chain
        const isParent = relations.some(r => r.parent_project_id === id)
        // Is not a child of anyone
        const isChild = childIds.has(id)
        if (isParent && !isChild) {
          rootNodes.push(node)
        }
      }

      // Set depth recursively
      function setDepth(node: ProjectNode, depth: number) {
        node.depth = depth
        node.children.forEach(c => setDepth(c, depth + 1))
      }
      rootNodes.forEach(r => setDepth(r, 0))

      setRoots(rootNodes)
      setTotalChains(relations.length)
      // Auto-expand roots
      setExpanded(new Set(rootNodes.map(r => r.id)))
      setLoading(false)
    }
    load()
  }, [])

  function toggleExpand(id: string) {
    setExpanded(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  // Filter roots by search
  function matchesSearch(node: ProjectNode): boolean {
    if (!search) return true
    const q = search.toLowerCase()
    if (node.title.toLowerCase().includes(q)) return true
    if (node.children.some(c => matchesSearch(c))) return true
    return false
  }

  const filtered = roots.filter(matchesSearch)

  // Recursive tree node component
  function TreeNode({ node, isLast }: { node: ProjectNode; isLast: boolean }) {
    const hasChildren = node.children.length > 0
    const isOpen = expanded.has(node.id)
    const tags = node.project_tags?.map(pt => pt.tags).filter(Boolean) ?? []

    return (
      <div>
        {/* Node card */}
        <div style={{
          display: 'flex', alignItems: 'flex-start', gap: 0,
          position: 'relative',
        }}>
          {/* Tree line + connector */}
          {node.depth > 0 && (
            <div style={{
              width: 32, flexShrink: 0,
              display: 'flex', alignItems: 'center',
              paddingTop: 20,
            }}>
              <div style={{
                width: '100%', height: 1,
                background: 'var(--border)',
              }} />
            </div>
          )}

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              background: 'var(--bg-surface)',
              border: `1px solid ${node.depth === 0 ? 'var(--accent)' : 'var(--border-subtle)'}`,
              borderRadius: 12,
              padding: '14px 16px',
              marginBottom: 8,
              transition: 'all 0.2s',
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                {/* Thumbnail */}
                <div style={{
                  width: 48, height: 48, borderRadius: 8, flexShrink: 0,
                  background: 'var(--bg-overlay)', overflow: 'hidden',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18, color: 'var(--text-muted)',
                }}>
                  {node.thumbnail_url
                    ? <img src={node.thumbnail_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                    : '◫'}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                    <Link href={`/projects/${node.id}`} style={{
                      fontFamily: 'var(--font-cormorant), Georgia, serif',
                      fontSize: 18, fontWeight: 400,
                      color: 'var(--text-primary)',
                      lineHeight: 1.2,
                    }}>
                      {node.title}
                    </Link>
                    {node.depth === 0 && (
                      <span style={{
                        fontSize: 9, padding: '2px 8px', borderRadius: 99,
                        background: 'var(--accent-dim)', color: 'var(--accent)',
                        fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
                        flexShrink: 0,
                      }}>
                        Origin
                      </span>
                    )}
                    {hasChildren && (
                      <span style={{
                        fontSize: 9, padding: '2px 8px', borderRadius: 99,
                        background: 'rgba(74,124,89,0.1)', color: 'var(--success)',
                        fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
                        flexShrink: 0,
                      }}>
                        {node.children.length} built on this
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                    {tags.slice(0, 2).map(t => (
                      <span key={t!.id} className="tag-pill" style={{ fontSize: 10 }}>{t!.name}</span>
                    ))}
                    <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                      by @{node.profiles?.username}
                    </span>
                    {node.semester && (
                      <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{node.semester}</span>
                    )}
                    <span style={{ fontSize: 11, color: 'var(--accent)' }}>★ {node.star_count}</span>
                  </div>
                </div>

                {/* Expand button */}
                {hasChildren && (
                  <button
                    onClick={() => toggleExpand(node.id)}
                    style={{
                      width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                      background: isOpen ? 'var(--accent-dim)' : 'var(--bg-overlay)',
                      border: `1px solid ${isOpen ? 'var(--accent)' : 'var(--border-subtle)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 12, color: isOpen ? 'var(--accent)' : 'var(--text-muted)',
                      cursor: 'pointer', transition: 'all 0.15s',
                    }}
                  >
                    {isOpen ? '▾' : '▸'}
                  </button>
                )}
              </div>
            </div>

            {/* Children */}
            {hasChildren && isOpen && (
              <div style={{ paddingLeft: 24, borderLeft: '1px solid var(--border-subtle)', marginLeft: 24, marginBottom: 8 }}>
                {node.children.map((child, i) => (
                  <TreeNode key={child.id} node={child} isLast={i === node.children.length - 1} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: '48px 48px 80px', width: '100%' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>

        {/* Header */}
        <div className="animate-fade-up" style={{ marginBottom: 48 }}>
          <p style={{ fontSize: 11, letterSpacing: '0.15em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 12 }}>
            Knowledge Lineage
          </p>
          <h1 style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: 'clamp(48px, 6vw, 72px)',
            fontWeight: 400, lineHeight: 1, marginBottom: 12,
          }}>
            Build-on Tree
          </h1>
          <p style={{ fontSize: 15, color: 'var(--text-secondary)', maxWidth: 520, lineHeight: 1.7 }}>
            See how knowledge compounds at ITM University. Every project that built on top of another,
            chained together into a living lineage tree.
          </p>
        </div>

        {/* Stats bar */}
        <div className="animate-fade-up delay-1" style={{
          display: 'flex', gap: 1,
          background: 'var(--border)', borderRadius: 12, overflow: 'hidden',
          marginBottom: 36,
        }}>
          {[
            { label: 'Chains', value: totalChains },
            { label: 'Origin Projects', value: roots.length },
            { label: 'Depth Levels', value: roots.length > 0 ? Math.max(...roots.map(r => {
              function maxDepth(n: ProjectNode): number {
                if (n.children.length === 0) return n.depth
                return Math.max(...n.children.map(maxDepth))
              }
              return maxDepth(r)
            })) + 1 : 0 },
          ].map(({ label, value }) => (
            <div key={label} style={{ flex: 1, background: 'var(--bg-surface)', padding: '20px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 36, fontWeight: 300 }}>
                {value}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="animate-fade-up delay-1" style={{ marginBottom: 32 }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search projects in the tree…"
            style={{ width: '100%', padding: '11px 14px', borderRadius: 10 }}
          />
        </div>

        {/* Tree */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: 32, opacity: 0.3, marginBottom: 12 }}>◫</div>
            Building the tree…
          </div>
        ) : filtered.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '60px',
            background: 'var(--bg-surface)',
            border: '2px dashed var(--border)',
            borderRadius: 20,
          }}>
            <div style={{ fontSize: 40, opacity: 0.3, marginBottom: 16 }}>◫</div>
            <div style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 24, marginBottom: 8 }}>
              {search ? 'No matches found' : 'No build-on chains yet'}
            </div>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 24, maxWidth: 380, margin: '0 auto 24px' }}>
              {search
                ? 'Try a different search term.'
                : 'When students submit projects that build on previous work, the lineage tree appears here.'}
            </p>
            {!search && (
              <Link href="/projects/submit" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '11px 24px', borderRadius: 10,
                background: 'var(--accent)', color: '#1c1917',
                fontSize: 13, fontWeight: 600,
              }}>
                Submit a Project →
              </Link>
            )}
          </div>
        ) : (
          <div className="animate-fade-up delay-2" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {filtered.map(root => (
              <div key={root.id} style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 16, padding: '20px',
              }}>
                {/* Chain label */}
                <div style={{
                  fontSize: 10, letterSpacing: '0.15em', color: 'var(--text-muted)',
                  textTransform: 'uppercase', marginBottom: 14, paddingBottom: 12,
                  borderBottom: '1px solid var(--border-subtle)',
                }}>
                  Knowledge chain · {countChain(root)} project{countChain(root) !== 1 ? 's' : ''}
                </div>
                <TreeNode node={root} isLast={true} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Count total nodes in a chain
function countChain(node: ProjectNode): number {
  return 1 + node.children.reduce((acc, c) => acc + countChain(c), 0)
}
