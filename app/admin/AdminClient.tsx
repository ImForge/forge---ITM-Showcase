'use client'
// Admin dashboard — approve/reject projects, manage users, view reports, manage tags
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { showToast } from '@/components/ui/Toast'
import Link from 'next/link'
import type { ProjectWithRelations, Profile, Report } from '@/lib/types/database'

type Tab = 'pending' | 'projects' | 'users' | 'reports' | 'tags'

type Props = {
  pendingProjects: ProjectWithRelations[]
  allProjects: ProjectWithRelations[]
  reports: Report[]
  users: Profile[]
  tags: Array<{ id: string; name: string; color: string | null }>
  stats: { totalProjects: number; totalUsers: number; totalAssignments: number; totalTeams: number }
}

export default function AdminClient({
  pendingProjects: initPending,
  allProjects: initAll,
  reports,
  users: initUsers,
  tags: initTags,
  stats,
}: Props) {
  const [tab, setTab]               = useState<Tab>('pending')
  const [pending, setPending]       = useState(initPending)
  const [allProjects, setAll]       = useState(initAll)
  const [users, setUsers]           = useState(initUsers)
  const [tags, setTags]             = useState(initTags)
  const [newTagName, setNewTagName] = useState('')
  const [processing, setProcessing] = useState<string | null>(null)

  // ─── APPROVE/REJECT PROJECT ───
  async function moderateProject(projectId: string, status: 'approved' | 'rejected') {
    setProcessing(projectId)
    const supabase = createClient()
    await supabase.from('projects').update({ status }).eq('id', projectId)
    setPending(prev => prev.filter(p => p.id !== projectId))
    setAll(prev => prev.map(p => p.id === projectId ? { ...p, status } : p))
    showToast(status === 'approved' ? 'Project approved!' : 'Project rejected', status === 'approved' ? 'success' : 'info')
    setProcessing(null)
  }

  // ─── DELETE PROJECT ───
  async function deleteProject(projectId: string) {
    if (!confirm('Permanently delete this project?')) return
    const supabase = createClient()
    await supabase.from('projects').delete().eq('id', projectId)
    setAll(prev => prev.filter(p => p.id !== projectId))
    setPending(prev => prev.filter(p => p.id !== projectId))
    showToast('Project deleted')
  }

  // ─── CHANGE USER ROLE ───
  async function changeRole(userId: string, role: 'admin' | 'student') {
    const supabase = createClient()
    await supabase.from('profiles').update({ role }).eq('id', userId)
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role } : u))
    showToast(`Role changed to ${role}`, 'success')
  }

  // ─── ADD TAG ───
  async function addTag() {
    if (!newTagName.trim()) return
    const supabase = createClient()
    const { data } = await supabase.from('tags').insert({ name: newTagName.trim() }).select().single()
    if (data) { setTags(prev => [...prev, data as any]); setNewTagName('') }
    showToast('Tag created', 'success')
  }

  // ─── DELETE TAG ───
  async function deleteTag(id: string) {
    if (!confirm('Delete this tag? It will be removed from all projects.')) return
    const supabase = createClient()
    await supabase.from('tags').delete().eq('id', id)
    setTags(prev => prev.filter(t => t.id !== id))
    showToast('Tag deleted')
  }

  const tabStyle = (t: Tab) => ({
    padding: '9px 18px', border: 'none', borderRadius: 8, cursor: 'pointer',
    background: tab === t ? 'var(--accent-dim)' : 'transparent',
    color: tab === t ? 'var(--accent)' : 'var(--text-secondary)',
    fontFamily: 'inherit', fontSize: 13, fontWeight: tab === t ? 500 : 400,
    transition: 'all 0.15s', position: 'relative' as const,
  })

  // Mini project row component
  function ProjectRow({ project, showModerate = false }: { project: ProjectWithRelations; showModerate?: boolean }) {
    const isProcessing = processing === project.id
    return (
      <div style={{
        display: 'flex', alignItems: 'center', gap: 16,
        padding: '16px 20px',
        borderBottom: '1px solid var(--border-subtle)',
      }}>
        {/* Thumbnail */}
        <div style={{
          width: 48, height: 48, borderRadius: 8, flexShrink: 0,
          background: 'var(--bg-overlay)', overflow: 'hidden',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20, color: 'var(--text-muted)',
        }}>
          {project.thumbnail_url
            ? <img src={project.thumbnail_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
            : '◫'}
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <Link href={`/projects/${project.id}`} style={{
            fontSize: 14, fontWeight: 500, color: 'var(--text-primary)',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            display: 'block',
          }}>
            {project.title}
          </Link>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
            by @{project.profiles?.username} · {new Date(project.created_at).toLocaleDateString()}
          </div>
        </div>

        {/* Status badge */}
        <span style={{
          fontSize: 10, padding: '3px 10px', borderRadius: 99,
          background: project.status === 'approved' ? 'rgba(74,124,89,0.1)'
            : project.status === 'pending' ? 'rgba(201,151,58,0.12)'
            : 'rgba(185,64,64,0.1)',
          color: project.status === 'approved' ? 'var(--success)'
            : project.status === 'pending' ? 'var(--warning)'
            : 'var(--danger)',
        }}>
          {project.status}
        </span>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 6 }}>
          {showModerate && project.status === 'pending' && (
            <>
              <button onClick={() => moderateProject(project.id, 'approved')} disabled={!!isProcessing} style={{
                padding: '6px 14px', borderRadius: 6, border: 'none',
                background: 'var(--success)', color: 'white',
                fontSize: 12, cursor: 'pointer', fontFamily: 'inherit',
              }}>
                {isProcessing ? '…' : '✓ Approve'}
              </button>
              <button onClick={() => moderateProject(project.id, 'rejected')} disabled={!!isProcessing} style={{
                padding: '6px 14px', borderRadius: 6, border: '1px solid var(--danger)',
                background: 'none', color: 'var(--danger)',
                fontSize: 12, cursor: 'pointer', fontFamily: 'inherit',
              }}>
                ✕ Reject
              </button>
            </>
          )}
          <button onClick={() => deleteProject(project.id)} style={{
            padding: '6px 10px', borderRadius: 6,
            background: 'none', border: '1px solid var(--border)',
            color: 'var(--danger)', fontSize: 12, cursor: 'pointer',
          }}>
            🗑
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 56px 80px' }}>

      {/* Header */}
      <div className="animate-fade-up" style={{ marginBottom: 40 }}>
        <h1 style={{
          fontFamily: 'var(--font-cormorant), Georgia, serif',
          fontSize: 56, fontWeight: 400, lineHeight: 1, marginBottom: 8,
        }}>
          Admin Dashboard
        </h1>
        <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
          Forge moderation panel
        </p>
      </div>

      {/* Stats row */}
      <div className="animate-fade-up delay-1" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: 12, marginBottom: 36,
      }}>
        {[
          { label: 'Approved Projects', value: stats.totalProjects, warning: false },
          { label: 'Pending Review',    value: pending.length, warning: pending.length > 0 },
          { label: 'Users',             value: stats.totalUsers, warning: false },
          { label: 'Teams',             value: stats.totalTeams, warning: false },
          { label: 'Assignments',       value: stats.totalAssignments, warning: false },
          { label: 'Open Reports',      value: reports.length, warning: reports.length > 0 },
        ].map(({ label, value, warning }) => (
          <div key={label} style={{
            background: warning && value > 0 ? 'var(--accent-light)' : 'var(--bg-surface)',
            border: `1px solid ${warning && value > 0 ? 'rgba(201,151,58,0.4)' : 'var(--border-subtle)'}`,
            borderRadius: 12, padding: '20px 16px', textAlign: 'center',
          } as React.CSSProperties}>
            <div style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 36,
              fontWeight: 300, color: warning && value > 0 ? 'var(--accent)' : 'var(--text-primary)',
            }}>
              {value}
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="animate-fade-up delay-2" style={{
        display: 'flex', gap: 4, background: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)', borderRadius: 12,
        padding: 4, marginBottom: 28, width: 'fit-content', flexWrap: 'wrap',
      }}>
        {([
          { t: 'pending',  label: `Pending (${pending.length})` },
          { t: 'projects', label: 'All Projects' },
          { t: 'users',    label: `Users (${users.length})` },
          { t: 'reports',  label: `Reports (${reports.length})` },
          { t: 'tags',     label: 'Tags' },
        ] as Array<{ t: Tab; label: string }>).map(({ t, label }) => (
          <button key={t} style={tabStyle(t)} onClick={() => setTab(t)}>{label}</button>
        ))}
      </div>

      {/* ─── PENDING TAB ─── */}
      {tab === 'pending' && (
        <div style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 16, overflow: 'hidden',
        }}>
          {pending.length === 0 ? (
            <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: 32, opacity: 0.3, marginBottom: 12 }}>✓</div>
              All projects reviewed — inbox zero!
            </div>
          ) : (
            pending.map(p => <ProjectRow key={p.id} project={p} showModerate={true} />)
          )}
        </div>
      )}

      {/* ─── ALL PROJECTS TAB ─── */}
      {tab === 'projects' && (
        <div style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 16, overflow: 'hidden',
        }}>
          {allProjects.map(p => <ProjectRow key={p.id} project={p} />)}
        </div>
      )}

      {/* ─── USERS TAB ─── */}
      {tab === 'users' && (
        <div style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 16, overflow: 'hidden',
        }}>
          {users.map((u, i) => (
            <div key={u.id} style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '14px 20px',
              borderBottom: i < users.length - 1 ? '1px solid var(--border-subtle)' : 'none',
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                background: 'var(--bg-overlay)', overflow: 'hidden',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, color: 'var(--accent)',
              }}>
                {u.avatar_url
                  ? <img src={u.avatar_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                  : u.username[0]?.toUpperCase()}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{u.full_name || u.username}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>@{u.username}</div>
              </div>
              <span style={{
                fontSize: 10, padding: '3px 10px', borderRadius: 99,
                background: u.role === 'admin' ? 'rgba(185,64,64,0.1)' : 'var(--bg-overlay)',
                color: u.role === 'admin' ? 'var(--danger)' : 'var(--text-muted)',
              }}>
                {u.role}
              </span>
              <button onClick={() => changeRole(u.id, u.role === 'admin' ? 'student' : 'admin')} style={{
                padding: '6px 12px', borderRadius: 6, border: '1px solid var(--border)',
                background: 'none', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit',
                color: 'var(--text-secondary)',
              }}>
                {u.role === 'admin' ? 'Make Student' : 'Make Admin'}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ─── REPORTS TAB ─── */}
      {tab === 'reports' && (
        <div style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 16, overflow: 'hidden',
        }}>
          {reports.length === 0 ? (
            <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>
              No reports — all clear.
            </div>
          ) : reports.map((r: any, i) => (
            <div key={r.id} style={{
              padding: '16px 20px',
              borderBottom: i < reports.length - 1 ? '1px solid var(--border-subtle)' : 'none',
            }}>
              <div style={{ display: 'flex', gap: 10, marginBottom: 6 }}>
                {r.project_id && (
                  <Link href={`/projects/${r.project_id}`} style={{
                    fontSize: 12, color: 'var(--accent)', fontWeight: 500,
                  }}>
                    View Project →
                  </Link>
                )}
                <span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 'auto' }}>
                  {new Date(r.created_at).toLocaleDateString()}
                </span>
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {r.reason}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* ─── TAGS TAB ─── */}
      {tab === 'tags' && (
        <div>
          {/* Add tag */}
          <div style={{
            background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)',
            borderRadius: 14, padding: '20px', marginBottom: 20,
            display: 'flex', gap: 10,
          }}>
            <input
              value={newTagName}
              onChange={e => setNewTagName(e.target.value)}
              placeholder="New tag name (e.g. React, Machine Learning)"
              style={{ flex: 1, padding: '10px 14px', borderRadius: 8 }}
              onKeyDown={e => e.key === 'Enter' && addTag()}
            />
            <button onClick={addTag} style={{
              padding: '10px 20px', background: 'var(--accent)', color: '#1c1917',
              border: 'none', borderRadius: 8, cursor: 'pointer',
              fontFamily: 'inherit', fontSize: 13, fontWeight: 600,
            }}>
              Add Tag
            </button>
          </div>

          {/* Tag list */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {tags.map(tag => (
              <div key={tag.id} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '6px 12px 6px 14px', borderRadius: 99,
                background: 'var(--bg-surface)', border: '1px solid var(--border)',
              }}>
                <span style={{ fontSize: 13, color: 'var(--text-primary)' }}>{tag.name}</span>
                <button onClick={() => deleteTag(tag.id)} style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: 13, color: 'var(--text-muted)', padding: 0, lineHeight: 1,
                }}>
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
