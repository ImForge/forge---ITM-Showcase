'use client'
import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { showToast } from '@/components/ui/Toast'
import Toast from '@/components/ui/Toast'

type Step = 1 | 2 | 3

function StepDots({ step }: { step: Step }) {
  return (
    <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 36 }}>
      {[1,2,3].map(s => (
        <div key={s} style={{
          width: s === step ? 24 : 8, height: 8, borderRadius: 99,
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

  async function handleStep1(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !username) { showToast('Fill in all fields', 'error'); return }
    if (username.length < 3)  { showToast('Username must be 3+ characters', 'error'); return }
    setLoading(true)
    const supabase = createClient()
    const { data: existing } = await supabase.from('profiles').select('id').eq('username', username.toLowerCase()).maybeSingle()
    if (existing) { showToast('Username already taken', 'error'); setLoading(false); return }
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { data: { username: username.toLowerCase(), full_name: fullName }, shouldCreateUser: true },
    })
    if (error) showToast(error.message, 'error')
    else { showToast('OTP sent!', 'success'); setStep(2) }
    setLoading(false)
  }

  async function handleStep2(e: React.FormEvent) {
    e.preventDefault()
    if (otp.length !== 6) { showToast('Enter the 6-digit code', 'error'); return }
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.verifyOtp({ email, token: otp, type: 'email' })
    if (error) showToast('Invalid or expired code', 'error')
    else setStep(3)
    setLoading(false)
  }

  async function handleStep3(e: React.FormEvent) {
    e.preventDefault()
    if (password.length < 8)    { showToast('Password must be 8+ characters', 'error'); return }
    if (password !== confirmPw) { showToast('Passwords do not match', 'error'); return }
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password })
    if (error) { showToast(error.message, 'error'); setLoading(false) }
    else { showToast('Account created!', 'success'); window.location.href = '/' }
  }

  const inp: React.CSSProperties = { width: '100%', padding: '11px 14px', borderRadius: 10 }
  const lbl: React.CSSProperties = { display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 6, letterSpacing: '0.05em' }

  const titles = {
    1: { title: 'Create your account', sub: 'Join the Forge community at ITM University' },
    2: { title: 'Check your email',    sub: `We sent a 6-digit code to ${email}` },
    3: { title: 'Set your password',   sub: 'Choose a secure password' },
  }

  return (
    <>
      <Toast />
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 20, padding: '48px 40px', boxShadow: '0 4px 40px rgba(0,0,0,0.06)' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 32, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Forge</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4, letterSpacing: '0.1em' }}>ITM University Raipur</div>
        </div>
        <StepDots step={step} />
        <h2 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 26, fontWeight: 400, marginBottom: 6 }}>{titles[step].title}</h2>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 28 }}>{titles[step].sub}</p>

        {step === 1 && (
          <form onSubmit={handleStep1}>
            <div style={{ marginBottom: 14 }}>
              <label style={lbl}>Full Name</label>
              <input value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Shivam Tiwari" style={inp} />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={lbl}>Username *</label>
              <input value={username} onChange={e => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g,''))} placeholder="shivam" style={inp} />
            </div>
            <div style={{ marginBottom: 28 }}>
              <label style={lbl}>Email *</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@itmuniversity.ac.in" style={inp} />
            </div>
            <button type="submit" disabled={loading} style={{ width: '100%', padding: '13px', background: 'var(--accent)', color: '#1c1917', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
              {loading ? 'Sending OTP…' : 'Continue →'}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleStep2}>
            <div style={{ marginBottom: 28 }}>
              <label style={lbl}>6-Digit Code</label>
              <input value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g,'').slice(0,6))} placeholder="123456" maxLength={6}
                style={{ ...inp, textAlign: 'center', fontSize: 24, letterSpacing: '0.3em' }} />
            </div>
            <button type="submit" disabled={loading || otp.length !== 6} style={{ width: '100%', padding: '13px', background: otp.length === 6 ? 'var(--accent)' : 'var(--border)', color: otp.length === 6 ? '#1c1917' : 'var(--text-muted)', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
              {loading ? 'Verifying…' : 'Verify Code'}
            </button>
            <button type="button" onClick={() => setStep(1)} style={{ width: '100%', marginTop: 10, padding: '11px', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: 'var(--text-muted)', fontFamily: 'inherit' }}>← Back</button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleStep3}>
            <div style={{ marginBottom: 14 }}>
              <label style={lbl}>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Min 8 characters" style={inp} />
              {password.length > 0 && (
                <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
                  {[1,2,3,4].map(i => {
                    const strength = password.length >= 12 && /[A-Z]/.test(password) && /[0-9]/.test(password) ? 4
                      : password.length >= 10 && /[A-Z]/.test(password) ? 3
                      : password.length >= 8 ? 2 : 1
                    return <div key={i} style={{ height: 3, flex: 1, borderRadius: 99, background: i <= strength ? ['','var(--danger)','var(--warning)','var(--success)','var(--success)'][i] : 'var(--border)', transition: 'background 0.2s' }} />
                  })}
                </div>
              )}
            </div>
            <div style={{ marginBottom: 28 }}>
              <label style={lbl}>Confirm Password</label>
              <input type="password" value={confirmPw} onChange={e => setConfirm(e.target.value)} placeholder="••••••••"
                style={{ ...inp, borderColor: confirmPw && confirmPw !== password ? 'var(--danger)' : undefined }} />
            </div>
            <button type="submit" disabled={loading} style={{ width: '100%', padding: '13px', background: 'var(--accent)', color: '#1c1917', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
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
