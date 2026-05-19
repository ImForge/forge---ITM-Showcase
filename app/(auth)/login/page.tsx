'use client'
import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { showToast } from '@/components/ui/Toast'
import Toast from '@/components/ui/Toast'

export default function LoginPage() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !password) { showToast('Fill in all fields', 'error'); return }
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      showToast(error.message, 'error')
      setLoading(false)
    } else {
      // Reliable redirect after async auth
      window.location.href = '/'
    }
  }

  return (
    <>
      <Toast />
      <div style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 20, padding: '48px 40px',
        boxShadow: '0 4px 40px rgba(0,0,0,0.06)',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 32, fontWeight: 600,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'var(--text-primary)',
          }}>Forge</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4, letterSpacing: '0.1em' }}>
            ITM University Raipur
          </div>
        </div>

        <h2 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 28, fontWeight: 400,
          color: 'var(--text-primary)', marginBottom: 8,
        }}>
          Welcome back
        </h2>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 32 }}>
          Sign in to your Forge account
        </p>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 500,
              color: 'var(--text-secondary)', marginBottom: 6, letterSpacing: '0.05em' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={{ width: '100%', padding: '11px 14px', borderRadius: 10 }}
              autoComplete="email"
            />
          </div>
          <div style={{ marginBottom: 28 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 500,
              color: 'var(--text-secondary)', marginBottom: 6, letterSpacing: '0.05em' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{ width: '100%', padding: '11px 14px', borderRadius: 10 }}
              autoComplete="current-password"
            />
          </div>

          <button type="submit" disabled={loading} style={{
            width: '100%', padding: '13px',
            background: loading ? 'var(--border)' : 'var(--accent)',
            color: loading ? 'var(--text-muted)' : '#1c1917',
            border: 'none', borderRadius: 10,
            fontSize: 14, fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer',
            fontFamily: 'inherit',
            letterSpacing: '0.02em',
            transition: 'all 0.2s',
          }}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-muted)', marginTop: 24 }}>
          No account?{' '}
          <Link href="/signup" style={{ color: 'var(--accent)', fontWeight: 500 }}>
            Create one →
          </Link>
        </p>
      </div>
    </>
  )
}
