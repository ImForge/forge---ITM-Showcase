// ProjectCard — Server Component safe (no event handlers)
// Uses CSS classes for hover effects, not onMouseEnter
import Link from 'next/link'
import type { ProjectWithRelations } from '@/lib/types/database'

type Props = {
  project: ProjectWithRelations
  showSemester?: boolean
}

export default function ProjectCard({ project, showSemester = true }: Props) {
  const tags = project.project_tags?.map(pt => pt.tags).filter(Boolean) ?? []
  const author = project.profiles
  const members = project.project_members ?? []

  return (
    <Link href={`/projects/${project.id}`} className="project-card-hover" style={{
      background: 'var(--bg-surface)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 16,
      display: 'block',
      overflow: 'hidden',
      transition: 'all 0.25s cubic-bezier(0.22,1,0.36,1)',
      textDecoration: 'none',
    }}>
      {/* Thumbnail */}
      <div style={{
        width: '100%', height: 160,
        background: 'var(--bg-overlay)',
        overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 40, color: 'var(--text-muted)',
      }}>
        {project.thumbnail_url
          ? <img src={project.thumbnail_url} alt={project.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : '◫'}
      </div>

      <div style={{ padding: '20px' }}>
        {/* Tags */}
        {tags.length > 0 && (
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
            {tags.slice(0, 3).map(tag => (
              <span key={tag!.id} className="tag-pill">{tag!.name}</span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 22, fontWeight: 400,
          color: 'var(--text-primary)',
          lineHeight: 1.2, marginBottom: 8,
        }}>
          {project.title}
        </h3>

        {/* Description */}
        <p style={{
          fontSize: 13, color: 'var(--text-muted)',
          lineHeight: 1.6, marginBottom: 16,
        }}>
          {project.description?.slice(0, 100)}
          {(project.description?.length ?? 0) > 100 ? '…' : ''}
        </p>

        {/* Meta row */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          paddingTop: 14,
          borderTop: '1px solid var(--border-subtle)',
        }}>
          {/* Author avatar */}
          <div style={{
            width: 26, height: 26, borderRadius: '50%',
            background: 'var(--bg-overlay)',
            overflow: 'hidden', flexShrink: 0,
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: 10,
            color: 'var(--accent)',
          }}>
            {author?.avatar_url
              ? <img src={author.avatar_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
              : author?.username?.[0]?.toUpperCase()}
          </div>

          <span style={{ fontSize: 12, color: 'var(--text-secondary)', flex: 1,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {author?.full_name || author?.username}
          </span>

          {showSemester && project.semester && (
            <span style={{
              fontSize: 10, color: 'var(--text-muted)',
              letterSpacing: '0.05em',
              background: 'var(--bg-overlay)',
              padding: '2px 8px', borderRadius: 99,
            }}>
              {project.semester}
            </span>
          )}

          <span style={{
            fontSize: 12, color: 'var(--accent)',
            display: 'flex', alignItems: 'center', gap: 3, flexShrink: 0,
          }}>
            ★ {project.star_count}
          </span>
        </div>

        {/* Team members avatars if any */}
        {members.length > 1 && (
          <div style={{ display: 'flex', marginTop: 10, gap: -6 }}>
            {members.slice(0, 5).map((m, i) => (
              <div key={m.profile_id} style={{
                width: 22, height: 22, borderRadius: '50%',
                background: 'var(--bg-overlay)',
                border: '2px solid var(--bg-surface)',
                overflow: 'hidden', marginLeft: i > 0 ? -8 : 0,
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: 9, color: 'var(--accent)',
              }}>
                {m.profiles?.avatar_url
                  ? <img src={m.profiles.avatar_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                  : m.profiles?.username?.[0]?.toUpperCase()}
              </div>
            ))}
            {members.length > 5 && (
              <div style={{
                width: 22, height: 22, borderRadius: '50%',
                background: 'var(--accent-dim)', border: '2px solid var(--bg-surface)',
                marginLeft: -8, display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: 9, color: 'var(--accent)',
              }}>
                +{members.length - 5}
              </div>
            )}
          </div>
        )}
      </div>
    </Link>
  )
}
