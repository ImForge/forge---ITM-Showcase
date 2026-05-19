'use client'
// 3-step signup:
// Step 1: Email + Username
// Step 2: 6-digit OTP sent to email
// Step 3: Set password
import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { showToast } from '@/components/ui/Toast'
import Toast from '@/components/ui/Toast'

type Step = 1 | 2 | 3

// Progress dots — defined outside to avoid rebuild
function StepDots({ step }: { step: Step }) {
  return (
    <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 36 }}>
      {[1,2,3].map(s => (
        <div key={s} style={{
          width: s === step ? 24 : 8, height: 8,
          borderRadius: 99,
          background: s <= step ? 'var(--accent)' : 'var(--border)',
          transition: 'all 0.3s',
        }} />
      ))}
    </div>
  )
}

export default function SignupPage() {
  const [step, setStep]         = useState<Step>(1)
  const [email, setEmail]       = useState('')
  const [username, setUsername] = useState('')
  const [fullName, setFullName] = useState('')
  const [otp, setOtp]           = useState('')
  const [password, setPassword] = useState('')
  const [confirmPw, setConfirm] = useState('')
  const [loading, setLoading]   = useState(false)

  // Step 1 — send OTP
  async function handleStep1(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !username) { showToast('Fill in all fields', 'error'); return }
    if (username.length < 3) { showToast('Username must be 3+ characters', 'error'); return }
    setLoading(true)

    const supabase = createClient()

    // Check username uniqueness
    const { data: existing } = await supabase
      .from('profiles')
      .select('id')
      .eq('username', username.toLowerCase())
      .maybeSingle()

    if (existing) {
      showToast('Username already taken', 'error')
      setLoading(false)
      return
    }

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        data: { username: username.toLowerCase(), full_name: fullName },
        shouldCreateUser: true,
      },
    })

    if (error) { showToast(error.message, 'error') }
    else {
      showToast('OTP sent to your email!', 'success')
      setStep(2)
    }
    setLoading(false)
  }

  // Step 2 — verify OTP
  async function handleStep2(e: React.FormEvent) {
    e.preventDefault()
    if (otp.length !== 6) { showToast('Enter the 6-digit code', 'error'); return }
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.verifyOtp({ email, token: otp, type: 'email' })
    if (error) { showToast('Invalid or expired code', 'error') }
    else { setStep(3) }
    setLoading(false)
  }

  // Step 3 — set password
  async function handleStep3(e: React.FormEvent) {
    e.preventDefault()
    if (password.length < 8) { showToast('Password must be 8+ characters', 'error'); return }
    if (password !== confirmPw) { showToast('Passwords do not match', 'error'); return }
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password })
    if (error) { showToast(error.message, 'error'); setLoading(false) }
    else {
      showToast('Account created!', 'success')
      window.location.href = '/'
    }
  }

  const inputStyle = { width: '100%', padding: '11px 14px', borderRadius: 10 }
  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: 12, fontWeight: 500,
    color: 'var(--text-secondary)', marginBottom: 6, letterSpacing: '0.05em',
  }

  const stepTitles = {
    1: { title: 'Create your account', sub: 'Join the Forge community at ITM University' },
    2: { title: 'Check your email', sub: `We sent a 6-digit code to ${email}` },
    3: { title: 'Set your password', sub: 'Choose a secure password for your account' },
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
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 32, fontWeight: 600,
            letterSpacing: '0.1em', textTransform: 'uppercase',
          }}>Forge</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4, letterSpacing: '0.1em' }}>
            ITM University Raipur
          </div>
        </div>

        <StepDots step={step} />

        <h2 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 26, fontWeight: 400, marginBottom: 6,
        }}>
          {stepTitles[step].title}
        </h2>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 28 }}>
          {stepTitles[step].sub}
        </p>

        {/* STEP 1 */}
        {step === 1 && (
          <form onSubmit={handleStep1}>
            <div style={{ marginBottom: 14 }}>
              <label style={labelStyle}>Full Name</label>
              <input value={fullName} onChange={e => setFullName(e.target.value)}
                placeholder="Shivam Tiwari" style={inputStyle} />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={labelStyle}>Username <span style={{ color: 'var(--accent)' }}>*</span></label>
              <input value={username}
                onChange={e => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g,''))}
                placeholder="shivam" style={inputStyle} />
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
                Only lowercase letters, numbers, underscores
              </div>
            </div>
            <div style={{ marginBottom: 28 }}>
              <label style={labelStyle}>Email <span style={{ color: 'var(--accent)' }}>*</span></label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@itmuniversity.ac.in" style={inputStyle} />
            </div>
            <button type="submit" disabled={loading} style={{
              width: '100%', padding: '13px',
              background: 'var(--accent)', color: '#1c1917',
              border: 'none', borderRadius: 10,
              fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
            }}>
              {loading ? 'Sending OTP…' : 'Continue →'}
            </button>
          </form>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <form onSubmit={handleStep2}>
            <div style={{ marginBottom: 28 }}>
              <label style={labelStyle}>6-Digit Code</label>
              <input
                value={otp}
                onChange={e => setOtp(e.target.value.replace(/\D/g,'').slice(0,6))}
                placeholder="123456"
                maxLength={6}
                style={{ ...inputStyle, textAlign: 'center', fontSize: 24, letterSpacing: '0.3em' }}
              />
            </div>
            <button type="submit" disabled={loading || otp.length !== 6} style={{
              width: '100%', padding: '13px',
              background: otp.length === 6 ? 'var(--accent)' : 'var(--border)',
              color: otp.length === 6 ? '#1c1917' : 'var(--text-muted)',
              border: 'none', borderRadius: 10,
              fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
              transition: 'all 0.2s',
            }}>
              {loading ? 'Verifying…' : 'Verify Code'}
            </button>
            <button type="button" onClick={() => setStep(1)} style={{
              width: '100%', marginTop: 10, padding: '11px',
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: 13, color: 'var(--text-muted)', fontFamily: 'inherit',
            }}>
              ← Back
            </button>
          </form>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <form onSubmit={handleStep3}>
            <div style={{ marginBottom: 14 }}>
              <label style={labelStyle}>Password</label>
              <input type="password" value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Min 8 characters" style={inputStyle} />
              {/* Strength indicator */}
              {password.length > 0 && (
                <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
                  {[1,2,3,4].map(i => (
                    <div key={i} style={{
                      height: 3, flex: 1, borderRadius: 99,
                      background: i <= (
                        password.length >= 12 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password) ? 4 :
                        password.length >= 10 && /[A-Z]/.test(password) ? 3 :
                        password.length >= 8 ? 2 : 1
                      ) ? ['','var(--danger)','var(--warning)','var(--success)','var(--success)'][i] : 'var(--border)',
                      transition: 'background 0.2s',
                    }} />
                  ))}
                </div>
              )}
            </div>
            <div style={{ marginBottom: 28 }}>
              <label style={labelStyle}>Confirm Password</label>
              <input type="password" value={confirmPw}
                onChange={e => setConfirm(e.target.value)}
              placeholder="••••••••"
style={{
  ...inputStyle,
  borderColor: confirmPw && confirmPw !== password ? 'var(--danger)' : undefined,
} as React.CSSProperties}
/>
            </div>
            <button type="submit" disabled={loading} style={{
              width: '100%', padding: '13px',
              background: 'var(--accent)', color: '#1c1917',
              border: 'none', borderRadius: 10,
              fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
            }}>
              {loading ? 'Creating account…' : 'Create Account →'}
            </button>
          </form>
        )}

        <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-muted)', marginTop: 24 }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: 'var(--accent)', fontWeight: 500 }}>Sign in →</Link>
        </p>
      </div>
    </>
  )
}
