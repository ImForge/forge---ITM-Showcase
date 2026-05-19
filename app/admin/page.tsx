// Admin page — Server Component that fetches data, then renders AdminClient
import { createClient } from '@/lib/supabase/server'
import AdminClient from './AdminClient'
import type { ProjectWithRelations, AssignmentWithProfile, Profile, Report } from '@/lib/types/database'

export const metadata = { title: 'Admin · Forge' }

export default async function AdminPage() {
  const supabase = await createClient()

  // Fetch pending projects (status = 'pending')
  const { data: pendingProjectsRaw } = await supabase
    .from('projects')
    .select(`
      *,
      profiles!projects_submitted_by_fkey ( id, username, avatar_url, full_name ),
      project_tags ( tag_id, tags ( id, name, color ) ),
      project_members ( profile_id, role, profiles!project_members_profile_id_fkey ( id, username, avatar_url, full_name ) )
    `)
    .eq('status', 'pending')
    .order('created_at', { ascending: false })

  // Fetch all projects (for management)
  const { data: allProjectsRaw } = await supabase
    .from('projects')
    .select(`
      *,
      profiles!projects_submitted_by_fkey ( id, username, avatar_url, full_name ),
      project_tags ( tag_id, tags ( id, name, color ) ),
      project_members ( profile_id, role, profiles!project_members_profile_id_fkey ( id, username, avatar_url, full_name ) )
    `)
    .order('created_at', { ascending: false })
    .limit(50)

  // Fetch reports
  const { data: reportsRaw } = await supabase
    .from('reports')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(30)

  // Fetch all users
  const { data: usersRaw } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100)

  // Fetch tags
  const { data: tagsRaw } = await supabase
    .from('tags')
    .select('*')
    .order('name')

  // Stats
  const [
    { count: totalProjects },
    { count: totalUsers },
    { count: totalAssignments },
    { count: totalTeams },
  ] = await Promise.all([
    supabase.from('projects').select('*', { count: 'exact', head: true }).eq('status', 'approved'),
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('assignments').select('*', { count: 'exact', head: true }),
    supabase.from('teams').select('*', { count: 'exact', head: true }),
  ])

  return (
    <AdminClient
      pendingProjects={(pendingProjectsRaw as unknown as ProjectWithRelations[]) ?? []}
      allProjects={(allProjectsRaw as unknown as ProjectWithRelations[]) ?? []}
      reports={(reportsRaw as unknown as Report[]) ?? []}
      users={(usersRaw as unknown as Profile[]) ?? []}
      tags={(tagsRaw as any[]) ?? []}
      stats={{
        totalProjects: totalProjects ?? 0,
        totalUsers: totalUsers ?? 0,
        totalAssignments: totalAssignments ?? 0,
        totalTeams: totalTeams ?? 0,
      }}
    />
  )
}
