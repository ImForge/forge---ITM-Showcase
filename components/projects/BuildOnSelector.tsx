'use client'
import { useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Project } from '@/lib/types/database'

type Props = {
  selectedIds: string[]
  onChange: (ids: string[]) => void
  excludeId?: string
}

export default function BuildOnSelector({ selectedIds, onChange, excludeId }: Props) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Project[]>([])
  const [loading, setLoading] = useState(false)

  const search = useCallback(async (q: string) => {
    if (!q.trim()) { setResults([]); return }
    setLoading(true)
    const supabase = createClient()
    // Always use FK hint to avoid Supabase ambiguous relationship error
    const { data } = await supabase
      .from('projects')
      .select('id, title, description, submitted_by, profiles!projects_submitted_by_fkey(username)')
      .eq('status', 'approved')
      .ilike('title', `%${q}%`)
      .neq('id', excludeId ?? '')
      .limit(8)
    setResults((data as unknown as Project[]) ?? [])
    setLoading(false)
  }, [excludeId])

  function toggle(id: string) {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter(x => x !== id))
    } else {
      onChange([...selectedIds, id])
    }
  }

  return (
    <div>
      <input
        value={query}
        onChange={e => { setQuery(e.target.value); search(e.target.value) }}
        placeholder="Search projects to build on..."
        style={{ width: '100%', padding: '10px 14px', borderRadius: 8, marginBottom: 10 }}
      />
      {loading && <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 8 }}>Searching…</p>}
      {results.map((p: any) => (
        <div key={p.id} onClick={() => toggle(p.id)} style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 12px', borderRadius: 8, cursor: 'pointer',
          background: selectedIds.includes(p.id) ? 'var(--accent-dim)' : 'transparent',
          border: `1px solid ${selectedIds.includes(p.id) ? 'var(--accent)' : 'var(--border-subtle)'}`,
          marginBottom: 6, transition: 'all 0.15s',
        }}>
          <div style={{
            width: 20, height: 20, borderRadius: 4, flexShrink: 0,
            background: selectedIds.includes(p.id) ? 'var(--accent)' : 'var(--bg-overlay)',
            border: `1px solid ${selectedIds.includes(p.id) ? 'var(--accent)' : 'var(--border)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontSize: 12,
          }}>
            {selectedIds.includes(p.id) ? '✓' : ''}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>{p.title}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>by @{(p as any).profiles?.username}</div>
          </div>
        </div>
      ))}
      {selectedIds.length > 0 && (
        <p style={{ fontSize: 12, color: 'var(--accent)', marginTop: 8 }}>
          {selectedIds.length} project{selectedIds.length > 1 ? 's' : ''} selected
        </p>
      )}
    </div>
  )
}
