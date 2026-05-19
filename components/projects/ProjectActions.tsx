'use client'
// ProjectActions — Star, Save, Report buttons
// These need client-side interactivity so 'use client' is required
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { showToast } from '@/components/ui/Toast'

type Props = {
  projectId: string
  initialStarred: boolean
  initialSaved: boolean
  starCount: number
  userId: string | null
}

export default function ProjectActions({
  projectId, initialStarred, initialSaved, starCount, userId
}: Props) {
  const [starred, setStarred] = useState(initialStarred)
  const [saved,   setSaved]   = useState(initialSaved)
  const [stars,   setStars]   = useState(starCount)
  const [loading, setLoading] = useState(false)
  const [reportOpen, setReportOpen] = useState(false)
  const [reportReason, setReportReason] = useState('')

  async function toggleStar() {
    if (!userId) { showToast('Sign in to star projects', 'error'); return }
    const supabase = createClient()
    setLoading(true)
    if (starred) {
      await supabase.from('stars').delete()
        .eq('user_id', userId).eq('project_id', projectId)
      setStars(s => s - 1)
      setStarred(false)
    } else {
      await supabase.from('stars').insert({ user_id: userId, project_id: projectId })
      setStars(s => s + 1)
      setStarred(true)
      showToast('Project starred!', 'success')
    }
    setLoading(false)
  }

  async function toggleSave() {
    if (!userId) { showToast('Sign in to save projects', 'error'); return }
    const supabase = createClient()
    if (saved) {
      await supabase.from('saves').delete()
        .eq('user_id', userId).eq('project_id', projectId)
      setSaved(false)
      showToast('Removed from saves')
    } else {
      await supabase.from('saves').insert({ user_id: userId, project_id: projectId })
      setSaved(true)
      showToast('Saved!', 'success')
    }
  }

  async function submitReport() {
    if (!userId) { showToast('Sign in to report', 'error'); return }
    if (!reportReason.trim()) { showToast('Please enter a reason', 'error'); return }
    const supabase = createClient()
    await supabase.from('reports').insert({
      reporter_id: userId,
      project_id: projectId,
      reason: reportReason.trim(),
    })
    showToast('Report submitted. Thank you.', 'success')
    setReportOpen(false)
    setReportReason('')
  }

  const btnStyle = (active: boolean, danger = false) => ({
    display: 'flex', alignItems: 'center', gap: 7,
    padding: '9px 18px', borderRadius: 99,
    border: `1px solid ${active ? (danger ? 'var(--danger)' : 'var(--accent)') : 'var(--border)'}`,
    background: active ? (danger ? 'rgba(185,64,64,0.08)' : 'var(--accent-dim)') : 'var(--bg-surface)',
    color: active ? (danger ? 'var(--danger)' : 'var(--accent)') : 'var(--text-secondary)',
    fontSize: 13, fontWeight: 500, cursor: 'pointer',
    transition: 'all 0.2s', fontFamily: 'inherit',
  })

  return (
    <div>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <button onClick={toggleStar} disabled={loading} style={btnStyle(starred)}>
          {starred ? '★' : '☆'} {stars > 0 ? stars : ''} {starred ? 'Starred' : 'Star'}
        </button>
        <button onClick={toggleSave} style={btnStyle(saved)}>
          {saved ? '♥' : '♡'} {saved ? 'Saved' : 'Save'}
        </button>
        <button onClick={() => setReportOpen(o => !o)} style={btnStyle(reportOpen, true)}>
          ⚑ Report
        </button>
      </div>

      {/* Report modal */}
      {reportOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 500,
          background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 24,
        }} onClick={() => setReportOpen(false)}>
          <div onClick={e => e.stopPropagation()} style={{
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border)',
            borderRadius: 16, padding: 32, width: '100%', maxWidth: 480,
          }}>
            <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 24, marginBottom: 8 }}>
              Report Project
            </h3>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20 }}>
              Tell us what&apos;s wrong with this project.
            </p>
            <textarea
              value={reportReason}
              onChange={e => setReportReason(e.target.value)}
              placeholder="Describe the issue..."
              rows={4}
              style={{ width: '100%', padding: '12px', borderRadius: 8, marginBottom: 16, resize: 'vertical' }}
            />
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button onClick={() => setReportOpen(false)} style={{
                padding: '9px 20px', borderRadius: 8, border: '1px solid var(--border)',
                background: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13,
                color: 'var(--text-secondary)',
              }}>
                Cancel
              </button>
              <button onClick={submitReport} style={{
                padding: '9px 20px', borderRadius: 8, border: 'none',
                background: 'var(--danger)', color: 'white',
                cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 500,
              }}>
                Submit Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
