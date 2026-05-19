// (main) layout — Server Component
// Fetches the current user + pending invitations, then renders
// the sidebar and main content wrapper
// Route group (main) is ignored in URLs — /projects not /(main)/projects
import { createClient } from '@/lib/supabase/server'
import SidebarClient from '@/components/layout/SidebarClient'
import MainContent from '@/components/layout/MainContent'
import type { Profile } from '@/lib/types/database'
import Toast from '@/components/ui/Toast'

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()

  // Get authenticated user
  const { data: { user } } = await supabase.auth.getUser()

  let profile: Profile | null = null
  let pendingInvitations = 0

  if (user) {
    // Fetch profile
    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    profile = profileData as Profile | null

    // Fetch pending invitations count
    const { count } = await supabase
      .from('team_invitations')
      .select('*', { count: 'exact', head: true })
      .eq('invited_user', user.id)
      .eq('status', 'pending')

    pendingInvitations = count ?? 0
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <SidebarClient profile={profile} pendingInvitations={pendingInvitations} />
      <MainContent>
        {children}
      </MainContent>
      <Toast />
    </div>
  )
}
