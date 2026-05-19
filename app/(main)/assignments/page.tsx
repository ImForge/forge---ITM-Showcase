'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { showToast } from '@/components/ui/Toast'
import Link from 'next/link'
import type { AssignmentWithProfile } from '@/lib/types/database'

const SEMESTERS = ['1st Sem','2nd Sem','3rd Sem','4th Sem','5th Sem','6th Sem','7th Sem','8th Sem']
const YEARS = ['2023-24','2024-25','2025-26']

export default function AssignmentsPage() {
  const [tab, setTab]           = useState<'mine' | 'public'>('public')
  const [mine, setMine]         = useState<AssignmentWithProfile[]>([])
  const [publicList, setPublic] = useState<AssignmentWithProfile[]>([])
  const [userId, setUserId]     = useState<string | null>(null)
  const [loading, setLoading]   = useState(true)
  const [uploading, setUploading] = useState(false)
  const [showModal, setModal]   = useState(false)

  const [title, setTitle]       = useState('')
  const [subject, setSubject]   = useState('')
  const [semester, setSemester] = useState('')
  const [year, setYear]         = useState('')
  const [desc, setDesc]         = useState('')
  const [isPublic, setIsPublic] = useState(true)
  const [file, setFile]         = useState<File | null>(null)

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
    const [{ data: mineData }, { data: pubData }] = await Promise.all([
      supabase.from('assignments').select('*, profiles(id,username,avatar_url,full_name)').eq('submitted_by', uid).order('created_at', { ascending: false }),
      supabase.from('assignments').select('*, profiles(id,username,avatar_url,full_name)').eq('is_public', true).order('created_at', { ascending: false }).limit(50),
    ])
    setMine((mineData as unknown as AssignmentWithProfile[]) ?? [])
    setPublic((pubData as unknown as AssignmentWithProfile[]) ?? [])
    setLoading(false)
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault()
    if (!title || !subject || !semester || !year) { showToast('Fill in all required fields', 'error'); return }
    if (!userId) return
    setUploading(true)
    const supabase = createClient()
    let fileUrl: string | null = null
    if (file) {
      const ext  = file.name.split('.').pop()
      const path = `${userId}/${Date.now()}.${ext}`
      const { error } = await supabase.storage.from('assignments').upload(path, file)
      if (!error) {
        const { data } = supabase.storage.from('assignments').getPublicUrl(path)
        fileUrl = data.publicUrl
      }
    }
    const { error } = await supabase.from('assignments').insert({ title, subject, semester, academic_year: year, description: desc || null, file_url: fileUrl, submitted_by: userId, is_public: isPublic })
    if (error) showToast('Upload failed', 'error')
    else {
      showToast('Assignment uploaded!', 'success')
      setModal(false)
      setTitle(''); setSubject(''); setSemester(''); setYear(''); setDesc(''); setFile(null); setIsPublic(true)
      await loadAll(userId)
    }
    setUploading(false)
  }

  async function togglePublic(a: AssignmentWithProfile) {
    const supabase = createClient()
    await supabase.from('assignments').update({ is_public: !a.is_public }).eq('id', a.id)
    setMine(prev => prev.map(x => x.id === a.id ? { ...x, is_public: !a.is_public } : x))
    showToast(a.is_public ? 'Set to private' : 'Now public', 'success')
  }

  async function deleteAssignment(id: string) {
    if (!confirm('Delete this assignment?')) return
    const supabase = createClient()
    await supabase.from('assignments').delete().eq('id', id)
    setMine(prev => prev.filter(x => x.id !== id))
    showToast('Deleted')
  }

  const list = tab === 'mine' ? mine : publicList

  const fileIcon = (url: string | null) => {
    if (!url) return '📎'
    if (url.endsWith('.pdf')) return '📄'
    if (url.match(/\.(jpg|png|jpeg)/i)) return '🖼'
    if (url.endsWith('.docx')) return '📝'
    if (url.endsWith('.pptx')) return '📊'
    return '📎'
  }

  return (
    <div style={{ width: '100%', padding: 'clamp(20px,4vw,48px) clamp(16px,4vw,40px) 80px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 32, flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(40px, 7vw, 64px)', fontWeight: 400, lineHeight: 1 }}>Assignments</h1>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 6 }}>Share academic work — notes, PDFs, docs</p>
          </div>
          <button onClick={() => setModal(true)} style={{ padding: '11px 22px', borderRadius: 10, background: 'var(--accent)', color: '#1c1917', border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }}>
            + Upload
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: 4, marginBottom: 28, width: 'fit-content' }}>
          {(['public', 'mine'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ padding: '9px 16px', border: 'none', borderRadius: 8, background: tab === t ? 'var(--accent-dim)' : 'transparent', color: tab === t ? 'var(--accent)' : 'var(--text-secondary)', fontFamily: 'inherit', fontSize: 12, fontWeight: tab === t ? 500 : 400, cursor: 'pointer', whiteSpace: 'nowrap' }}>
              {t === 'public' ? 'Public Library' : `Mine (${mine.length})`}
            </button>
          ))}
        </div>

        {/* List */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>Loading…</div>
        ) : list.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: 32, opacity: 0.3, marginBottom: 12 }}>📄</div>
            <div style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 20 }}>
              {tab === 'mine' ? 'No assignments uploaded yet' : 'No public assignments yet'}
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {list.map(a => (
              <div key={a.id} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 14, padding: '16px', display: 'flex', alignItems: 'center', gap: 14 }}>
                {/* Icon */}
                <div style={{ fontSize: 24, flexShrink: 0 }}>{fileIcon(a.file_url ?? null)}</div>
                {/* Info */}
                <Link href={`/assignments/${a.id}`} style={{ flex: 1, minWidth: 0, textDecoration: 'none' }}>
                  <div style={{ fontSize: 9, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 3 }}>{a.subject} · {a.semester}</div>
                  <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>@{a.profiles?.username}</div>
                </Link>
                {/* Badges + controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                  <span style={{ fontSize: 9, padding: '2px 7px', borderRadius: 99, background: a.is_public ? 'rgba(74,124,89,0.1)' : 'var(--bg-overlay)', color: a.is_public ? 'var(--success)' : 'var(--text-muted)' }}>
                    {a.is_public ? 'Public' : 'Private'}
                  </span>
                  {a.submitted_by === userId && (
                    <>
                      <button onClick={() => togglePublic(a)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: 'var(--text-muted)', padding: 4 }}>⇄</button>
                      <button onClick={() => deleteAssignment(a.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: 'var(--danger)', padding: 4 }}>✕</button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Upload Modal */}
        {showModal && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 500, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: 0 }}
            onClick={() => setModal(false)}>
            <div onClick={e => e.stopPropagation()} style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '20px 20px 0 0', padding: '28px 24px 40px', width: '100%', maxWidth: 560, maxHeight: '90vh', overflowY: 'auto' }}>
              <div style={{ width: 36, height: 4, borderRadius: 99, background: 'var(--border)', margin: '0 auto 24px' }} />
              <h2 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 26, marginBottom: 20 }}>Upload Assignment</h2>
              <form onSubmit={handleUpload}>
                <div style={{ display: 'grid', gap: 12 }}>
                  <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Assignment title *" style={{ padding: '11px 14px', borderRadius: 10, width: '100%' }} />
                  <input value={subject} onChange={e => setSubject(e.target.value)} placeholder="Subject *" style={{ padding: '11px 14px', borderRadius: 10, width: '100%' }} />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    <select value={semester} onChange={e => setSemester(e.target.value)} style={{ padding: '11px 12px', borderRadius: 10 }}>
                      <option value="">Semester *</option>
                      {SEMESTERS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <select value={year} onChange={e => setYear(e.target.value)} style={{ padding: '11px 12px', borderRadius: 10 }}>
                      <option value="">Year *</option>
                      {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                  <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Optional description" rows={2} style={{ padding: '11px 14px', borderRadius: 10, resize: 'vertical', width: '100%' }} />
                  <label style={{ padding: '20px', border: '2px dashed var(--border)', borderRadius: 12, textAlign: 'center', cursor: 'pointer', background: file ? 'var(--accent-light)' : 'transparent' }}>
                    <input type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.ppt,.pptx,.xlsx" onChange={e => setFile(e.target.files?.[0] ?? null)} style={{ display: 'none' }} />
                    <div style={{ fontSize: 20, marginBottom: 6 }}>📎</div>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{file ? file.name : 'Tap to attach file'}</div>
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <button type="button" onClick={() => setIsPublic(o => !o)} style={{ width: 40, height: 22, borderRadius: 99, border: 'none', background: isPublic ? 'var(--accent)' : 'var(--border)', cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}>
                      <div style={{ position: 'absolute', top: 3, left: isPublic ? 20 : 3, width: 16, height: 16, borderRadius: '50%', background: 'white', transition: 'left 0.2s' }} />
                    </button>
                    <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{isPublic ? 'Visible to all students' : 'Private — only you'}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button type="submit" disabled={uploading} style={{ flex: 1, padding: '13px', background: 'var(--accent)', color: '#1c1917', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                      {uploading ? 'Uploading…' : 'Upload →'}
                    </button>
                    <button type="button" onClick={() => setModal(false)} style={{ padding: '13px 18px', background: 'none', border: '1px solid var(--border)', borderRadius: 10, cursor: 'pointer', fontFamily: 'inherit', color: 'var(--text-secondary)' }}>
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
