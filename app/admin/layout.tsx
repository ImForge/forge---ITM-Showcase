// Admin layout — Server Component
// Guards the entire /admin/* route — non-admins are redirected
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import type { Profile } from '@/lib/types/database'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles').select('role').eq('id', user.id).single()

  if (!profile || (profile as Profile).role !== 'admin') redirect('/')

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>
      {children}
    </div>
  )
}
