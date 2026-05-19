// Homepage — fully responsive
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import type { ProjectWithRelations, AssignmentWithProfile } from '@/lib/types/database'
import Greeting from '@/components/ui/Greeting'
import { HeroProjectCard, SideProjectCard, ArchiveCard, AssignmentCard } from '@/components/ui/TrendingCard'

export const metadata = { title: 'Forge — Knowledge doesn\'t graduate.' }

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
    .eq('status', 'approved').order('star_count', { ascending: false }).limit(7)
  const trending = (trendingRaw as unknown as ProjectWithRelations[]) ?? []

  const { data: assignmentsRaw } = await supabase
    .from('assignments').select('*, profiles(id,username,avatar_url,full_name)')
    .eq('is_public', true).order('created_at', { ascending: false }).limit(4)
  const assignments = (assignmentsRaw as unknown as AssignmentWithProfile[]) ?? []

  const hero = trending[0]
  const featured = trending.slice(1, 4)
  const archive = trending.slice(4)

  return (
    <div style={{ width: '100%', background: 'var(--bg-base)', position: 'relative', overflowX: 'hidden' }}>
      <style>{`
        @keyframes driftA { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(4%,3%) scale(1.06)} 66%{transform:translate(-3%,5%) scale(0.96)} }
        @keyframes driftB { 0%,100%{transform:translate(0,0) scale(1)} 40%{transform:translate(-5%,-4%) scale(1.08)} 70%{transform:translate(3%,-2%) scale(0.94)} }
        @keyframes grain { 0%,100%{transform:translate(0,0)} 10%{transform:translate(-2%,-3%)} 20%{transform:translate(3%,2%)} 30%{transform:translate(-1%,4%)} 40%{transform:translate(4%,-1%)} 50%{transform:translate(-3%,3%)} 60%{transform:translate(2%,-4%)} 70%{transform:translate(-4%,1%)} 80%{transform:translate(3%,4%)} 90%{transform:translate(-2%,-2%)} }
        @keyframes pulse { 0%,100%{opacity:0.6} 50%{opacity:1} }
        @keyframes heroFloat { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-12px)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
        .animate-hero { animation: fadeUp 1s cubic-bezier(0.22,1,0.36,1) both; }
        .animate-hero-2 { animation: fadeUp 1s cubic-bezier(0.22,1,0.36,1) 0.15s both; }
        .animate-hero-3 { animation: fadeUp 1s cubic-bezier(0.22,1,0.36,1) 0.3s both; }

        /* ── RESPONSIVE ── */
        .hero-section { padding: 80px 72px 0; }
        .hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: end; }
        .stats-row { display: flex; gap: 64px; padding-top: 48px; padding-bottom: 80px; border-top: 1px solid var(--border-subtle); flex-wrap: wrap; }
        .section-pad { padding: 0 72px 100px; }
        .section-pad-both { padding: 80px 72px; }
        .archive-grid { display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 20px; margin-bottom: 16px; }
        .archive-bottom { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 14px; }
        .assignments-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 12px; }
        .interlude-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        .closing-row { display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 40px; }

        @media (max-width: 768px) {
          .hero-section { padding: 40px 20px 0; }
          .hero-grid { grid-template-columns: 1fr; gap: 32px; }
          .stats-row { gap: 24px; padding-top: 32px; padding-bottom: 48px; }
          .section-pad { padding: 0 20px 60px; }
          .section-pad-both { padding: 48px 20px; }
          .archive-grid { grid-template-columns: 1fr; }
          .archive-bottom { grid-template-columns: 1fr; }
          .assignments-grid { grid-template-columns: 1fr; }
          .interlude-grid { grid-template-columns: 1fr; gap: 32px; }
          .closing-row { flex-direction: column; align-items: flex-start; }
          .hero-k { display: none; }
        }
      `}</style>

      {/* Atmosphere */}
      <div aria-hidden style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-30vh', left: '-15vw', width: '80vw', height: '80vh', background: 'radial-gradient(ellipse, rgba(201,151,58,0.09) 0%, transparent 65%)', animation: 'driftA 22s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', bottom: '-20vh', right: '-10vw', width: '60vw', height: '60vh', background: 'radial-gradient(ellipse, rgba(60,80,200,0.05) 0%, transparent 65%)', animation: 'driftB 28s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', inset: '-50%', width: '200%', height: '200%', backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 512 512\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.05\'/%3E%3C/svg%3E")', backgroundSize: '256px 256px', animation: 'grain 8s steps(1) infinite', opacity: 0.6 }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* HERO */}
        <section className="hero-section" style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden', maxWidth: 1200, margin: '0 auto' }}>
          {/* Giant K — hidden on mobile */}
          <div className="hero-k" aria-hidden style={{ position: 'absolute', top: '50%', left: '-5%', transform: 'translateY(-50%)', fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(300px, 55vw, 700px)', fontWeight: 300, fontStyle: 'italic', lineHeight: 0.85, color: 'rgba(201,151,58,0.032)', letterSpacing: '-0.06em', userSelect: 'none', pointerEvents: 'none', animation: 'heroFloat 18s ease-in-out infinite', zIndex: 0 }}>K</div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Status label */}
            <div className="animate-hero" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32, flexWrap: 'wrap' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', animation: 'pulse 2.4s ease-in-out infinite', boxShadow: '0 0 8px rgba(201,151,58,0.5)', flexShrink: 0 }} />
              <span style={{ fontFamily: 'monospace', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                ITM University · Student Archive · Active
              </span>
              <div style={{ flex: 1, minWidth: 40, height: '1px', background: 'linear-gradient(90deg, var(--border-subtle), transparent)' }} />
              <Greeting hasUser={!!user} />
            </div>

            {/* Headline */}
            <div className="animate-hero-2">
              <h1 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(56px, 12vw, 150px)', fontWeight: 400, lineHeight: 0.88, color: 'var(--text-primary)', letterSpacing: '-0.04em', marginBottom: 0 }}>
                Knowledge
              </h1>
              <h1 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(56px, 12vw, 150px)', fontWeight: 300, fontStyle: 'italic', lineHeight: 0.88, letterSpacing: '-0.04em', color: 'var(--text-secondary)', marginBottom: 32 }}>
                doesn&apos;t graduate.
              </h1>
            </div>

            {/* Two col below headline — stacks on mobile */}
            <div className="animate-hero-3 hero-grid">
              <div>
                <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.8, fontWeight: 300, marginBottom: 28 }}>
                  Every project built at ITM University Raipur is preserved here permanently — available for every future student to discover and build upon.
                </p>
                <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
                  <Link href="/projects/submit" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 24px', borderRadius: 99, border: '1px solid var(--accent)', background: 'transparent', fontSize: 13, color: 'var(--accent)', fontWeight: 500, letterSpacing: '0.04em' }}>
                    Submit your work
                  </Link>
                  <Link href="/projects" style={{ fontSize: 13, color: 'var(--text-muted)', letterSpacing: '0.04em' }}>
                    Browse archive →
                  </Link>
                </div>
              </div>

              {/* Stats */}
              <div className="stats-row" style={{ paddingTop: 0, paddingBottom: 0, borderTop: 'none', flexWrap: 'wrap' }}>
                {[
                  { n: projectCount ?? 0,    label: 'Works Preserved'     },
                  { n: teamCount ?? 0,       label: 'Collectives'         },
                  { n: assignmentCount ?? 0, label: 'Public Resources'    },
                ].map(({ n, label }) => (
                  <div key={label}>
                    <div style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 300, lineHeight: 1, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>{n}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: 6 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ARCHIVE HIGHLIGHTS */}
        {trending.length > 0 && (
          <section className="section-pad" style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40, flexWrap: 'wrap' }}>
              <div style={{ fontFamily: 'monospace', fontSize: 9, color: 'var(--accent)', letterSpacing: '0.2em', opacity: 0.7 }}>SECTION 02</div>
              <div style={{ flex: 1, minWidth: 20, height: '1px', background: 'var(--border-subtle)' }} />
              <div style={{ fontSize: 9, letterSpacing: '0.25em', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 500 }}>Archive Highlights</div>
              <div style={{ flex: 1, minWidth: 20, height: '1px', background: 'var(--border-subtle)' }} />
              <Link href="/projects" style={{ fontFamily: 'monospace', fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.15em' }}>VIEW ALL →</Link>
            </div>

            <div className="archive-grid">
              {hero && <HeroProjectCard project={hero} archiveIndex={0} />}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {featured.map((p, i) => <SideProjectCard key={p.id} project={p} archiveIndex={i + 1} />)}
              </div>
            </div>

            {archive.length > 0 && (
              <div className="archive-bottom">
                {archive.map((p, i) => <ArchiveCard key={p.id} project={p} archiveIndex={i + 4} />)}
              </div>
            )}
          </section>
        )}

        {trending.length === 0 && (
          <section className="section-pad" style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ padding: '80px 20px', textAlign: 'center', borderTop: '1px solid var(--border-subtle)' }}>
              <div style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 32, fontWeight: 300, color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: 20 }}>The archive awaits its first work.</div>
              <Link href="/projects/submit" style={{ fontSize: 13, color: 'var(--accent)', borderBottom: '1px solid rgba(201,151,58,0.3)', paddingBottom: 2 }}>Be the first to submit →</Link>
            </div>
          </section>
        )}

        {/* INTERLUDE */}
        <section className="section-pad-both" style={{ borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div className="interlude-grid">
              <div>
                <div style={{ fontFamily: 'monospace', fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.2em', marginBottom: 24 }}>SECTION 03 — ABOUT THE ARCHIVE</div>
                <blockquote style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(22px, 3.5vw, 44px)', fontWeight: 300, fontStyle: 'italic', color: 'var(--text-secondary)', lineHeight: 1.3, letterSpacing: '-0.01em', margin: 0 }}>
                  &ldquo;Every project submitted is a letter to the next generation.&rdquo;
                </blockquote>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {[
                  { icon: '◫', title: 'Permanently archived', desc: 'Projects survive long after their creators graduate.' },
                  { icon: '◈', title: 'Built upon', desc: 'Future students extend your work through the build-on system.' },
                  { icon: '◎', title: 'Attributed', desc: 'Full credit — solo or team, with faculty guide.' },
                ].map(({ icon, title, desc }) => (
                  <div key={title} style={{ display: 'flex', gap: 14 }}>
                    <div style={{ fontSize: 18, color: 'var(--accent)', opacity: 0.7, flexShrink: 0 }}>{icon}</div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', marginBottom: 3 }}>{title}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6 }}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* LIVING KNOWLEDGE */}
        {assignments.length > 0 && (
          <section className="section-pad-both" style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 36, flexWrap: 'wrap' }}>
              <div style={{ fontFamily: 'monospace', fontSize: 9, color: 'var(--accent)', letterSpacing: '0.2em', opacity: 0.7 }}>SECTION 04</div>
              <div style={{ flex: 1, minWidth: 20, height: '1px', background: 'var(--border-subtle)' }} />
              <div style={{ fontSize: 9, letterSpacing: '0.25em', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 500 }}>Living Knowledge</div>
              <div style={{ flex: 1, minWidth: 20, height: '1px', background: 'var(--border-subtle)' }} />
              <Link href="/assignments" style={{ fontFamily: 'monospace', fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.15em' }}>FULL LIBRARY →</Link>
            </div>
            <div className="assignments-grid">
              {assignments.map(a => <AssignmentCard key={a.id} assignment={a} />)}
            </div>
          </section>
        )}

        {/* CLOSING */}
        <section className="section-pad-both" style={{ borderTop: '1px solid var(--border-subtle)', padding: '80px 20px 100px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div className="closing-row">
              <div>
                <div style={{ fontFamily: 'monospace', fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.2em', marginBottom: 20 }}>FORGE — KNOWLEDGE PRESERVATION SYSTEM</div>
                <h2 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(32px, 6vw, 80px)', fontWeight: 300, letterSpacing: '-0.03em', color: 'var(--text-primary)', lineHeight: 1, marginBottom: 8 }}>Your work belongs</h2>
                <h2 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(32px, 6vw, 80px)', fontWeight: 300, fontStyle: 'italic', letterSpacing: '-0.03em', color: 'var(--text-muted)', lineHeight: 1 }}>in the archive.</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
                <Link href="/projects/submit" style={{ padding: '13px 32px', borderRadius: 99, border: '1px solid var(--accent)', background: 'transparent', fontSize: 13, color: 'var(--accent)', fontWeight: 500, letterSpacing: '0.04em' }}>Submit your work</Link>
                <Link href="/docs" style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>About Forge</Link>
                <div style={{ fontFamily: 'monospace', fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.15em', marginTop: 8 }}>ITM UNIVERSITY · RAIPUR · EST. 2002</div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
