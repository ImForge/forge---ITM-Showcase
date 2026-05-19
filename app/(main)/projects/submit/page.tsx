'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { showToast } from '@/components/ui/Toast'
import BuildOnSelector from '@/components/projects/BuildOnSelector'
import type { Tag, Program } from '@/lib/types/database'
import { PROGRAMS, SEMESTERS_BY_PROGRAM, BRANCHES, ACADEMIC_YEARS } from '@/lib/types/database'

// ─── LABEL STYLE ─────────────────────────────────────────────────────────
const LBL: React.CSSProperties = {
  display: 'block', fontSize: 10, fontWeight: 600,
  color: 'var(--text-muted)', marginBottom: 7,
  letterSpacing: '0.14em', textTransform: 'uppercase',
}
const INP: React.CSSProperties = { width: '100%', padding: '11px 14px', borderRadius: 10 }
const SECTION: React.CSSProperties = {
  background: 'var(--bg-surface)',
  border: '1px solid var(--border-subtle)',
  borderRadius: 18, padding: '28px 32px', marginBottom: 24,
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={LBL}>{label}{required && <span style={{ color: 'var(--accent)', marginLeft: 3 }}>*</span>}</label>
      {children}
    </div>
  )
}

export default function SubmitProjectPage() {
  const [tags, setTags]       = useState<Tag[]>([])
  const [loading, setLoading] = useState(false)
  const [userId, setUserId]   = useState<string | null>(null)

  // ── Core fields ──
  const [title, setTitle]         = useState('')
  const [description, setDesc]    = useState('')
  const [longDesc, setLongDesc]   = useState('')

  // ── Academic ──
  const [program, setProgram]     = useState<Program>('B.Tech')
  const [semester, setSemester]   = useState('')
  const [year, setYear]           = useState('')
  const [branch, setBranch]       = useState('')

  // ── Team ──
  const [isTeam, setIsTeam]       = useState(false)
  const [teamId, setTeamId]       = useState('')
  const [myTeams, setMyTeams]     = useState<Array<{ id: string; name: string; faculty_guide: string | null }>>([])
  const [facultyGuide, setGuide]  = useState('')

  // ── Links ──
  const [repoUrl, setRepoUrl]     = useState('')
  const [liveUrl, setLiveUrl]     = useState('')
  const [demoUrl, setDemoUrl]     = useState('')

  // ── Documentation ──
  const [docFile, setDocFile]     = useState<File | null>(null)
  const [docDesc, setDocDesc]     = useState('')

  // ── Tags + Build-ons ──
  const [selTags, setSelTags]     = useState<string[]>([])
  const [buildOns, setBuildOns]   = useState<string[]>([])

  const semesters = SEMESTERS_BY_PROGRAM[program] ?? SEMESTERS_BY_PROGRAM['B.Tech']

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) { window.location.href = '/login'; return }
      setUserId(user.id)
      supabase.from('tags').select('*').order('name').then(({ data }) => setTags((data as Tag[]) ?? []))
      supabase.from('team_members')
        .select('team_id, role, teams(id, name, faculty_guide)')
        .eq('profile_id', user.id).in('role', ['leader', 'member'])
        .then(({ data }) => {
          setMyTeams((data as any[])?.map(m => m.teams).filter(Boolean) ?? [])
        })
      // Pre-fill program from profile
      supabase.from('profiles').select('program, branch').eq('id', user.id).single().then(({ data }) => {
        if (data?.program) setProgram(data.program as Program)
        if (data?.branch)  setBranch(data.branch)
      })
    })
  }, [])

  // When team selected, auto-fill faculty guide from team data
  useEffect(() => {
    if (!teamId) return
    const t = myTeams.find(t => t.id === teamId)
    if (t?.faculty_guide) setGuide(t.faculty_guide)
  }, [teamId, myTeams])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim())       { showToast('Project title is required', 'error'); return }
    if (!description.trim()) { showToast('Short description is required', 'error'); return }
    if (!docFile && !longDesc.trim()) {
      showToast('Upload documentation or write a project description', 'error'); return
    }
    if (!userId) return

    setLoading(true)
    const supabase = createClient()

    // Upload documentation if provided
    let docUrl: string | null = null
    if (docFile) {
      const ext  = docFile.name.split('.').pop()
      const path = `${userId}-${Date.now()}.${ext}`
      const { error } = await supabase.storage.from('project-docs').upload(path, docFile, { upsert: true })
      if (!error) {
        const { data } = supabase.storage.from('project-docs').getPublicUrl(path)
        docUrl = data.publicUrl
      } else {
        showToast('Documentation upload failed — check storage bucket exists', 'error')
        setLoading(false)
        return
      }
    }

    // Insert project
    const { data: project, error: projErr } = await supabase
      .from('projects')
      .insert({
        title: title.trim(),
        description: description.trim(),
        long_description: longDesc.trim() || null,
        repo_url:    repoUrl.trim()  || null,
        live_url:    liveUrl.trim()  || null,
        demo_url:    demoUrl.trim()  || null,
        doc_url:     docUrl,
        doc_description: docDesc.trim() || null,
        submitted_by:    userId,
        team_id:         isTeam && teamId ? teamId : null,
        is_team_project: isTeam,
        faculty_guide:   facultyGuide.trim() || null,
        program:         program,
        academic_year:   year   || null,
        semester:        semester || null,
        status: 'approved',
      })
      .select().single()

    if (projErr || !project) {
      showToast('Failed to submit — ' + projErr?.message, 'error')
      setLoading(false)
      return
    }

    const pid = project.id

    // Tags
    if (selTags.length > 0)
      await supabase.from('project_tags').insert(selTags.map(t => ({ project_id: pid, tag_id: t })))

    // Owner as member
    await supabase.from('project_members').insert({ project_id: pid, profile_id: userId, role: 'owner' })

    // If team project — add all team members as contributors
    if (isTeam && teamId) {
      const { data: teamMembers } = await supabase
        .from('team_members').select('profile_id').eq('team_id', teamId)
      const others = (teamMembers ?? [])
        .map((m: any) => m.profile_id)
        .filter((id: string) => id !== userId)
      if (others.length > 0)
        await supabase.from('project_members').insert(
          others.map((pid2: string) => ({ project_id: pid, profile_id: pid2, role: 'contributor' }))
        )
    }

    // Build-ons
    if (buildOns.length > 0)
      await supabase.from('build_ons').insert(
        buildOns.map(parent => ({ parent_project_id: parent, child_project_id: pid }))
      )

    showToast('Project submitted!', 'success')
    window.location.href = `/projects/${pid}`
  }

  return (
    <div style={{ maxWidth: 780, margin: '0 auto', padding: '48px 40px 80px' }}>

      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <h1 style={{
          fontFamily: 'var(--font-cormorant), Georgia, serif',
          fontSize: 56, fontWeight: 400, lineHeight: 1,
          letterSpacing: '-0.02em', marginBottom: 8,
        }}>
          Submit Project
        </h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', fontWeight: 300 }}>
          Your work will be permanently archived and available to all future ITM students.
        </p>
      </div>

      <form onSubmit={handleSubmit}>

        {/* ── BASIC INFO ── */}
        <div style={SECTION}>
          <h2 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 22, marginBottom: 22 }}>
            Basic Info
          </h2>
          <Field label="Project Title" required>
            <input value={title} onChange={e => setTitle(e.target.value)}
              placeholder="e.g. AI Attendance System" style={INP} />
          </Field>
          <Field label="Short Description" required>
            <textarea value={description} onChange={e => setDesc(e.target.value)}
              placeholder="What does this project do? (1–2 sentences shown on cards)" rows={3}
              style={{ ...INP, resize: 'vertical' }} />
          </Field>
          <Field label="Detailed Write-up">
            <textarea value={longDesc} onChange={e => setLongDesc(e.target.value)}
              placeholder="How it works, what you learned, challenges faced, tech stack explained…" rows={7}
              style={{ ...INP, resize: 'vertical', fontFamily: 'monospace', fontSize: 13, lineHeight: 1.6 }} />
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 5 }}>
              Write here OR upload documentation below — at least one is required.
            </div>
          </Field>
        </div>

        {/* ── DOCUMENTATION ── */}
        <div style={SECTION}>
          <h2 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 22, marginBottom: 6 }}>
            Documentation
          </h2>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20, lineHeight: 1.6 }}>
            Upload a PDF report, project synopsis, or any document that explains your work.
            This is what future students will read to understand how you built this.
          </p>

          {/* Drop zone */}
          <label style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            padding: '32px', border: '2px dashed var(--border)',
            borderRadius: 14, cursor: 'pointer', textAlign: 'center',
            background: docFile ? 'var(--accent-light)' : 'var(--bg-overlay)',
            transition: 'all 0.2s',
            borderColor: docFile ? 'var(--accent)' : 'var(--border)',
          }}>
            <input type="file"
              accept=".pdf,.doc,.docx,.ppt,.pptx,.md,.txt"
              onChange={e => setDocFile(e.target.files?.[0] ?? null)}
              style={{ display: 'none' }} />
            {docFile ? (
              <>
                <div style={{ fontSize: 24, marginBottom: 8 }}>📄</div>
                <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--accent)' }}>{docFile.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
                  {(docFile.size / 1024 / 1024).toFixed(1)} MB · Click to replace
                </div>
              </>
            ) : (
              <>
                <div style={{ fontSize: 28, marginBottom: 10, opacity: 0.4 }}>📎</div>
                <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 4 }}>
                  Drop documentation here, or click to browse
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                  PDF, DOCX, PPTX, MD, TXT — max 10MB
                </div>
              </>
            )}
          </label>

          {docFile && (
            <div style={{ marginTop: 14 }}>
              <Field label="Documentation Notes (optional)">
                <textarea value={docDesc} onChange={e => setDocDesc(e.target.value)}
                  placeholder="e.g. 'Full project report including circuit diagrams and test results'" rows={2}
                  style={{ ...INP, resize: 'vertical' }} />
              </Field>
            </div>
          )}
        </div>

        {/* ── TEAM OR SOLO ── */}
        <div style={SECTION}>
          <h2 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 22, marginBottom: 16 }}>
            Project Type
          </h2>

          {/* Toggle */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
            {[
              { val: false, label: '◎ Solo Project',   desc: 'Built by you alone' },
              { val: true,  label: '⊕ Team Project',   desc: 'Collaborative work' },
            ].map(opt => (
              <button key={String(opt.val)} type="button" onClick={() => setIsTeam(opt.val)} style={{
                flex: 1, padding: '14px', borderRadius: 12, cursor: 'pointer',
                fontFamily: 'inherit', textAlign: 'left',
                background: isTeam === opt.val ? 'var(--accent-light)' : 'var(--bg-overlay)',
                border: `1px solid ${isTeam === opt.val ? 'var(--accent)' : 'var(--border-subtle)'}`,
                transition: 'all 0.2s',
              }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: isTeam === opt.val ? 'var(--accent)' : 'var(--text-primary)', marginBottom: 3 }}>
                  {opt.label}
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{opt.desc}</div>
              </button>
            ))}
          </div>

          {/* Team selector — only shows if team */}
          {isTeam && (
            <div style={{ display: 'grid', gap: 14 }}>
              <Field label="Select Team">
                {myTeams.length === 0 ? (
                  <div style={{
                    padding: '14px', borderRadius: 10, background: 'var(--bg-overlay)',
                    fontSize: 13, color: 'var(--text-muted)', textAlign: 'center',
                  }}>
                    You&apos;re not in any teams yet.{' '}
                    <a href="/teams" style={{ color: 'var(--accent)' }}>Create or join one →</a>
                  </div>
                ) : (
                  <select value={teamId} onChange={e => setTeamId(e.target.value)}
                    style={{ ...INP, cursor: 'pointer' }}>
                    <option value="">Select your team</option>
                    {myTeams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                  </select>
                )}
              </Field>

              <Field label="Faculty Guide / Mentor">
                <input value={facultyGuide} onChange={e => setGuide(e.target.value)}
                  placeholder="Dr. Sharma, Prof. Verma…"
                  style={INP} />
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 5 }}>
                  The professor or faculty who guided this project
                </div>
              </Field>
            </div>
          )}

          {/* Solo faculty guide too — some solo projects are also guided */}
          {!isTeam && (
            <Field label="Faculty Guide (optional)">
              <input value={facultyGuide} onChange={e => setGuide(e.target.value)}
                placeholder="Dr. Sharma, Prof. Verma… (leave blank if self-initiated)"
                style={INP} />
            </Field>
          )}
        </div>

        {/* ── ACADEMIC INFO ── */}
        <div style={SECTION}>
          <h2 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 22, marginBottom: 16 }}>
            Academic Info
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <Field label="Program">
              <select value={program} onChange={e => { setProgram(e.target.value as Program); setSemester('') }}
                style={{ ...INP, cursor: 'pointer' }}>
                {PROGRAMS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </Field>
            <Field label="Branch / Department">
              <select value={branch} onChange={e => setBranch(e.target.value)}
                style={{ ...INP, cursor: 'pointer' }}>
                <option value="">Select branch</option>
                {BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </Field>
            <Field label="Semester">
              <select value={semester} onChange={e => setSemester(e.target.value)}
                style={{ ...INP, cursor: 'pointer' }}>
                <option value="">Select semester</option>
                {semesters.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </Field>
            <Field label="Academic Year">
              <select value={year} onChange={e => setYear(e.target.value)}
                style={{ ...INP, cursor: 'pointer' }}>
                <option value="">Select year</option>
                {ACADEMIC_YEARS.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </Field>
          </div>
        </div>

        {/* ── LINKS ── */}
        <div style={SECTION}>
          <h2 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 22, marginBottom: 16 }}>
            Links
          </h2>
          <div style={{ display: 'grid', gap: 14 }}>
            <Field label="GitHub Repository">
              <input value={repoUrl} onChange={e => setRepoUrl(e.target.value)}
                placeholder="https://github.com/…" style={INP} />
            </Field>
            <Field label="Live Demo (optional)">
              <input value={liveUrl} onChange={e => setLiveUrl(e.target.value)}
                placeholder="https://yourproject.vercel.app" style={INP} />
            </Field>
            <Field label="Demo Video (optional)">
              <input value={demoUrl} onChange={e => setDemoUrl(e.target.value)}
                placeholder="https://youtube.com/…" style={INP} />
            </Field>
          </div>
        </div>

        {/* ── TAGS ── */}
        <div style={SECTION}>
          <h2 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 22, marginBottom: 16 }}>
            Tags
          </h2>
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

        {/* ── BUILD-ON ── */}
        <div style={SECTION}>
          <h2 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 22, marginBottom: 8 }}>
            Build-on
          </h2>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16, lineHeight: 1.6 }}>
            Does this project extend or build upon a previous student&apos;s work?
            Credit them — this creates the knowledge lineage tree.
          </p>
          <BuildOnSelector selectedIds={buildOns} onChange={setBuildOns} />
        </div>

        {/* SUBMIT */}
        <button type="submit" disabled={loading} style={{
          width: '100%', padding: '16px',
          background: loading ? 'var(--border)' : 'var(--accent)',
          color: loading ? 'var(--text-muted)' : '#1c1917',
          border: 'none', borderRadius: 14,
          fontSize: 15, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer',
          fontFamily: 'inherit', letterSpacing: '0.02em',
          transition: 'all 0.2s',
        }}>
          {loading ? 'Submitting…' : 'Archive This Project →'}
        </button>

      </form>
    </div>
  )
}
