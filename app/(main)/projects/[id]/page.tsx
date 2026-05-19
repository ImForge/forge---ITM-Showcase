// Project detail — Server Component
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ProjectActions from '@/components/projects/ProjectActions'
import type { ProjectWithRelations } from '@/lib/types/database'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data } = await supabase.from('projects').select('title, description').eq('id', id).single()
  return { title: data?.title ?? 'Project' }
}

// ─── MEMBER AVATAR ────────────────────────────────────────────────────────
function MemberAvatar({ m, size = 40 }: { m: any; size?: number }) {
  return (
    <Link href={`/profile/${m.profiles?.username}`} style={{
      display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none',
      padding: '8px 10px', borderRadius: 10, transition: 'background 0.15s',
    }}>
      <div style={{
        width: size, height: size, borderRadius: '50%', flexShrink: 0,
        background: 'var(--bg-overlay)', overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: size * 0.38, color: 'var(--accent)',
        border: '1px solid var(--border-subtle)',
      }}>
        {m.profiles?.avatar_url
          ? <img src={m.profiles.avatar_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
          : m.profiles?.username?.[0]?.toUpperCase()}
      </div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>
          {m.profiles?.full_name || m.profiles?.username}
        </div>
        <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'capitalize' }}>
          {m.role}
        </div>
      </div>
    </Link>
  )
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Increment views (fire and forget)
  supabase.rpc('increment_views', { project_id: id }).then(() => {})

  const { data: raw } = await supabase
    .from('projects')
    .select(`
      *,
      profiles!projects_submitted_by_fkey ( id, username, avatar_url, full_name, bio, graduation_year, program, branch ),
      project_tags ( tag_id, tags ( id, name, color ) ),
      project_members (
        profile_id, role,
        profiles!project_members_profile_id_fkey ( id, username, avatar_url, full_name )
      ),
      teams ( id, name, logo_url, description, faculty_guide )
    `)
    .eq('id', id)
    .single()

  if (!raw) notFound()
  const project = raw as unknown as ProjectWithRelations

  // star / save status
  let isStarred = false, isSaved = false
  if (user) {
    const [{ data: s }, { data: sv }] = await Promise.all([
      supabase.from('stars').select('user_id').eq('user_id', user.id).eq('project_id', id).maybeSingle(),
      supabase.from('saves').select('id').eq('user_id', user.id).eq('project_id', id).maybeSingle(),
    ])
    isStarred = !!s; isSaved = !!sv
  }

  // build-on tree
  const [{ data: parentsRaw }, { data: childrenRaw }] = await Promise.all([
    supabase.from('build_ons').select('parent_project_id, projects!build_ons_parent_project_id_fkey(id,title,star_count)').eq('child_project_id', id),
    supabase.from('build_ons').select('child_project_id, projects!build_ons_child_project_id_fkey(id,title,star_count)').eq('parent_project_id', id),
  ])
  const parents  = (parentsRaw  as any[]) ?? []
  const children = (childrenRaw as any[]) ?? []

  const tags    = project.project_tags?.map(pt => pt.tags).filter(Boolean) ?? []
  const members = project.project_members ?? []
  const author  = project.profiles
const team = (project as any).teams as { id: string; name: string; logo_url: string | null; description: string | null; faculty_guide: string | null } | null

  const isOwner = user && (
    project.submitted_by === user.id ||
    members.some(m => m.profile_id === user.id && m.role === 'owner')
  )

  // Doc file type
  const docUrl  = (project as any).doc_url as string | null
  const docDesc = (project as any).doc_description as string | null
  const isPdfDoc  = docUrl?.toLowerCase().endsWith('.pdf')
  const isDocxDoc = docUrl?.toLowerCase().match(/\.docx?$/)

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '48px 40px 80px' }}>

      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 36 }}>
        <Link href="/projects" style={{ fontSize: 13, color: 'var(--text-muted)' }}>Archive</Link>
        <span style={{ color: 'var(--border)' }}>›</span>
        <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{project.title}</span>
        {isOwner && (
          <Link href={`/projects/${id}/edit`} style={{
            marginLeft: 'auto', fontSize: 12, color: 'var(--accent)',
            padding: '5px 14px', borderRadius: 8,
            border: '1px solid var(--accent)', fontWeight: 500,
          }}>
            Edit
          </Link>
        )}
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginBottom: 16 }}>
          {tags.map(t => <span key={t!.id} className="tag-pill">{t!.name}</span>)}
        </div>
      )}

      {/* Title */}
      <h1 style={{
        fontFamily: 'var(--font-cormorant), Georgia, serif',
        fontSize: 'clamp(44px, 6vw, 72px)',
        fontWeight: 400, lineHeight: 1.0,
        letterSpacing: '-0.02em',
        marginBottom: 16,
      }}>
        {project.title}
      </h1>

      {/* Description */}
      {project.description && (
        <p style={{ fontSize: 17, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 28, fontWeight: 300, maxWidth: 680 }}>
          {project.description}
        </p>
      )}

      {/* ─── CREDIT BANNER ────────────────────────────────────────────────
          Team project: show team prominently
          Solo project: show author
      ──────────────────────────────────────────────────────────────────── */}
      <div style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 16, padding: '20px 24px',
        marginBottom: 28,
        display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start',
      }}>
        {project.is_team_project && team ? (
          /* ── TEAM PROJECT CREDIT ── */
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 9, letterSpacing: '0.18em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 10 }}>
              Team Project
            </div>
            <Link href={`/teams/${team.id}`} style={{
              display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', marginBottom: 12,
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                background: 'var(--bg-overlay)', overflow: 'hidden',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, color: 'var(--accent)', border: '1px solid var(--border-subtle)',
              }}>
                {team.logo_url
                  ? <img src={team.logo_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                  : team.name[0]?.toUpperCase()}
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)' }}>{team.name}</div>
                {team.description && (
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                    {team.description.includes(' ||| ')
                      ? team.description.slice(0, team.description.indexOf(' ||| '))
                      : team.description}
                  </div>
                )}
              </div>
            </Link>
            {/* Team member avatars inline */}
            <div style={{ display: 'flex', gap: -6 }}>
              {members.slice(0, 8).map((m, i) => (
                <Link key={m.profile_id} href={`/profile/${m.profiles?.username}`} title={m.profiles?.username}>
                  <div style={{
                    width: 30, height: 30, borderRadius: '50%',
                    background: 'var(--bg-overlay)', overflow: 'hidden',
                    border: '2px solid var(--bg-surface)',
                    marginLeft: i > 0 ? -10 : 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, color: 'var(--accent)',
                    position: 'relative', zIndex: members.length - i,
                  }}>
                    {m.profiles?.avatar_url
                      ? <img src={m.profiles.avatar_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                      : m.profiles?.username?.[0]?.toUpperCase()}
                  </div>
                </Link>
              ))}
              {members.length > 8 && (
                <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--accent-dim)', border: '2px solid var(--bg-surface)', marginLeft: -10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: 'var(--accent)', fontWeight: 700 }}>
                  +{members.length - 8}
                </div>
              )}
              <span style={{ fontSize: 12, color: 'var(--text-muted)', marginLeft: 12, alignSelf: 'center' }}>
                {members.length} contributor{members.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        ) : (
          /* ── SOLO PROJECT CREDIT ── */
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 9, letterSpacing: '0.18em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 10 }}>
              Submitted by
            </div>
            <Link href={`/profile/${author?.username}`} style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
              <div style={{
                width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
                background: 'var(--bg-overlay)', overflow: 'hidden',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, color: 'var(--accent)', border: '1px solid var(--border-subtle)',
              }}>
                {author?.avatar_url
                  ? <img src={author.avatar_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                  : author?.username?.[0]?.toUpperCase()}
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>
                  {author?.full_name || author?.username}
                </div>
                <div style={{ fontSize: 12, color: 'var(--accent)' }}>@{author?.username}</div>
              </div>
            </Link>
          </div>
        )}

        {/* Faculty guide — always show if present */}
        {project.faculty_guide && (
          <div style={{ borderLeft: '1px solid var(--border-subtle)', paddingLeft: 24, minWidth: 160 }}>
            <div style={{ fontSize: 9, letterSpacing: '0.18em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 8 }}>
              Guided by
            </div>
            <div style={{ fontSize: 14, color: 'var(--text-primary)', fontWeight: 500 }}>
              {project.faculty_guide}
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Faculty Guide</div>
          </div>
        )}

        {/* Academic info */}
        <div style={{ borderLeft: '1px solid var(--border-subtle)', paddingLeft: 24 }}>
          <div style={{ fontSize: 9, letterSpacing: '0.18em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 8 }}>
            Academic
          </div>
          {(project as any).program && (
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 2 }}>{(project as any).program}</div>
          )}
          {project.semester && <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 2 }}>{project.semester}</div>}
          {project.academic_year && <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{project.academic_year}</div>}
        </div>
      </div>

      {/* Meta + actions row */}
      <div style={{
        display: 'flex', gap: 20, flexWrap: 'wrap',
        alignItems: 'center', marginBottom: 36,
        paddingBottom: 28, borderBottom: '1px solid var(--border-subtle)',
      }}>
        <div style={{ display: 'flex', gap: 18, fontSize: 13, color: 'var(--text-muted)', flexWrap: 'wrap' }}>
          <span>👁 {project.views} views</span>
          <span>★ {project.star_count} stars</span>
          {project.repo_url && <a href={project.repo_url} target="_blank" rel="noopener" style={{ color: 'var(--accent)', fontWeight: 500 }}>⌥ GitHub →</a>}
          {project.live_url && <a href={project.live_url} target="_blank" rel="noopener" style={{ color: 'var(--accent)', fontWeight: 500 }}>◎ Live →</a>}
          {project.demo_url && <a href={project.demo_url} target="_blank" rel="noopener" style={{ color: 'var(--accent)', fontWeight: 500 }}>▶ Demo →</a>}
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <ProjectActions projectId={id} initialStarred={isStarred} initialSaved={isSaved} starCount={project.star_count} userId={user?.id ?? null} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 40 }}>

        {/* ── LEFT COLUMN ── */}
        <div>

          {/* Long description */}
          {project.long_description && (
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontSize: 9, letterSpacing: '0.2em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 16 }}>
                About This Project
              </div>
              <div style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.8, whiteSpace: 'pre-wrap', fontWeight: 300 }}>
                {project.long_description}
              </div>
            </div>
          )}

          {/* Documentation */}
          {docUrl && (
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontSize: 9, letterSpacing: '0.2em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 16 }}>
                Documentation
              </div>
              {docDesc && (
                <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16, lineHeight: 1.6, fontStyle: 'italic' }}>
                  {docDesc}
                </p>
              )}
              {/* Preview */}
              {isPdfDoc && (
                <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 14, overflow: 'hidden', marginBottom: 12 }}>
                  <iframe src={docUrl} style={{ width: '100%', height: 500, border: 'none', display: 'block' }} title="Documentation" />
                </div>
              )}
              {isDocxDoc && (
                <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 14, overflow: 'hidden', marginBottom: 12 }}>
                  <iframe src={`https://docs.google.com/viewer?url=${encodeURIComponent(docUrl)}&embedded=true`} style={{ width: '100%', height: 500, border: 'none', display: 'block' }} title="Documentation" />
                </div>
              )}
              {/* Download bar */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '14px 18px', borderRadius: 12,
                background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)',
              }}>
                <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                  📄 Project Documentation
                </span>
                <a href={docUrl} download target="_blank" rel="noopener" style={{
                  padding: '7px 18px', borderRadius: 8,
                  background: 'var(--accent)', color: '#1c1917',
                  fontSize: 12, fontWeight: 600,
                }}>
                  ↓ Download
                </a>
              </div>
            </div>
          )}

          {/* Build-on lineage */}
          {(parents.length > 0 || children.length > 0) && (
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontSize: 9, letterSpacing: '0.2em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 16 }}>
                Knowledge Lineage
              </div>
              {parents.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8 }}>Built upon ↑</div>
                  {parents.map((b: any) => (
                    <Link key={b.parent_project_id} href={`/projects/${b.parent_project_id}`} style={{ display: 'block', padding: '12px 16px', borderRadius: 10, background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', marginBottom: 8, textDecoration: 'none', fontSize: 14, color: 'var(--text-primary)' }}>
                      ↑ {b.projects?.title}
                    </Link>
                  ))}
                </div>
              )}
              {children.length > 0 && (
                <div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8 }}>Later built upon ↓</div>
                  {children.map((b: any) => (
                    <Link key={b.child_project_id} href={`/projects/${b.child_project_id}`} style={{ display: 'block', padding: '12px 16px', borderRadius: 10, background: 'var(--accent-dim)', border: '1px solid var(--border-subtle)', marginBottom: 8, textDecoration: 'none', fontSize: 14, color: 'var(--accent)' }}>
                      ↓ {b.projects?.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── RIGHT SIDEBAR ── */}
        <div>
          {/* Team members panel — only for team projects */}
          {project.is_team_project && members.length > 0 && (
            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 16, padding: '20px', marginBottom: 20 }}>
              <div style={{ fontSize: 9, letterSpacing: '0.18em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 14 }}>
                The Team
              </div>
              {members.map(m => <MemberAvatar key={m.profile_id} m={m} />)}
            </div>
          )}

          {/* Solo author sidebar — only for solo projects */}
          {!project.is_team_project && (
            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 16, padding: '20px', marginBottom: 20 }}>
              <div style={{ fontSize: 9, letterSpacing: '0.18em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 14 }}>
                Builder
              </div>
              <Link href={`/profile/${author?.username}`} style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--bg-overlay)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: 'var(--accent)' }}>
                  {author?.avatar_url ? <img src={author.avatar_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" /> : author?.username?.[0]?.toUpperCase()}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>{author?.full_name || author?.username}</div>
                  <div style={{ fontSize: 12, color: 'var(--accent)' }}>@{author?.username}</div>
                  {(author as any)?.program && <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{(author as any).program} · {(author as any).branch}</div>}
                </div>
              </Link>
            </div>
          )}

          {/* Faculty guide sidebar card */}
          {project.faculty_guide && (
            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 16, padding: '20px', marginBottom: 20 }}>
              <div style={{ fontSize: 9, letterSpacing: '0.18em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 12 }}>
                Faculty Guide
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--accent-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: 'var(--accent)' }}>
                  🎓
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>{project.faculty_guide}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>ITM University</div>
                </div>
              </div>
            </div>
          )}

          {/* Project info */}
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 16, padding: '20px' }}>
            <div style={{ fontSize: 9, letterSpacing: '0.18em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 14 }}>
              Details
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[(project as any).program && { label: 'Program', val: (project as any).program },
                project.semester && { label: 'Semester', val: project.semester },
                project.academic_year && { label: 'Year', val: project.academic_year },
                { label: 'Type', val: project.is_team_project ? 'Team Project' : 'Solo Project' },
                { label: 'Status', val: project.status },
              ].filter(Boolean).map((item: any) => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                  <span style={{ color: 'var(--text-muted)' }}>{item.label}</span>
                  <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{item.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
