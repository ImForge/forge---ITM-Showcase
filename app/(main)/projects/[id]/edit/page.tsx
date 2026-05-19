'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { showToast } from '@/components/ui/Toast'
import BuildOnSelector from '@/components/projects/BuildOnSelector'
import type { Tag } from '@/lib/types/database'
import { use } from 'react'

const SEMESTERS = ['1st Sem','2nd Sem','3rd Sem','4th Sem','5th Sem','6th Sem','7th Sem','8th Sem']
const YEARS = ['2020-21','2021-22','2022-23','2023-24','2024-25','2025-26']

export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [tags, setTags]           = useState<Tag[]>([])
  const [loading, setLoading]     = useState(true)
  const [saving, setSaving]       = useState(false)
  const [userId, setUserId]       = useState<string | null>(null)

  const [title, setTitle]         = useState('')
  const [description, setDesc]    = useState('')
  const [longDesc, setLongDesc]   = useState('')
  const [repoUrl, setRepoUrl]     = useState('')
  const [liveUrl, setLiveUrl]     = useState('')
  const [demoUrl, setDemoUrl]     = useState('')
  const [semester, setSemester]   = useState('')
  const [year, setYear]           = useState('')
  const [selTags, setSelTags]     = useState<string[]>([])
  const [buildOns, setBuildOns]   = useState<string[]>([])
  const [thumbnail, setThumbnail] = useState<File | null>(null)
  const [thumbPreview, setThumb]  = useState<string | null>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) { window.location.href = '/login'; return }
      setUserId(user.id)

      // Load project
      const { data: project } = await supabase
        .from('projects')
        .select(`*, project_tags(tag_id), project_members(profile_id,role), build_ons!build_ons_child_project_id_fkey(parent_project_id)`)
        .eq('id', id)
        .single()

      if (!project) { showToast('Project not found', 'error'); return }

      // Permission check: submitted_by OR project owner role
      const isOwner = project.submitted_by === user.id ||
        (project.project_members as any[])?.some((m: any) => m.profile_id === user.id && m.role === 'owner')

      if (!isOwner) { window.location.href = `/projects/${id}`; return }

      setTitle(project.title ?? '')
      setDesc(project.description ?? '')
      setLongDesc(project.long_description ?? '')
      setRepoUrl(project.repo_url ?? '')
      setLiveUrl(project.live_url ?? '')
      setDemoUrl(project.demo_url ?? '')
      setSemester(project.semester ?? '')
      setYear(project.academic_year ?? '')
      setThumb(project.thumbnail_url ?? null)
      setSelTags((project.project_tags as any[])?.map((t: any) => t.tag_id) ?? [])
      setBuildOns((project.build_ons as any[])?.map((b: any) => b.parent_project_id) ?? [])

      const { data: tagsData } = await supabase.from('tags').select('*').order('name')
      setTags((tagsData as Tag[]) ?? [])
      setLoading(false)
    })
  }, [id])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) { showToast('Title is required', 'error'); return }
    setSaving(true)
    const supabase = createClient()

    // Upload new thumbnail if changed
    let thumbnailUrl = thumbPreview
    if (thumbnail) {
      const ext  = thumbnail.name.split('.').pop()
      const path = `thumbnails/${userId}-${Date.now()}.${ext}`
      const { error: upErr } = await supabase.storage
        .from('project-thumbnails').upload(path, thumbnail, { upsert: true })
      if (!upErr) {
        const { data: urlData } = supabase.storage.from('project-thumbnails').getPublicUrl(path)
        thumbnailUrl = urlData.publicUrl
      }
    }

    // Update project
    await supabase.from('projects').update({
      title: title.trim(),
      description: description.trim(),
      long_description: longDesc.trim() || null,
      thumbnail_url: thumbnailUrl,
      repo_url: repoUrl.trim() || null,
      live_url: liveUrl.trim() || null,
      demo_url: demoUrl.trim() || null,
      semester: semester || null,
      academic_year: year || null,
      updated_at: new Date().toISOString(),
    }).eq('id', id)

    // Replace tags: delete all then re-insert
    await supabase.from('project_tags').delete().eq('project_id', id)
    if (selTags.length > 0) {
      await supabase.from('project_tags').insert(selTags.map(tagId => ({ project_id: id, tag_id: tagId })))
    }

    // Replace build-ons
    await supabase.from('build_ons').delete().eq('child_project_id', id)
    if (buildOns.length > 0) {
      await supabase.from('build_ons').insert(buildOns.map(pid => ({ parent_project_id: pid, child_project_id: id })))
    }

    showToast('Project updated!', 'success')
    window.location.href = `/projects/${id}`
  }

  const s: React.CSSProperties = {
    background: 'var(--bg-surface)',
    border: '1px solid var(--border-subtle)',
    borderRadius: 16, padding: '28px', marginBottom: 24,
  }
  const lbl: React.CSSProperties = {
    display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)',
    marginBottom: 6, letterSpacing: '0.05em', textTransform: 'uppercase',
  }
  const inp: React.CSSProperties = { width: '100%', padding: '11px 14px', borderRadius: 10 }

  if (loading) return (
    <div style={{ padding: '80px', textAlign: 'center', color: 'var(--text-muted)' }}>
      Loading…
    </div>
  )

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '48px 40px 80px' }}>
      <div style={{ marginBottom: 40 }}>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 52, fontWeight: 400 }}>
          Edit Project
        </h1>
      </div>

      <form onSubmit={handleSave}>
        <div style={s}>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, marginBottom: 20 }}>Basic Info</h2>
          <div style={{ marginBottom: 14 }}>
            <label style={lbl}>Title *</label>
            <input value={title} onChange={e => setTitle(e.target.value)} style={inp} />
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={lbl}>Short Description *</label>
            <textarea value={description} onChange={e => setDesc(e.target.value)} rows={3} style={{ ...inp, resize: 'vertical' }} />
          </div>
          <div>
            <label style={lbl}>Full Description</label>
            <textarea value={longDesc} onChange={e => setLongDesc(e.target.value)} rows={8}
              style={{ ...inp, resize: 'vertical', fontFamily: 'monospace', fontSize: 13 }} />
          </div>
        </div>

        {/* Thumbnail */}
        <div style={s}>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, marginBottom: 16 }}>Thumbnail</h2>
          {thumbPreview && (
            <div style={{ width: '100%', height: 180, borderRadius: 10, overflow: 'hidden', marginBottom: 12 }}>
              <img src={thumbPreview} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Thumbnail" />
            </div>
          )}
          <label style={{
            display: 'block', padding: '24px', border: '2px dashed var(--border)',
            borderRadius: 10, textAlign: 'center', cursor: 'pointer',
          }}>
            <input type="file" accept="image/*" onChange={e => {
              const f = e.target.files?.[0]
              if (f) { setThumbnail(f); setThumb(URL.createObjectURL(f)) }
            }} style={{ display: 'none' }} />
            <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
              {thumbPreview ? 'Replace thumbnail' : 'Upload thumbnail'}
            </span>
          </label>
        </div>

        {/* Links */}
        <div style={s}>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, marginBottom: 20 }}>Links</h2>
          {[
            { label: 'GitHub', val: repoUrl, set: setRepoUrl },
            { label: 'Live URL', val: liveUrl, set: setLiveUrl },
            { label: 'Demo Video', val: demoUrl, set: setDemoUrl },
          ].map(({ label, val, set }) => (
            <div key={label} style={{ marginBottom: 12 }}>
              <label style={lbl}>{label}</label>
              <input value={val} onChange={e => set(e.target.value)} style={inp} />
            </div>
          ))}
        </div>

        {/* Semester + Year */}
        <div style={s}>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, marginBottom: 16 }}>Academic Info</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div>
              <label style={lbl}>Semester</label>
              <select value={semester} onChange={e => setSemester(e.target.value)} style={{ ...inp, cursor: 'pointer' }}>
                <option value="">Select</option>
                {SEMESTERS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={lbl}>Academic Year</label>
              <select value={year} onChange={e => setYear(e.target.value)} style={{ ...inp, cursor: 'pointer' }}>
                <option value="">Select</option>
                {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div style={s}>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, marginBottom: 16 }}>Tags</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {tags.map(tag => (
              <button key={tag.id} type="button"
                onClick={() => setSelTags(prev =>
                  prev.includes(tag.id) ? prev.filter(x => x !== tag.id) : [...prev, tag.id]
                )}
                className={`tag-pill ${selTags.includes(tag.id) ? 'active' : ''}`}
                style={{ cursor: 'pointer', border: 'none', fontFamily: 'inherit' }}>
                {tag.name}
              </button>
            ))}
          </div>
        </div>

        {/* Build-ons */}
        <div style={s}>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, marginBottom: 8 }}>Build-ons</h2>
          <BuildOnSelector selectedIds={buildOns} onChange={setBuildOns} excludeId={id} />
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <button type="submit" disabled={saving} style={{
            flex: 1, padding: '14px', background: 'var(--accent)', color: '#1c1917',
            border: 'none', borderRadius: 12, fontSize: 14, fontWeight: 600,
            cursor: 'pointer', fontFamily: 'inherit',
          }}>
            {saving ? 'Saving…' : 'Save Changes →'}
          </button>
          <button type="button" onClick={() => window.location.href = `/projects/${id}`} style={{
            padding: '14px 24px', background: 'none', border: '1px solid var(--border)',
            borderRadius: 12, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit',
            color: 'var(--text-secondary)',
          }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
