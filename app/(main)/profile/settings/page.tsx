'use client'
// Profile settings — 2 tabs: Profile (avatar, bio, social) + Account (change password)
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { showToast } from '@/components/ui/Toast'
import type { Profile } from '@/lib/types/database'

type Tab = 'profile' | 'account'

export default function SettingsPage() {
  const [tab, setTab]             = useState<Tab>('profile')
  const [profile, setProfile]     = useState<Profile | null>(null)
  const [loading, setLoading]     = useState(true)
  const [saving, setSaving]       = useState(false)
  const [userId, setUserId]       = useState<string | null>(null)

  // Profile fields
  const [fullName, setFullName]       = useState('')
  const [bio, setBio]                 = useState('')
  const [gradYear, setGradYear]       = useState('')
  const [program, setProgram]         = useState('B.Tech')
  const [branch, setBranch]           = useState('')
  const [githubUrl, setGithub]        = useState('')
  const [twitterUrl, setTwitter]      = useState('')
  const [instagramUrl, setInstagram]  = useState('')
  const [discordUsername, setDiscord] = useState('')
  const [spotifyUrl, setSpotify]      = useState('')
  const [avatarFile, setAvatarFile]   = useState<File | null>(null)
  const [avatarPreview, setAvatarPrev]= useState<string | null>(null)

  // Account fields
  const [currentPw, setCurrentPw]     = useState('')
  const [newPw, setNewPw]             = useState('')
  const [confirmPw, setConfirmPw]     = useState('')

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) { window.location.href = '/login'; return }
      setUserId(user.id)

      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      if (data) {
        const p = data as Profile
        setProfile(p)
        setFullName(p.full_name ?? '')
        setBio(p.bio ?? '')
        setGradYear(p.graduation_year?.toString() ?? '')
        setProgram((p as any).program ?? 'B.Tech')
        setBranch((p as any).branch ?? '')
        setGithub(p.github_url ?? '')
        setTwitter(p.twitter_url ?? '')
        setInstagram(p.instagram_url ?? '')
        setDiscord(p.discord_username ?? '')
        setSpotify(p.spotify_url ?? '')
        setAvatarPrev(p.avatar_url ?? null)
      }
      setLoading(false)
    })
  }, [])

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault()
    if (!userId) return
    setSaving(true)
    const supabase = createClient()

    // Upload avatar if changed
    let avatarUrl = profile?.avatar_url ?? null
    if (avatarFile) {
      const ext  = avatarFile.name.split('.').pop()
      const path = `avatars/${userId}.${ext}`
      const { error } = await supabase.storage
        .from('avatars')
        .upload(path, avatarFile, { upsert: true })
      if (!error) {
        // Add cache-busting query param so browser fetches fresh image
        const { data } = supabase.storage.from('avatars').getPublicUrl(path)
        avatarUrl = data.publicUrl + `?v=${Date.now()}`
      }
    }

    const { error } = await supabase.from('profiles').update({
      full_name:        fullName.trim() || null,
      bio:              bio.trim() || null,
      graduation_year:  gradYear ? parseInt(gradYear) : null,
      program:          program || null,
      branch:           branch.trim() || null,
      avatar_url:       avatarUrl,
      github_url:       githubUrl.trim() || null,
      twitter_url:      twitterUrl.trim() || null,
      instagram_url:    instagramUrl.trim() || null,
      discord_username: discordUsername.trim() || null,
      spotify_url:      spotifyUrl.trim() || null,
    }).eq('id', userId)

    if (error) showToast('Failed to save', 'error')
    else showToast('Profile updated!', 'success')
    setSaving(false)
  }

  async function changePassword(e: React.FormEvent) {
    e.preventDefault()
    if (newPw !== confirmPw) { showToast('Passwords do not match', 'error'); return }
    if (newPw.length < 8)   { showToast('Password must be 8+ characters', 'error'); return }
    setSaving(true)
    const supabase = createClient()

    // Re-authenticate first
    const { data: { user } } = await supabase.auth.getUser()
    if (!user?.email) { showToast('Session expired. Please log in again.', 'error'); setSaving(false); return }

    const { error: reAuthErr } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: currentPw,
    })
    if (reAuthErr) { showToast('Current password is incorrect', 'error'); setSaving(false); return }

    const { error } = await supabase.auth.updateUser({ password: newPw })
    if (error) showToast('Failed to update password', 'error')
    else {
      showToast('Password changed!', 'success')
      setCurrentPw(''); setNewPw(''); setConfirmPw('')
    }
    setSaving(false)
  }

  const lbl: React.CSSProperties = {
    display: 'block', fontSize: 12, fontWeight: 500,
    color: 'var(--text-secondary)', marginBottom: 6,
    letterSpacing: '0.05em', textTransform: 'uppercase',
  }
  const inp: React.CSSProperties = { width: '100%', padding: '11px 14px', borderRadius: 10 }

  if (loading) return (
    <div style={{ padding: '80px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading…</div>
  )

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: '48px 40px 80px' }}>

      <div className="animate-fade-up" style={{ marginBottom: 40 }}>
        <h1 style={{
          fontFamily: 'var(--font-cormorant), Georgia, serif',
          fontSize: 52, fontWeight: 400,
        }}>
          Settings
        </h1>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex', gap: 4,
        background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)',
        borderRadius: 12, padding: 4, marginBottom: 36, width: 'fit-content',
      }}>
        {(['profile', 'account'] as Tab[]).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: '9px 22px', border: 'none', borderRadius: 8,
            background: tab === t ? 'var(--accent-dim)' : 'transparent',
            color: tab === t ? 'var(--accent)' : 'var(--text-secondary)',
            fontFamily: 'inherit', fontSize: 13,
            fontWeight: tab === t ? 500 : 400, cursor: 'pointer',
            textTransform: 'capitalize', transition: 'all 0.15s',
          }}>
            {t}
          </button>
        ))}
      </div>

      {/* ─── PROFILE TAB ─── */}
      {tab === 'profile' && (
        <form onSubmit={saveProfile} className="animate-fade-up">

          {/* Avatar section */}
          <div style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 16, padding: '28px', marginBottom: 20,
          }}>
            <h2 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 22, marginBottom: 20 }}>
              Avatar
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <div style={{
                width: 80, height: 80, borderRadius: '50%',
                background: 'var(--bg-overlay)', overflow: 'hidden',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 30, color: 'var(--accent)',
                border: '2px solid var(--border-subtle)',
              }}>
                {avatarPreview
                  ? <img src={avatarPreview} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                  : profile?.username?.[0]?.toUpperCase()}
              </div>
              <label style={{
                padding: '9px 20px', borderRadius: 10,
                border: '1px solid var(--border)',
                background: 'var(--bg-surface)',
                fontSize: 13, color: 'var(--text-secondary)',
                cursor: 'pointer', display: 'inline-block',
              }}>
                <input type="file" accept="image/*" style={{ display: 'none' }} onChange={e => {
                  const f = e.target.files?.[0]
                  if (f) { setAvatarFile(f); setAvatarPrev(URL.createObjectURL(f)) }
                }} />
                {avatarPreview ? 'Change photo' : 'Upload photo'}
              </label>
            </div>
          </div>

          {/* Basic info */}
          <div style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 16, padding: '28px', marginBottom: 20,
          }}>
            <h2 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 22, marginBottom: 20 }}>
              Basic Info
            </h2>
            <div style={{ display: 'grid', gap: 14 }}>
              <div>
                <label style={lbl}>Full Name</label>
                <input value={fullName} onChange={e => setFullName(e.target.value)}
                  placeholder="Your full name" style={inp} />
              </div>
              <div>
                <label style={lbl}>Bio</label>
                <textarea value={bio} onChange={e => setBio(e.target.value)}
                  placeholder="Tell others about yourself..." rows={3}
                  style={{ ...inp, resize: 'vertical' }} />
              </div>
              <div>
                <label style={lbl}>Graduation Year</label>
                <input value={gradYear} onChange={e => setGradYear(e.target.value)}
                  placeholder="2027" type="number" min="2020" max="2035" style={inp} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={lbl}>Program</label>
                  <select value={program} onChange={e => setProgram(e.target.value)} style={{ ...inp, cursor: 'pointer' }}>
                    {['B.Tech','BCA','MCA','B.Sc','MBA'].map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label style={lbl}>Branch / Dept</label>
                  <select value={branch} onChange={e => setBranch(e.target.value)} style={{ ...inp, cursor: 'pointer' }}>
                    <option value="">Select</option>
                    {['CSE','CTIS','IT','ECE','ME','CE','EE','General'].map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Social links */}
          <div style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 16, padding: '28px', marginBottom: 28,
          }}>
            <h2 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 22, marginBottom: 20 }}>
              Social Links
            </h2>
            <div style={{ display: 'grid', gap: 14 }}>
              {[
                { label: '⌥ GitHub URL',    val: githubUrl,    set: setGithub,    ph: 'https://github.com/username' },
                { label: '✦ Twitter URL',   val: twitterUrl,   set: setTwitter,   ph: 'https://twitter.com/username' },
                { label: '◎ Instagram URL', val: instagramUrl, set: setInstagram, ph: 'https://instagram.com/username' },
                { label: '◈ Discord Username', val: discordUsername, set: setDiscord, ph: 'username#0000' },
                { label: '♪ Spotify URL',   val: spotifyUrl,   set: setSpotify,   ph: 'https://open.spotify.com/user/...' },
              ].map(({ label, val, set, ph }) => (
                <div key={label}>
                  <label style={lbl}>{label}</label>
                  <input value={val} onChange={e => set(e.target.value)} placeholder={ph} style={inp} />
                </div>
              ))}
            </div>
          </div>

          <button type="submit" disabled={saving} style={{
            width: '100%', padding: '14px',
            background: saving ? 'var(--border)' : 'var(--accent)',
            color: saving ? 'var(--text-muted)' : '#1c1917',
            border: 'none', borderRadius: 12,
            fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
            transition: 'all 0.2s',
          }}>
            {saving ? 'Saving…' : 'Save Profile →'}
          </button>
        </form>
      )}

      {/* ─── ACCOUNT TAB ─── */}
      {tab === 'account' && (
        <form onSubmit={changePassword} className="animate-fade-up">
          <div style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 16, padding: '28px', marginBottom: 24,
          }}>
            <h2 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 22, marginBottom: 20 }}>
              Change Password
            </h2>
            <div style={{ display: 'grid', gap: 14 }}>
              <div>
                <label style={lbl}>Current Password</label>
                <input type="password" value={currentPw} onChange={e => setCurrentPw(e.target.value)}
                  placeholder="Enter current password" style={inp} />
              </div>
              <div>
                <label style={lbl}>New Password</label>
                <input type="password" value={newPw} onChange={e => setNewPw(e.target.value)}
                  placeholder="Min 8 characters" style={inp} />
              </div>
              <div>
                <label style={lbl}>Confirm New Password</label>
                <input type="password" value={confirmPw} onChange={e => setConfirmPw(e.target.value)}
                  placeholder="Repeat new password" style={{
                    ...inp,
                    borderColor: confirmPw && confirmPw !== newPw ? 'var(--danger)' : undefined,
                  } as React.CSSProperties} />
                {confirmPw && confirmPw !== newPw && (
                  <div style={{ fontSize: 12, color: 'var(--danger)', marginTop: 4 }}>
                    Passwords do not match
                  </div>
                )}
              </div>
            </div>
          </div>

          <button type="submit" disabled={saving} style={{
            width: '100%', padding: '14px',
            background: 'var(--accent)', color: '#1c1917',
            border: 'none', borderRadius: 12,
            fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
          }}>
            {saving ? 'Updating…' : 'Change Password →'}
          </button>

          {/* Danger zone */}
          <div style={{
            marginTop: 32,
            background: 'rgba(185,64,64,0.05)',
            border: '1px solid rgba(185,64,64,0.2)',
            borderRadius: 14, padding: '24px',
          }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--danger)', marginBottom: 8 }}>
              Danger Zone
            </h3>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16, lineHeight: 1.5 }}>
              Deleting your account is permanent. Your submitted projects will remain but your profile will be anonymized.
            </p>
            <button type="button" style={{
              padding: '9px 20px', borderRadius: 8,
              background: 'none', border: '1px solid var(--danger)',
              color: 'var(--danger)', fontSize: 13,
              cursor: 'pointer', fontFamily: 'inherit',
            }} onClick={() => showToast('Contact an admin to delete your account.', 'info')}>
              Delete Account
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
