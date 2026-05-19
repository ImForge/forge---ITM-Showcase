// Assignment detail — Server Component
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { AssignmentWithProfile } from '@/lib/types/database'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data } = await supabase.from('assignments').select('title').eq('id', id).single()
  return { title: data?.title ?? 'Assignment' }
}

export default async function AssignmentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: rawData } = await supabase
    .from('assignments')
    .select('*, profiles(id, username, avatar_url, full_name)')
    .eq('id', id)
    .single()

  if (!rawData) notFound()
  const assignment = rawData as unknown as AssignmentWithProfile

  // Permission: owner can always see, others only if public
  const isOwner = user?.id === assignment.submitted_by
  if (!assignment.is_public && !isOwner) {
    return (
      <div style={{ padding: '80px', textAlign: 'center', color: 'var(--text-muted)' }}>
        <div style={{ fontSize: 36, opacity: 0.3, marginBottom: 12 }}>🔒</div>
        <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 24 }}>
          This assignment is private
        </div>
      </div>
    )
  }

  // Detect file type for preview
  const url = assignment.file_url ?? ''
  const isPDF   = url.toLowerCase().endsWith('.pdf')
  const isImage = url.toLowerCase().match(/\.(jpg|jpeg|png|gif|webp)$/)
  const isDocx  = url.toLowerCase().endsWith('.docx') || url.toLowerCase().endsWith('.doc')
  const hasFile = !!url

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 40px 80px' }}>

      {/* Breadcrumb */}
      <div className="animate-fade-up" style={{ marginBottom: 32, display: 'flex', alignItems: 'center', gap: 8 }}>
        <Link href="/assignments" style={{ fontSize: 13, color: 'var(--text-muted)' }}>Assignments</Link>
        <span style={{ color: 'var(--border)' }}>›</span>
        <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{assignment.title}</span>
        {isOwner && (
          <Link href="/assignments" style={{
            marginLeft: 'auto', fontSize: 12, color: 'var(--accent)',
            padding: '5px 14px', borderRadius: 8,
            border: '1px solid var(--accent)', fontWeight: 500,
          }}>
            Manage
          </Link>
        )}
      </div>

      {/* Header */}
      <div className="animate-fade-up delay-1" style={{ marginBottom: 32 }}>
        <div style={{
          fontSize: 11, color: 'var(--accent)', letterSpacing: '0.15em',
          textTransform: 'uppercase', marginBottom: 12,
        }}>
          {assignment.subject} · {assignment.semester} · {assignment.academic_year}
        </div>
        <h1 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(36px, 5vw, 56px)',
          fontWeight: 400, lineHeight: 1.05, marginBottom: 16,
        }}>
          {assignment.title}
        </h1>
        {assignment.description && (
          <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            {assignment.description}
          </p>
        )}
      </div>

      {/* Author */}
      <div className="animate-fade-up delay-1" style={{
        display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40,
        paddingBottom: 24, borderBottom: '1px solid var(--border-subtle)',
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'var(--bg-overlay)', overflow: 'hidden',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, color: 'var(--accent)',
        }}>
          {assignment.profiles?.avatar_url
            ? <img src={assignment.profiles.avatar_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
            : assignment.profiles?.username?.[0]?.toUpperCase()}
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 500 }}>
            {assignment.profiles?.full_name || assignment.profiles?.username}
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            Uploaded {new Date(assignment.created_at).toLocaleDateString('en-IN', {
              day: 'numeric', month: 'long', year: 'numeric',
            })}
          </div>
        </div>
        <span style={{
          marginLeft: 'auto', fontSize: 11, padding: '3px 10px', borderRadius: 99,
          background: assignment.is_public ? 'rgba(74,124,89,0.1)' : 'var(--bg-overlay)',
          color: assignment.is_public ? 'var(--success)' : 'var(--text-muted)',
        }}>
          {assignment.is_public ? '◎ Public' : '◉ Private'}
        </span>
      </div>

      {/* File Preview */}
      {hasFile && (
        <div className="animate-fade-up delay-2" style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 16, overflow: 'hidden', marginBottom: 24,
        }}>
          <div style={{
            padding: '14px 20px',
            borderBottom: '1px solid var(--border-subtle)',
            fontSize: 12, color: 'var(--text-muted)',
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span>{isPDF ? '📄 PDF Document' : isImage ? '🖼 Image' : isDocx ? '📝 Word Document' : '📎 File'}</span>
          </div>

          {/* PDF preview */}
          {isPDF && (
            <iframe
              src={url}
              style={{ width: '100%', height: 600, border: 'none', display: 'block' }}
              title="PDF Preview"
            />
          )}

          {/* Image preview */}
          {isImage && (
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <img src={url} alt={assignment.title}
                style={{ maxWidth: '100%', maxHeight: 600, borderRadius: 8 }} />
            </div>
          )}

          {/* DOCX — Google Docs Viewer */}
          {isDocx && (
            <iframe
              src={`https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`}
              style={{ width: '100%', height: 600, border: 'none', display: 'block' }}
              title="Document Preview"
            />
          )}

          {/* Other file types */}
          {!isPDF && !isImage && !isDocx && (
            <div style={{
              padding: '40px', textAlign: 'center',
              color: 'var(--text-muted)',
            }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>📎</div>
              <div style={{ fontSize: 15, marginBottom: 6 }}>Preview not available</div>
              <div style={{ fontSize: 13 }}>Download to view this file</div>
            </div>
          )}
        </div>
      )}

      {/* Download bar */}
      {hasFile && (
        <div className="animate-fade-up delay-3" style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 14, padding: '16px 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 16,
        }}>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
            Download the original file
          </div>
          <a href={url} download target="_blank" rel="noopener" style={{
            padding: '9px 24px', borderRadius: 8,
            background: 'var(--accent)', color: '#1c1917',
            fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8,
          }}>
            ↓ Download
          </a>
        </div>
      )}

      {!hasFile && (
        <div style={{
          background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)',
          borderRadius: 14, padding: '32px', textAlign: 'center', color: 'var(--text-muted)',
        }}>
          No file attached to this assignment
        </div>
      )}
    </div>
  )
}
