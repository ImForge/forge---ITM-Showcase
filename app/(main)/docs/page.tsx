// About Forge — emotional narrative, not feature explanation
// Structure: Problem → Loss → Why it matters → Vision → The System → Future → CTA
// Tone: archival institution, almost memorial, then hopeful
import Link from 'next/link'

export const metadata = {
  title: 'About · Forge',
  description: 'Most student work disappears. Forge exists so it doesn\'t.',
}

export default function AboutPage() {
  return (
    <div style={{ width: '100%', background: 'var(--bg-base)', position: 'relative', overflowX: 'hidden' }}>

      {/* Atmosphere */}
      <style>{`
        @keyframes slowDrift {
          0%, 100% { transform: translate(0,0); }
          50% { transform: translate(3%, 4%); }
        }
        @keyframes fadeUpDoc {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .doc-fade { animation: fadeUpDoc 1s cubic-bezier(0.22,1,0.36,1) both; }
        .doc-fade-2 { animation: fadeUpDoc 1s cubic-bezier(0.22,1,0.36,1) 0.2s both; }
        .doc-fade-3 { animation: fadeUpDoc 1s cubic-bezier(0.22,1,0.36,1) 0.4s both; }
      `}</style>

      <div aria-hidden style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-20vh', left: '-10vw', width: '60vw', height: '60vh', background: 'radial-gradient(ellipse, rgba(201,151,58,0.06) 0%, transparent 70%)', animation: 'slowDrift 30s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', bottom: '-10vh', right: '-5vw', width: '40vw', height: '40vh', background: 'radial-gradient(ellipse, rgba(60,80,200,0.04) 0%, transparent 70%)', animation: 'slowDrift 40s ease-in-out infinite reverse' }} />
        <div style={{ position: 'absolute', inset: '-50%', width: '200%', height: '200%', backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 512 512\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.04\'/%3E%3C/svg%3E")', backgroundSize: '256px 256px', opacity: 0.5 }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* ── SECTION 1: THE PROBLEM ────────────────────────────────────────
            The emotional entry point. No preamble. Direct.
            Let the reader feel it before we explain anything.
        ──────────────────────────────────────────────────────────────────── */}
        <section style={{
          minHeight: '85vh',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: 'clamp(40px,8vw,120px) clamp(20px,6vw,72px) 80px',
          position: 'relative',
          maxWidth: 1100, margin: '0 auto',
        }}>
          {/* Archive label */}
          <div className="doc-fade" style={{
            fontFamily: 'monospace', fontSize: 9,
            color: 'var(--text-muted)', letterSpacing: '0.22em',
            textTransform: 'uppercase', marginBottom: 60,
            display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <span>About Forge</span>
            <div style={{ width: 40, height: '1px', background: 'var(--border-subtle)' }} />
            <span style={{ color: 'var(--accent)', opacity: 0.6 }}>ITM University · Raipur</span>
          </div>

          {/* The opening statement — big, blunt, true */}
          <div className="doc-fade-2">
            <h1 style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(56px, 9vw, 110px)',
              fontWeight: 400, lineHeight: 0.92,
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)',
              marginBottom: 0,
            }}>
              Most student work
            </h1>
            <h1 style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(56px, 9vw, 110px)',
              fontWeight: 300, fontStyle: 'italic',
              lineHeight: 0.92, letterSpacing: '-0.03em',
              color: 'var(--text-secondary)',
              marginBottom: 60,
            }}>
              disappears.
            </h1>
          </div>

          {/* The expansion — quiet, heavy */}
          <div className="doc-fade-3" style={{ maxWidth: 520 }}>
            <p style={{
              fontSize: 18, color: 'var(--text-secondary)',
              lineHeight: 1.8, fontWeight: 300,
              marginBottom: 0,
            }}>
              Projects that took months. Research built over sleepless nights.
              Ideas that could have inspired someone who came after.
            </p>
          </div>
        </section>

        {/* ── SECTION 2: THE LOSS ───────────────────────────────────────────
            Show what actually happens. Specific. Familiar. Quiet tragedy.
        ──────────────────────────────────────────────────────────────────── */}
        <section style={{
          padding: 'clamp(40px,6vw,80px) clamp(20px,6vw,72px) 100px',
          borderTop: '1px solid var(--border-subtle)',
          maxWidth: 1100, margin: '0 auto',
        }}>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(24px,5vw,80px)',
            alignItems: 'start',
          }}>
            {/* Left — the quiet tragedy */}
            <div>
              <div style={{ fontFamily: 'monospace', fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.2em', marginBottom: 36 }}>
                01 — THE LOSS
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                {[
                  'Hard drives get wiped.',
                  'GitHub repositories go private.',
                  'Links die after graduation.',
                  'Teams disband. Files scatter.',
                  'Student email accounts expire.',
                  'And every year, an entire batch\u2019s worth of work is forgotten.',
                ].map((line, i) => (
                  <p key={i} style={{
                    fontFamily: i === 5 ? 'var(--font-cormorant), Georgia, serif' : 'inherit',
                    fontSize: i === 5 ? 'clamp(22px, 2.5vw, 30px)' : 15,
                    fontWeight: i === 5 ? 300 : 300,
                    fontStyle: i === 5 ? 'italic' : 'normal',
                    color: i === 5 ? 'var(--text-primary)' : 'var(--text-muted)',
                    lineHeight: 1.6, margin: 0,
                  }}>
                    {line}
                  </p>
                ))}
              </div>
            </div>

            {/* Right — the scale */}
            <div style={{ paddingTop: 48 }}>
              <blockquote style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 'clamp(28px, 3.5vw, 44px)',
                fontWeight: 300, fontStyle: 'italic',
                color: 'var(--text-secondary)',
                lineHeight: 1.3, letterSpacing: '-0.01em',
                margin: 0, marginBottom: 40,
                borderLeft: '1px solid var(--accent)',
                paddingLeft: 28,
              }}>
                &ldquo;Knowledge shouldn&apos;t expire with a student email.&rdquo;
              </blockquote>
              <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.8, fontWeight: 300 }}>
                At ITM University, every graduating batch leaves behind hundreds
                of projects. The vast majority of them vanish. Not because
                the work wasn&apos;t good enough — but because there was nowhere
                permanent to put them.
              </p>
            </div>
          </div>
        </section>

        {/* ── SECTION 3: THE VISION ─────────────────────────────────────────
            Introduce Forge. Not as a product. As a response.
        ──────────────────────────────────────────────────────────────────── */}
        <section style={{
          padding: 'clamp(48px,8vw,100px) clamp(20px,6vw,72px)',
          borderTop: '1px solid var(--border-subtle)',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Large watermark */}
          <div aria-hidden style={{
            position: 'absolute', right: '-5%', top: '50%',
            transform: 'translateY(-50%)',
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: 'clamp(200px, 30vw, 380px)',
            fontWeight: 300, fontStyle: 'italic',
            color: 'rgba(201,151,58,0.025)',
            letterSpacing: '-0.05em',
            lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
          }}>
            Forge
          </div>

          <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <div style={{ fontFamily: 'monospace', fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.2em', marginBottom: 48 }}>
              02 — THE RESPONSE
            </div>
            <div style={{ maxWidth: 640 }}>
              <h2 style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 'clamp(40px, 5.5vw, 72px)',
                fontWeight: 400, lineHeight: 1.0,
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
                marginBottom: 48,
              }}>
                Forge is the university remembering itself.
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {[
                  'A permanent archive for every project built at ITM University.',
                  'Not uploads. Not a portfolio site.',
                  'A living institutional memory — where student work survives graduation, outlasts student emails, and waits patiently for whoever comes next.',
                ].map((text, i) => (
                  <p key={i} style={{
                    fontSize: i === 2 ? 15 : 16,
                    color: i === 1 ? 'var(--accent)' : 'var(--text-secondary)',
                    lineHeight: 1.8, fontWeight: 300,
                    margin: 0,
                  }}>
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 4: THE SYSTEM — Build-on ─────────────────────────────
            The gold mine. Ideas surviving through generations.
            Visual: a knowledge family tree, described in words.
        ──────────────────────────────────────────────────────────────────── */}
        <section style={{
          padding: 'clamp(48px,8vw,100px) clamp(20px,6vw,72px)',
          borderTop: '1px solid var(--border-subtle)',
          background: 'linear-gradient(180deg, transparent, rgba(201,151,58,0.02) 50%, transparent)',
        }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ fontFamily: 'monospace', fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.2em', marginBottom: 48 }}>
              03 — THE SYSTEM
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(24px,5vw,80px)', alignItems: 'start' }}>

              {/* Left — the concept */}
              <div>
                <h2 style={{
                  fontFamily: 'var(--font-cormorant), Georgia, serif',
                  fontSize: 'clamp(36px, 4.5vw, 58px)',
                  fontWeight: 400, lineHeight: 1.0,
                  letterSpacing: '-0.02em', marginBottom: 28,
                }}>
                  Ideas don&apos;t have to start from zero.
                </h2>
                <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.9, marginBottom: 20, fontWeight: 300 }}>
                  When you submit a project that builds on someone else&apos;s
                  work — an AI tool extended, a system redesigned, a thesis
                  continued — you can credit the original.
                </p>
                <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.9, marginBottom: 20, fontWeight: 300 }}>
                  This creates a visible chain. A lineage of ideas.
                  A family tree of student knowledge — branching, growing,
                  compounding across years and batches.
                </p>
                <p style={{
                  fontFamily: 'var(--font-cormorant), Georgia, serif',
                  fontSize: 'clamp(20px, 2.2vw, 26px)',
                  fontWeight: 300, fontStyle: 'italic',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.5,
                }}>
                  Academic citation, but for code. For projects. For student work.
                </p>
              </div>

              {/* Right — visual lineage tree */}
              <div style={{ paddingTop: 8 }}>
                <div style={{ fontFamily: 'monospace', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: 24, opacity: 0.6 }}>
                  KNOWLEDGE LINEAGE — EXAMPLE
                </div>
                {/* Tree visualization — typographic */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {[
                    { indent: 0, year: '2022', title: 'Basic Attendance System',    sub: 'Batch of 2022 · CSE',          origin: true },
                    { indent: 1, year: '2023', title: 'ML-Based Face Detection',    sub: 'Built on ↑ · Batch of 2023',   origin: false },
                    { indent: 2, year: '2024', title: 'Real-Time AI Attendance',    sub: 'Built on ↑ · Batch of 2024',   origin: false },
                    { indent: 2, year: '2024', title: 'Attendance Analytics Dashboard', sub: 'Built on ↑ · Batch of 2024', origin: false },
                    { indent: 3, year: '2025', title: 'Automated HR Integration',   sub: 'Built on ↑ · Batch of 2025',   origin: false },
                  ].map((node, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 0 }}>
                      {/* Tree connector lines */}
                      {node.indent > 0 && (
                        <div style={{ display: 'flex', alignItems: 'flex-start', flexShrink: 0 }}>
                          {Array.from({ length: node.indent }).map((_, li) => (
                            <div key={li} style={{ width: 24, position: 'relative', alignSelf: 'stretch' }}>
                              {li < node.indent - 1 && (
                                <div style={{ position: 'absolute', left: 11, top: 0, bottom: 0, width: 1, background: 'var(--border-subtle)' }} />
                              )}
                              {li === node.indent - 1 && (
                                <>
                                  <div style={{ position: 'absolute', left: 11, top: 0, height: 20, width: 1, background: 'var(--border-subtle)' }} />
                                  <div style={{ position: 'absolute', left: 11, top: 20, width: 13, height: 1, background: 'var(--border-subtle)' }} />
                                </>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                      {/* Node */}
                      <div style={{
                        flex: 1, padding: '12px 14px',
                        marginBottom: 6, borderRadius: 10,
                        background: node.origin ? 'var(--accent-light)' : 'var(--bg-surface)',
                        border: `1px solid ${node.origin ? 'rgba(201,151,58,0.25)' : 'var(--border-subtle)'}`,
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                          <div style={{
                            fontSize: 13, fontWeight: 500,
                            color: node.origin ? 'var(--accent)' : 'var(--text-primary)',
                            lineHeight: 1.3,
                          }}>
                            {node.title}
                          </div>
                          <div style={{ fontFamily: 'monospace', fontSize: 9, color: 'var(--text-muted)', flexShrink: 0 }}>
                            {node.year}
                          </div>
                        </div>
                        <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 3, letterSpacing: '0.04em' }}>
                          {node.sub}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ fontFamily: 'monospace', fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.1em', marginTop: 16, opacity: 0.5 }}>
                  ONE IDEA · THREE YEARS · FIVE PROJECTS
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 5: THE FUTURE ─────────────────────────────────────────
            What becomes possible. Hopeful after the grief.
        ──────────────────────────────────────────────────────────────────── */}
        <section style={{
          padding: 'clamp(48px,8vw,100px) clamp(20px,6vw,72px)',
          borderTop: '1px solid var(--border-subtle)',
        }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ fontFamily: 'monospace', fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.2em', marginBottom: 48 }}>
              04 — THE FUTURE
            </div>

            <h2 style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(44px, 6vw, 80px)',
              fontWeight: 400, lineHeight: 0.92,
              letterSpacing: '-0.03em', marginBottom: 12,
              color: 'var(--text-primary)',
            }}>
              What if every batch
            </h2>
            <h2 style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(44px, 6vw, 80px)',
              fontWeight: 300, fontStyle: 'italic',
              lineHeight: 0.92, letterSpacing: '-0.03em',
              color: 'var(--text-secondary)', marginBottom: 72,
            }}>
              could build on the last?
            </h2>

            {/* Three futures */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 40 }}>
              {[
                {
                  num: '01',
                  title: 'No more starting from scratch.',
                  body: 'A first-year student arrives. Instead of building a basic attendance system again, they find one already archived — and extend it into something new.',
                },
                {
                  num: '02',
                  title: 'Faculty can trace intellectual lineage.',
                  body: 'A professor sees three years of students building on each other\'s work. The archive reveals how ideas evolve across batches they\'ll never meet in the same classroom.',
                },
                {
                  num: '03',
                  title: 'The university accumulates knowledge.',
                  body: 'Instead of resetting every year, ITM becomes an institution with memory. Twenty years from now, the archive contains the entire intellectual output of every student who passed through.',
                },
              ].map(({ num, title, body }) => (
                <div key={num} style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 28 }}>
                  <div style={{ fontFamily: 'monospace', fontSize: 9, color: 'var(--accent)', letterSpacing: '0.15em', marginBottom: 16, opacity: 0.7 }}>
                    {num}
                  </div>
                  <h3 style={{
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: 24, fontWeight: 400, lineHeight: 1.2,
                    color: 'var(--text-primary)', marginBottom: 16,
                  }}>
                    {title}
                  </h3>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.8, fontWeight: 300 }}>
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 6: WHAT FORGE IS ──────────────────────────────────────
            Precise. What it is. What it isn't.
        ──────────────────────────────────────────────────────────────────── */}
        <section style={{
          padding: '80px 72px',
          borderTop: '1px solid var(--border-subtle)',
          background: 'linear-gradient(180deg, transparent, rgba(201,151,58,0.015) 50%, transparent)',
        }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(24px,5vw,80px)' }}>
              <div>
                <div style={{ fontFamily: 'monospace', fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.2em', marginBottom: 28 }}>
                  WHAT FORGE IS
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    'A permanent academic archive.',
                    'A knowledge preservation system.',
                    'A place for solo work and team work — equally.',
                    'A lineage of ideas across generations.',
                    'The institutional memory of ITM University.',
                  ].map((line, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
                      <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--accent)', opacity: 0.6, flexShrink: 0, marginBottom: 2 }} />
                      <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.6, fontWeight: 300, margin: 0 }}>{line}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontFamily: 'monospace', fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.2em', marginBottom: 28 }}>
                  WHAT FORGE IS NOT
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    'A portfolio site.',
                    'A social network.',
                    'A grading platform.',
                    'A temporary showcase.',
                    'Something that disappears when you graduate.',
                  ].map((line, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
                      <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--border)', flexShrink: 0, marginBottom: 2 }} />
                      <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.6, fontWeight: 300, margin: 0, textDecoration: 'line-through', textDecorationColor: 'var(--border)' }}>{line}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 7: CTA ────────────────────────────────────────────────
            Emotional. Not functional.
            "Leave something behind." Not "Submit Project."
        ──────────────────────────────────────────────────────────────────── */}
        <section style={{
          padding: 'clamp(60px,10vw,140px) clamp(20px,6vw,72px) clamp(60px,10vw,160px)',
          borderTop: '1px solid var(--border-subtle)',
          position: 'relative', overflow: 'hidden',
          textAlign: 'center',
        }}>
          {/* Glow */}
          <div aria-hidden style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '60vw', height: '60vh', background: 'radial-gradient(ellipse, rgba(201,151,58,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: 680, margin: '0 auto' }}>
            <div style={{ fontFamily: 'monospace', fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.2em', marginBottom: 40 }}>
              05 — THE INVITATION
            </div>
            <h2 style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(48px, 7vw, 88px)',
              fontWeight: 400, lineHeight: 0.92,
              letterSpacing: '-0.03em', marginBottom: 12,
              color: 'var(--text-primary)',
            }}>
              Leave something
            </h2>
            <h2 style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(48px, 7vw, 88px)',
              fontWeight: 300, fontStyle: 'italic',
              lineHeight: 0.92, letterSpacing: '-0.03em',
              color: 'var(--text-secondary)', marginBottom: 60,
            }}>
              future students can build on.
            </h2>

            <p style={{
              fontSize: 17, color: 'var(--text-muted)',
              lineHeight: 1.8, fontWeight: 300,
              maxWidth: 440, margin: '0 auto 52px',
            }}>
              Your work deserves to outlive the semester.
              The knowledge you built here belongs to every
              ITM student who comes after you.
            </p>

            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/projects/submit" style={{
                padding: '14px 36px', borderRadius: 99,
                border: '1px solid var(--accent)',
                background: 'transparent',
                fontSize: 14, color: 'var(--accent)',
                fontWeight: 500, letterSpacing: '0.05em',
                transition: 'all 0.3s',
              }}>
                Preserve your work
              </Link>
              <Link href="/projects" style={{
                padding: '14px 32px', borderRadius: 99,
                border: '1px solid var(--border-subtle)',
                background: 'transparent',
                fontSize: 14, color: 'var(--text-muted)',
                letterSpacing: '0.04em',
                transition: 'all 0.3s',
              }}>
                Explore the archive
              </Link>
            </div>

            {/* Final inscription */}
            <div style={{ fontFamily: 'monospace', fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.18em', marginTop: 80, opacity: 0.4 }}>
              FORGE — KNOWLEDGE PRESERVATION SYSTEM · ITM UNIVERSITY RAIPUR · EST. 2002
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
