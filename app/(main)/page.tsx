// Homepage — Server Component
// Direction: Digital Museum / Living Archive
// Aesthetic: Interstellar meets A24 meets archival institution
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import type { ProjectWithRelations, AssignmentWithProfile } from '@/lib/types/database'
import Greeting from '@/components/ui/Greeting'
import {
  HeroProjectCard,
  SideProjectCard,
  ArchiveCard,
  AssignmentCard,
} from '@/components/ui/TrendingCard'

export const metadata = {
  title: 'Forge — Knowledge doesn\'t graduate.',
  description: 'The permanent student archive at ITM University Raipur.',
}

// Deterministic archive ID from project id
function archiveId(id: string, index: number) {
  const year = new Date().getFullYear()
  const hex = id.slice(0, 4).toUpperCase()
  return `ITM/${year}/A-${String(index + 1).padStart(3, '0')}-${hex}`
}

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const [{ count: projectCount }, { count: teamCount }, { count: assignmentCount }] = await Promise.all([
    supabase.from('projects').select('*', { count: 'exact', head: true }).eq('status', 'approved'),
    supabase.from('teams').select('*', { count: 'exact', head: true }),
    supabase.from('assignments').select('*', { count: 'exact', head: true }).eq('is_public', true),
  ])

  const { data: trendingRaw } = await supabase
    .from('projects')
    .select(`*, views, profiles!projects_submitted_by_fkey(id,username,avatar_url,full_name), project_tags(tag_id,tags(id,name,color)), project_members(profile_id,role,profiles!project_members_profile_id_fkey(id,username,avatar_url,full_name))`)
    .eq('status', 'approved')
    .order('star_count', { ascending: false })
    .limit(7)
  const trending = (trendingRaw as unknown as ProjectWithRelations[]) ?? []

  const { data: assignmentsRaw } = await supabase
    .from('assignments')
    .select('*, profiles(id,username,avatar_url,full_name)')
    .eq('is_public', true)
    .order('created_at', { ascending: false })
    .limit(4)
  const assignments = (assignmentsRaw as unknown as AssignmentWithProfile[]) ?? []

  const hero     = trending[0]
  const featured = trending.slice(1, 4)
  const archive  = trending.slice(4)

  return (
    <div style={{ width: '100%', background: 'var(--bg-base)', position: 'relative', overflowX: 'hidden' }}>

      {/* ── GLOBAL ATMOSPHERE ─────────────────────────────────────────────
          Layered depth system:
          1. Fixed grain texture (always present)
          2. Drifting amber bloom (slow CSS animation)
          3. Cool counter-bloom (opposite corner)
          4. Vignette overlay
          All at ultra-low opacity — felt but not seen.
      ─────────────────────────────────────────────────────────────────── */}
      <style>{`
        @keyframes driftA {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(4%, 3%) scale(1.06); }
          66% { transform: translate(-3%, 5%) scale(0.96); }
        }
        @keyframes driftB {
          0%, 100% { transform: translate(0, 0) scale(1); }
          40% { transform: translate(-5%, -4%) scale(1.08); }
          70% { transform: translate(3%, -2%) scale(0.94); }
        }
        @keyframes grain {
          0%, 100% { transform: translate(0,0); }
          10% { transform: translate(-2%,-3%); }
          20% { transform: translate(3%,2%); }
          30% { transform: translate(-1%,4%); }
          40% { transform: translate(4%,-1%); }
          50% { transform: translate(-3%,3%); }
          60% { transform: translate(2%,-4%); }
          70% { transform: translate(-4%,1%); }
          80% { transform: translate(3%,4%); }
          90% { transform: translate(-2%,-2%); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .animate-hero { animation: fadeUp 1s cubic-bezier(0.22,1,0.36,1) both; }
        .animate-hero-2 { animation: fadeUp 1s cubic-bezier(0.22,1,0.36,1) 0.15s both; }
        .animate-hero-3 { animation: fadeUp 1s cubic-bezier(0.22,1,0.36,1) 0.3s both; }
        .animate-hero-4 { animation: fadeUp 1s cubic-bezier(0.22,1,0.36,1) 0.45s both; }
        .animate-section { animation: fadeIn 0.8s ease both; }

        /* Archive card hover — slow luxury lift */
        .archive-card-hover {
          transition: all 0.5s cubic-bezier(0.22,1,0.36,1);
        }
        .archive-card-hover:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 64px rgba(0,0,0,0.25), 0 0 0 1px rgba(201,151,58,0.15);
        }

        /* Nav item glow on hover */
        .sidebar-link:hover .nav-icon {
          color: var(--accent);
          transform: scale(1.1);
        }
      `}</style>

      {/* Atmosphere layer */}
      <div aria-hidden style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        {/* Amber bloom — drifts slowly */}
        <div style={{
          position: 'absolute', top: '-30vh', left: '-15vw',
          width: '80vw', height: '80vh',
          background: 'radial-gradient(ellipse, rgba(201,151,58,0.09) 0%, rgba(201,151,58,0.02) 50%, transparent 70%)',
          animation: 'driftA 22s ease-in-out infinite',
        }} />
        {/* Cool blue counter-bloom */}
        <div style={{
          position: 'absolute', bottom: '-20vh', right: '-10vw',
          width: '60vw', height: '60vh',
          background: 'radial-gradient(ellipse, rgba(60,80,200,0.05) 0%, transparent 70%)',
          animation: 'driftB 28s ease-in-out infinite',
        }} />
        {/* Mid-page warmth */}
        <div style={{
          position: 'absolute', top: '50vh', left: '30vw',
          width: '40vw', height: '40vh',
          background: 'radial-gradient(ellipse, rgba(201,151,58,0.04) 0%, transparent 70%)',
          animation: 'driftA 35s ease-in-out infinite reverse',
        }} />
        {/* Vignette */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 50%, rgba(0,0,0,0.18) 100%)',
        }} />
        {/* Moving grain */}
        <div style={{
          position: 'absolute', inset: '-50%',
          width: '200%', height: '200%',
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 512 512\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.04\'/%3E%3C/svg%3E")',
          backgroundSize: '256px 256px',
          animation: 'grain 8s steps(1) infinite',
          opacity: 0.6,
        }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* ── HERO ──────────────────────────────────────────────────────────
            Giant "K" watermark behind text — the signature element.
            Manifesto text with editorial monospace metadata contrast.
        ─────────────────────────────────────────────────────────────────── */}
        <section style={{
          minHeight: '92vh',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: '80px 72px',
          position: 'relative', overflow: 'hidden',
        }}>

          {/* Signature element — Giant "K" */}
          <div aria-hidden style={{
            position: 'absolute',
            top: '50%', left: '-5%',
            transform: 'translateY(-50%)',
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: 'clamp(400px, 55vw, 700px)',
            fontWeight: 300, fontStyle: 'italic',
            lineHeight: 0.85,
            color: 'rgba(201,151,58,0.032)',
            letterSpacing: '-0.06em',
            userSelect: 'none', pointerEvents: 'none',
            animation: 'heroFloat 18s ease-in-out infinite',
            zIndex: 0,
          }}>
            K
          </div>

          {/* Radial glow behind the headline */}
          <div aria-hidden style={{
            position: 'absolute', top: '40%', left: '35%',
            transform: 'translate(-50%,-50%)',
            width: '60vw', height: '60vh',
            background: 'radial-gradient(ellipse, rgba(201,151,58,0.06) 0%, transparent 65%)',
            pointerEvents: 'none', zIndex: 0,
          }} />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', width: '100%' }}>

            {/* Archive system label */}
            <div className="animate-hero" style={{
              display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40,
            }}>
              {/* Pulsing active indicator */}
              <div style={{
                width: 6, height: 6, borderRadius: '50%',
                background: 'var(--accent)',
                animation: 'pulse 2.4s ease-in-out infinite',
                boxShadow: '0 0 8px rgba(201,151,58,0.5)',
              }} />
              <span style={{
                fontFamily: 'monospace',
                fontSize: 10, color: 'var(--text-muted)',
                letterSpacing: '0.2em', textTransform: 'uppercase',
              }}>
                ITM University · Student Archive · Active
              </span>
              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, var(--border-subtle), transparent)' }} />
              <Greeting hasUser={!!user} />
            </div>

            {/* Main headline */}
            <div className="animate-hero-2">
              <h1 style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 'clamp(76px, 12vw, 150px)',
                fontWeight: 400, lineHeight: 0.88,
                color: 'var(--text-primary)',
                letterSpacing: '-0.04em',
                marginBottom: 0,
              }}>
                Knowledge
              </h1>
              <h1 style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 'clamp(76px, 12vw, 150px)',
                fontWeight: 300, fontStyle: 'italic',
                lineHeight: 0.88, letterSpacing: '-0.04em',
                color: 'var(--text-secondary)',
                marginBottom: 40,
              }}>
                doesn&apos;t graduate.
              </h1>
            </div>

            {/* Two-column below headline */}
            <div className="animate-hero-3" style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80,
              alignItems: 'end',
            }}>
              {/* Left — description */}
              <div>
                <p style={{
                  fontSize: 16, color: 'var(--text-secondary)',
                  lineHeight: 1.8, fontWeight: 300, marginBottom: 32,
                }}>
                  Every project built at ITM University Raipur
                  is preserved here permanently — available
                  for every future student to discover and
                  build upon.
                </p>
                <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                  <Link href="/projects/submit" style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '12px 28px', borderRadius: 99,
                    border: '1px solid var(--accent)',
                    background: 'transparent',
                    fontSize: 13, color: 'var(--accent)',
                    fontWeight: 500, letterSpacing: '0.04em',
                    transition: 'all 0.3s',
                  }}>
                    Submit your work
                  </Link>
                  <Link href="/projects" style={{
                    fontSize: 13, color: 'var(--text-muted)',
                    letterSpacing: '0.04em',
                    transition: 'color 0.2s',
                  }}>
                    Browse archive →
                  </Link>
                </div>
              </div>

              {/* Right — archive metrics, typographic */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {[
                  { n: projectCount   ?? 0, label: 'Works Preserved',      id: 'ARCH' },
                  { n: teamCount      ?? 0, label: 'Student Collectives',   id: 'TEAM' },
                  { n: assignmentCount ?? 0, label: 'Public Resources',     id: 'RSRC' },
                ].map(({ n, label, id }, i) => (
                  <div key={id} style={{
                    display: 'flex', alignItems: 'baseline', gap: 20,
                    padding: '16px 0',
                    borderBottom: i < 2 ? '1px solid var(--border-subtle)' : 'none',
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-cormorant), Georgia, serif',
                      fontSize: 52, fontWeight: 300, lineHeight: 1,
                      letterSpacing: '-0.02em', color: 'var(--text-primary)',
                      minWidth: 80,
                    }}>
                      {n}
                    </span>
                    <div>
                      <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 2 }}>{label}</div>
                      <div style={{ fontFamily: 'monospace', fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.15em' }}>
                        REF — {id}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── ARCHIVE HIGHLIGHTS ────────────────────────────────────────────
            Editorial layout. Classification marks. Artifact aesthetic.
        ─────────────────────────────────────────────────────────────────── */}
        {trending.length > 0 && (
          <section style={{ padding: '0 72px 100px', maxWidth: 1200, margin: '0 auto' }}>

            {/* Section divider — monospace classification */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 16, marginBottom: 56,
              paddingTop: 0,
            }}>
              <div style={{ fontFamily: 'monospace', fontSize: 9, color: 'var(--accent)', letterSpacing: '0.2em', opacity: 0.7 }}>
                SECTION 02
              </div>
              <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
              <div style={{ fontSize: 9, letterSpacing: '0.25em', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 500 }}>
                Archive Highlights
              </div>
              <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
              <Link href="/projects" style={{ fontFamily: 'monospace', fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.15em' }}>
                VIEW ALL →
              </Link>
            </div>

            {/* Editorial grid — asymmetric */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 20, marginBottom: 16 }}>
              {hero && <HeroProjectCard project={hero} archiveIndex={0} />}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {featured.map((p, i) => <SideProjectCard key={p.id} project={p} archiveIndex={i + 1} />)}
              </div>
            </div>

            {/* Bottom archive row */}
            {archive.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
                {archive.map((p, i) => <ArchiveCard key={p.id} project={p} archiveIndex={i + 4} />)}
              </div>
            )}
          </section>
        )}

        {/* Empty archive */}
        {trending.length === 0 && (
          <section style={{ padding: '0 72px 100px', maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ padding: '100px 40px', textAlign: 'center', borderTop: '1px solid var(--border-subtle)' }}>
              <div style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 36, fontWeight: 300, color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: 20 }}>
                The archive awaits its first work.
              </div>
              <Link href="/projects/submit" style={{ fontSize: 13, color: 'var(--accent)', borderBottom: '1px solid rgba(201,151,58,0.3)', paddingBottom: 2 }}>
                Be the first to submit →
              </Link>
            </div>
          </section>
        )}

        {/* ── INTERLUDE — editorial statement ──────────────────────────────
            Visual pause. Large italic serif. Breathing space.
            The page needs silence between sections.
        ─────────────────────────────────────────────────────────────────── */}
        <section style={{
          padding: '80px 72px',
          borderTop: '1px solid var(--border-subtle)',
          borderBottom: '1px solid var(--border-subtle)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: '50vw', height: '200px',
            background: 'radial-gradient(ellipse, rgba(201,151,58,0.04) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: 'monospace', fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.2em', marginBottom: 20 }}>
                SECTION 03 — ABOUT THE ARCHIVE
              </div>
              <blockquote style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 'clamp(28px, 3.5vw, 44px)',
                fontWeight: 300, fontStyle: 'italic',
                color: 'var(--text-secondary)', lineHeight: 1.3,
                letterSpacing: '-0.01em', margin: 0,
              }}>
                &ldquo;Every project submitted is a letter to the next generation.&rdquo;
              </blockquote>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {[
                { icon: '◫', title: 'Permanently archived', desc: 'Projects survive long after their creators graduate.' },
                { icon: '◈', title: 'Built upon', desc: 'Future students extend your work through the build-on system.' },
                { icon: '◎', title: 'Attributed', desc: 'Full credit — solo or team, with faculty guide.' },
              ].map(({ icon, title, desc }) => (
                <div key={title} style={{ display: 'flex', gap: 14 }}>
                  <div style={{ fontSize: 18, color: 'var(--accent)', opacity: 0.7, flexShrink: 0, marginTop: 2 }}>{icon}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', marginBottom: 3 }}>{title}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── LIVING KNOWLEDGE — assignments ───────────────────────────────
            Quieter. Typographic. Monospace classification marks.
        ─────────────────────────────────────────────────────────────────── */}
        {assignments.length > 0 && (
          <section style={{ padding: '80px 72px 100px', maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 48 }}>
              <div style={{ fontFamily: 'monospace', fontSize: 9, color: 'var(--accent)', letterSpacing: '0.2em', opacity: 0.7 }}>
                SECTION 04
              </div>
              <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
              <div style={{ fontSize: 9, letterSpacing: '0.25em', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 500 }}>
                Living Knowledge
              </div>
              <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
              <Link href="/assignments" style={{ fontFamily: 'monospace', fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.15em' }}>
                FULL LIBRARY →
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 12 }}>
              {assignments.map(a => <AssignmentCard key={a.id} assignment={a} />)}
            </div>
          </section>
        )}

        {/* ── CLOSING ───────────────────────────────────────────────────────
            Spacious. Final resonance.
        ─────────────────────────────────────────────────────────────────── */}
        <section style={{
          padding: '120px 72px 140px',
          borderTop: '1px solid var(--border-subtle)',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Glow behind the closing */}
          <div aria-hidden style={{
            position: 'absolute', bottom: '-20%', right: '-5%',
            width: '50vw', height: '50vh',
            background: 'radial-gradient(ellipse, rgba(201,151,58,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 40 }}>
            <div>
              <div style={{ fontFamily: 'monospace', fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.2em', marginBottom: 20 }}>
                FORGE — KNOWLEDGE PRESERVATION SYSTEM
              </div>
              <h2 style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 'clamp(40px, 6vw, 80px)',
                fontWeight: 300, letterSpacing: '-0.03em',
                color: 'var(--text-primary)', lineHeight: 1,
                marginBottom: 12,
              }}>
                Your work belongs
              </h2>
              <h2 style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 'clamp(40px, 6vw, 80px)',
                fontWeight: 300, fontStyle: 'italic', letterSpacing: '-0.03em',
                color: 'var(--text-muted)', lineHeight: 1,
              }}>
                in the archive.
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-end' }}>
              <Link href="/projects/submit" style={{
                padding: '13px 32px', borderRadius: 99,
                border: '1px solid var(--accent)', background: 'transparent',
                fontSize: 13, color: 'var(--accent)',
                fontWeight: 500, letterSpacing: '0.04em',
                transition: 'all 0.3s',
              }}>
                Submit your work
              </Link>
              <Link href="/docs" style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                About Forge
              </Link>
              <div style={{ fontFamily: 'monospace', fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.15em', marginTop: 8 }}>
                ITM UNIVERSITY · RAIPUR · EST. 2002
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
