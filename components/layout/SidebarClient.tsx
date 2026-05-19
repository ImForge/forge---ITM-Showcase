'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { Profile } from '@/lib/types/database'

type Props = {
  profile: Profile | null
  pendingInvitations: number
}

const NAV_ITEMS = [
  { href: '/',             label: 'Home',        icon: '⌂' },
  { href: '/projects',     label: 'Projects',    icon: '◫' },
  { href: '/teams',        label: 'Teams',       icon: '◎' },
  { href: '/assignments',  label: 'Assignments', icon: '☰' },
  { href: '/build-on',      label: 'Build-on Tree', icon: '◈' },
]

// Defined OUTSIDE component — never redefine inside
function Avatar({ profile, size = 32 }: { profile: Profile | null; size?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      overflow: 'hidden', background: 'var(--bg-overlay)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.38, fontWeight: 500, color: 'var(--accent)',
      border: '1px solid var(--border)', flexShrink: 0,
    }}>
      {profile?.avatar_url
        ? <img src={profile.avatar_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        : (profile?.username?.[0]?.toUpperCase() ?? '?')}
    </div>
  )
}

export default function SidebarClient({ profile, pendingInvitations }: Props) {
  const pathname = usePathname()
  const [isMobile, setIsMobile] = useState<boolean | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)

  // JS-based mobile detection (never CSS media queries in Next.js)
  useEffect(() => {
    function check() { setIsMobile(window.innerWidth < 768) }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Load saved theme on mount
  useEffect(() => {
    const saved = localStorage.getItem('forge-theme')
    if (saved === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark')
      setIsDark(true)
    }
  }, [])

  // Close drawer on route change
  useEffect(() => { setDrawerOpen(false) }, [pathname])

  function toggleTheme() {
    const next = !isDark
    setIsDark(next)
    if (next) {
      document.documentElement.setAttribute('data-theme', 'dark')
      localStorage.setItem('forge-theme', 'dark')
    } else {
      document.documentElement.removeAttribute('data-theme')
      localStorage.setItem('forge-theme', 'light')
    }
  }

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  if (isMobile === null) return null

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  // ─── SIDEBAR CONTENT (shared between desktop and mobile drawer) ───
  function SidebarContent() {
    return (
      <div style={{
        width: 'var(--sidebar-width)', height: '100%',
        background: 'var(--sidebar-bg)',
        borderRight: '1px solid var(--sidebar-border)',
        display: 'flex', flexDirection: 'column',
        overflowY: 'auto',
        overflowX: 'hidden',
      }}>

        {/* Logo + Bell */}
        <div style={{
          padding: '24px 20px 20px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* ITM Logo — small, subtle */}
            <img
              src="/itm-logo.png"
              alt="ITM University"
              style={{
                width: 32, height: 32,
                objectFit: 'contain',
                opacity: 0.7,
                filter: 'var(--itm-logo-filter, none)',
                flexShrink: 0,
              }}
            />
            <div>
              <div style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 20, fontWeight: 600,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: 'var(--text-primary)',
                lineHeight: 1,
              }}>
                Forge
              </div>
              <div style={{ fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: 2 }}>
                ITM University
              </div>
            </div>
          </Link>

          <Link href="/teams" style={{ position: 'relative' }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: 'var(--bg-overlay)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 15, color: 'var(--text-secondary)',
              border: '1px solid var(--border-subtle)',
            }}>
              🔔
            </div>
            {pendingInvitations > 0 && (
              <div style={{
                position: 'absolute', top: -3, right: -3,
                width: 14, height: 14, borderRadius: '50%',
                background: 'var(--danger)', border: '2px solid var(--sidebar-bg)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 8, color: 'white', fontWeight: 700,
              }}>
                {pendingInvitations > 9 ? '9+' : pendingInvitations}
              </div>
            )}
          </Link>
        </div>

        {/* Nav */}
        <nav style={{ padding: '12px 10px', flex: '0 0 auto' }}>
          {NAV_ITEMS.map(({ href, label, icon }) => {
            const active = isActive(href)
            return (
              <Link key={href} href={href}
                className={`sidebar-link ${active ? 'active' : ''}`}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 12px', borderRadius: 8,
                  fontSize: 14, fontWeight: active ? 500 : 400,
                  color: active ? 'var(--accent)' : 'var(--text-secondary)',
                  marginBottom: 2, transition: 'all 0.15s',
                  borderLeft: active ? '2px solid var(--accent)' : '2px solid transparent',
                }}>
                <span style={{ fontSize: 15, opacity: 0.8 }}>{icon}</span>
                {label}
              </Link>
            )
          })}

          {profile?.role === 'admin' && (
            <Link href="/admin"
              className={`sidebar-link ${pathname.startsWith('/admin') ? 'active' : ''}`}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 12px', borderRadius: 8,
                fontSize: 14, fontWeight: pathname.startsWith('/admin') ? 500 : 400,
                color: pathname.startsWith('/admin') ? 'var(--accent)' : 'var(--text-secondary)',
                marginBottom: 2, transition: 'all 0.15s',
                borderLeft: pathname.startsWith('/admin') ? '2px solid var(--accent)' : '2px solid transparent',
              }}>
              <span style={{ fontSize: 15, opacity: 0.8 }}>⚙</span>
              Admin
            </Link>
          )}
        </nav>

        {/* Bottom */}
        <div style={{ borderTop: '1px solid var(--border-subtle)', padding: '10px 10px 12px' }}>
          <Link href="/docs" className="sidebar-link" style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '9px 12px', borderRadius: 8,
            fontSize: 13, color: 'var(--text-muted)', marginBottom: 6,
          }}>
            <span style={{ fontSize: 14 }}>ⓘ</span>
            About Forge
          </Link>

          {/* ─── DARK MODE TOGGLE ─── */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 12px', marginBottom: 8 }}>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              {isDark ? '🌙 Dark' : '☀️ Light'}
            </span>
            <button
              onClick={toggleTheme}
              style={{
                width: 36, height: 20, borderRadius: 99,
                background: isDark ? 'var(--accent)' : 'var(--border)',
                border: 'none', cursor: 'pointer',
                position: 'relative', transition: 'background 0.2s',
                flexShrink: 0,
              }}
            >
              <div style={{
                position: 'absolute', top: 3,
                left: isDark ? 18 : 3,
                width: 14, height: 14, borderRadius: '50%',
                background: 'white',
                transition: 'left 0.2s',
                boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
              }} />
            </button>
          </div>

          {/* Profile row */}
          {profile ? (
            <div
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '8px 10px', borderRadius: 8, cursor: 'pointer',
                transition: 'background 0.15s',
              }}
              onClick={() => window.location.href = `/profile/${profile.username}`}
            >
              <Avatar profile={profile} size={34} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {profile.full_name || profile.username}
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>@{profile.username}</div>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); handleLogout() }}
                title="Log out"
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: 'var(--text-muted)', padding: '4px' }}
              >
                ↩
              </button>
            </div>
          ) : (
            <Link href="/login" style={{
              display: 'block', padding: '10px 12px', borderRadius: 8,
              fontSize: 13, color: 'var(--accent)', fontWeight: 600,
              textAlign: 'center', background: 'var(--accent-dim)',
              border: '1px solid rgba(201,151,58,0.2)',
            }}>
              Sign In →
            </Link>
          )}
        </div>
      </div>
    )
  }

  // ─── MOBILE ───
  if (isMobile) {
    return (
      <>
        <div className="mobile-topbar">
          <button onClick={() => setDrawerOpen(true)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 20, color: 'var(--text-primary)', padding: 4,
          }}>
            ☰
          </button>
          <span style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: 18, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
          }}>
            Forge
          </span>
          {/* Avatar — tappable, goes to profile */}
          <div
            onClick={() => profile ? window.location.href = `/profile/${profile.username}` : window.location.href = '/login'}
            style={{ cursor: 'pointer' }}
          >
            <Avatar profile={profile} size={30} />
          </div>
        </div>
        {drawerOpen && (
          <>
            <div onClick={() => setDrawerOpen(false)} style={{
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
              zIndex: 300, backdropFilter: 'blur(3px)',
            }} />
            {/* Drawer — max 80% width on mobile so content is still visible */}
            <div className="animate-slide-in" style={{
              position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 400,
              height: '100vh', width: 'min(var(--sidebar-width), 80vw)',
            }}>
              <SidebarContent />
            </div>
          </>
        )}
      </>
    )
  }

  // ─── DESKTOP ───
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, bottom: 0, width: 'var(--sidebar-width)', zIndex: 100 }}>
      <SidebarContent />
    </div>
  )
}
