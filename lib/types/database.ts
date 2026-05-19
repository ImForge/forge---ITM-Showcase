// ─── DATABASE TYPES ───────────────────────────────────────────
// These match the Supabase schema exactly.
// When casting Supabase results: (data as unknown as YourType[])
 
export type Program = 'B.Tech' | 'BCA' | 'MCA' | 'B.Sc' | 'MBA'
 
export const PROGRAMS: Program[] = ['B.Tech', 'BCA', 'MCA', 'B.Sc', 'MBA']
 
export const SEMESTERS_BY_PROGRAM: Record<Program, string[]> = {
  'B.Tech': ['1st Sem','2nd Sem','3rd Sem','4th Sem','5th Sem','6th Sem','7th Sem','8th Sem'],
  'BCA':    ['1st Sem','2nd Sem','3rd Sem','4th Sem','5th Sem','6th Sem'],
  'MCA':    ['1st Sem','2nd Sem','3rd Sem','4th Sem'],
  'B.Sc':   ['1st Sem','2nd Sem','3rd Sem','4th Sem','5th Sem','6th Sem'],
  'MBA':    ['1st Sem','2nd Sem','3rd Sem','4th Sem'],
}
 
export const BRANCHES = ['CSE', 'CTIS', 'IT', 'ECE', 'ME', 'CE', 'EE', 'General']
 
export const ACADEMIC_YEARS = ['2020-21','2021-22','2022-23','2023-24','2024-25','2025-26']
 
export type Profile = {
  id: string
  username: string
  full_name: string | null
  avatar_url: string | null
  bio: string | null
  roll_number: string | null
  graduation_year: number | null
  role: 'student' | 'admin'
  program: Program | null
  branch: string | null
  github_url: string | null
  instagram_url: string | null
  twitter_url: string | null
  discord_username: string | null
  reddit_username: string | null
  spotify_url: string | null
  created_at: string
}
 
export type Tag = {
  id: string
  name: string
  color: string | null
}
 
export type Project = {
  id: string
  title: string
  description: string | null
  long_description: string | null
  thumbnail_url: string | null
  repo_url: string | null
  live_url: string | null
  demo_url: string | null
  doc_url: string | null           // documentation file
  doc_description: string | null   // optional doc notes
  submitted_by: string
  team_id: string | null
  is_team_project: boolean
  faculty_guide: string | null     // "Dr. Sharma" — guided by
  program: Program | null
  academic_year: string | null
  semester: string | null
  status: 'approved' | 'pending' | 'rejected'
  views: number
  star_count: number
  created_at: string
  updated_at: string | null
}
 
export type ProjectWithRelations = Project & {
  profiles: Pick<Profile, 'id' | 'username' | 'avatar_url' | 'full_name'> | null
  project_tags: Array<{ tags: Tag | null }>
  project_members: Array<{
    profile_id: string
    role: string
    profiles: Pick<Profile, 'id' | 'username' | 'avatar_url' | 'full_name'> | null
  }>
  teams: Pick<Team, 'id' | 'name' | 'logo_url' | 'faculty_guide'> | null
}
 
export type Team = {
  id: string
  name: string
  description: string | null
  logo_url: string | null
  faculty_guide: string | null   // "Dr. Sharma"
  created_by: string
  created_at: string
}
 
export type TeamWithRelations = Team & {
  team_members: Array<{
    profile_id: string
    role: 'leader' | 'member'
    joined_at: string
    profiles: Pick<Profile, 'id' | 'username' | 'avatar_url' | 'full_name'> | null
  }>
}
 
export type TeamInvitation = {
  id: string
  team_id: string
  invited_by: string
  invited_user: string
  status: 'pending' | 'accepted' | 'declined'
  created_at: string
  teams: Pick<Team, 'id' | 'name' | 'logo_url'> | null
  profiles: Pick<Profile, 'id' | 'username' | 'avatar_url' | 'full_name'> | null
}
 
export type Assignment = {
  id: string
  title: string
  subject: string
  semester: string
  academic_year: string
  description: string | null
  file_url: string | null
  submitted_by: string
  is_public: boolean
  created_at: string
}
 
export type AssignmentWithProfile = Assignment & {
  profiles: Pick<Profile, 'id' | 'username' | 'avatar_url' | 'full_name'> | null
}
 
export type Star = {
  user_id: string
  project_id: string
  created_at: string
}
 
export type Save = {
  id: string
  user_id: string
  project_id: string | null
  assignment_id: string | null
  created_at: string
}
 
export type Report = {
  id: string
  reporter_id: string
  project_id: string | null
  assignment_id: string | null
  reason: string
  created_at: string
}
 
export type BuildOn = {
  parent_project_id: string
  child_project_id: string
}
 