-- ================================================================
-- FORGE — COMPLETE SUPABASE SQL SETUP
-- Run this ENTIRE file in Supabase → SQL Editor → New Query
-- ================================================================

-- ──────────────────────────────────────────────────────────────
-- 1. PROFILES TABLE
-- Supabase creates an `auth.users` table automatically.
-- We store extra info in `profiles`, linked to auth.users.
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.profiles (
  id               UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username         TEXT UNIQUE NOT NULL,
  full_name        TEXT,
  avatar_url       TEXT,
  bio              TEXT,
  roll_number      TEXT,
  graduation_year  INT,
  role             TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'admin')),
  github_url       TEXT,
  instagram_url    TEXT,
  twitter_url      TEXT,
  discord_username TEXT,
  reddit_username  TEXT,
  spotify_url      TEXT,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ──────────────────────────────────────────────────────────────
-- 2. TAGS TABLE
-- Simple taxonomy for projects (React, Python, ML, etc.)
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.tags (
  id    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name  TEXT UNIQUE NOT NULL,
  color TEXT DEFAULT '#c9973a'
);

-- Seed some tags to start with
INSERT INTO public.tags (name) VALUES
  ('Web Development'), ('Machine Learning'), ('Mobile App'),
  ('Python'), ('React'), ('Next.js'), ('Java'), ('C++'),
  ('Data Science'), ('IoT'), ('Cybersecurity'), ('Blockchain'),
  ('Android'), ('API'), ('Database'), ('AI/ML'),
  ('Game Development'), ('DevOps'), ('UI/UX'), ('Research')
ON CONFLICT (name) DO NOTHING;

-- ──────────────────────────────────────────────────────────────
-- 3. TEAMS TABLE
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.teams (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  description TEXT,
  logo_url    TEXT,
  created_by  UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ──────────────────────────────────────────────────────────────
-- 4. TEAM MEMBERS TABLE
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.team_members (
  team_id    UUID REFERENCES public.teams(id) ON DELETE CASCADE,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  role       TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('leader', 'member')),
  joined_at  TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (team_id, profile_id)
);

-- ──────────────────────────────────────────────────────────────
-- 5. TEAM INVITATIONS TABLE
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.team_invitations (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id      UUID REFERENCES public.teams(id) ON DELETE CASCADE,
  invited_by   UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  invited_user UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  status       TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined')),
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ──────────────────────────────────────────────────────────────
-- 6. PROJECTS TABLE
-- Core entity — the project archive
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.projects (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title            TEXT NOT NULL,
  description      TEXT,
  long_description TEXT,
  thumbnail_url    TEXT,
  repo_url         TEXT,
  live_url         TEXT,
  demo_url         TEXT,
  submitted_by     UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  team_id          UUID REFERENCES public.teams(id) ON DELETE SET NULL,
  academic_year    TEXT,
  semester         TEXT,
  status           TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  views            INT NOT NULL DEFAULT 0,
  star_count       INT NOT NULL DEFAULT 0,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ
);

-- ──────────────────────────────────────────────────────────────
-- 7. PROJECT TAGS (many-to-many)
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.project_tags (
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  tag_id     UUID REFERENCES public.tags(id) ON DELETE CASCADE,
  PRIMARY KEY (project_id, tag_id)
);

-- ──────────────────────────────────────────────────────────────
-- 8. PROJECT MEMBERS (many-to-many: who contributed to a project)
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.project_members (
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  role       TEXT NOT NULL DEFAULT 'contributor' CHECK (role IN ('owner', 'contributor')),
  PRIMARY KEY (project_id, profile_id)
);

-- ──────────────────────────────────────────────────────────────
-- 9. BUILD_ONS (project lineage tree)
-- A "child" project builds on a "parent" project
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.build_ons (
  parent_project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  child_project_id  UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  PRIMARY KEY (parent_project_id, child_project_id),
  CHECK (parent_project_id != child_project_id)
);

-- ──────────────────────────────────────────────────────────────
-- 10. STARS (users starring projects)
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.stars (
  user_id    UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, project_id)
);

-- ──────────────────────────────────────────────────────────────
-- 11. SAVES (bookmarks)
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.saves (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  project_id    UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  assignment_id UUID,  -- nullable, for future assignment saves
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, project_id)
);

-- ──────────────────────────────────────────────────────────────
-- 12. REPORTS
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.reports (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id   UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  project_id    UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  assignment_id UUID,
  reason        TEXT NOT NULL,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ──────────────────────────────────────────────────────────────
-- 13. ASSIGNMENTS TABLE
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.assignments (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title         TEXT NOT NULL,
  subject       TEXT NOT NULL,
  semester      TEXT NOT NULL,
  academic_year TEXT NOT NULL,
  description   TEXT,
  file_url      TEXT,
  submitted_by  UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  is_public     BOOLEAN NOT NULL DEFAULT true,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ================================================================
-- TRIGGERS
-- ================================================================

-- Auto-create profile when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'full_name'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update star_count on projects whenever a star is inserted/deleted
CREATE OR REPLACE FUNCTION public.update_star_count()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.projects SET star_count = star_count + 1 WHERE id = NEW.project_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.projects SET star_count = GREATEST(star_count - 1, 0) WHERE id = OLD.project_id;
  END IF;
  RETURN NULL;
END;
$$;

DROP TRIGGER IF EXISTS on_star_change ON public.stars;
CREATE TRIGGER on_star_change
  AFTER INSERT OR DELETE ON public.stars
  FOR EACH ROW EXECUTE FUNCTION public.update_star_count();

-- ================================================================
-- RPCs (Remote Procedure Calls — called from the app)
-- ================================================================

-- Increment view count safely (prevents Next.js double-increment in dev)
CREATE OR REPLACE FUNCTION public.increment_views(project_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  UPDATE public.projects
  SET views = views + 1
  WHERE id = project_id;
END;
$$;

-- ================================================================
-- RLS (ROW LEVEL SECURITY)
-- This controls who can read/write what.
-- Without RLS, anyone with your anon key can read/write everything.
-- ================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_tags     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_members  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.build_ons        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stars            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saves            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignments      ENABLE ROW LEVEL SECURITY;

-- ─── PROFILES ───
-- Anyone can view profiles
CREATE POLICY "profiles_select_all" ON public.profiles
  FOR SELECT USING (true);
-- Users can only update their own profile
CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- ─── TAGS ───
-- Anyone can read tags
CREATE POLICY "tags_select_all" ON public.tags
  FOR SELECT USING (true);
-- Only admins can insert/update/delete tags
CREATE POLICY "tags_admin_write" ON public.tags
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ─── PROJECTS ───
-- Anyone can view approved projects
CREATE POLICY "projects_select_approved" ON public.projects
  FOR SELECT USING (
    status = 'approved'
    OR submitted_by = auth.uid()
    OR EXISTS (SELECT 1 FROM public.project_members WHERE project_id = projects.id AND profile_id = auth.uid())
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );
-- Authenticated users can insert projects
CREATE POLICY "projects_insert_auth" ON public.projects
  FOR INSERT WITH CHECK (auth.uid() = submitted_by);
-- Owner or admin can update/delete
CREATE POLICY "projects_update_own" ON public.projects
  FOR UPDATE USING (
    submitted_by = auth.uid()
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );
CREATE POLICY "projects_delete_admin" ON public.projects
  FOR DELETE USING (
    submitted_by = auth.uid()
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ─── PROJECT TAGS ───
CREATE POLICY "project_tags_select" ON public.project_tags FOR SELECT USING (true);
CREATE POLICY "project_tags_insert" ON public.project_tags
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.projects WHERE id = project_id AND submitted_by = auth.uid())
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );
CREATE POLICY "project_tags_delete" ON public.project_tags
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.projects WHERE id = project_id AND submitted_by = auth.uid())
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ─── PROJECT MEMBERS ───
CREATE POLICY "project_members_select" ON public.project_members FOR SELECT USING (true);
CREATE POLICY "project_members_insert" ON public.project_members
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.projects WHERE id = project_id AND submitted_by = auth.uid())
    OR profile_id = auth.uid()
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );
CREATE POLICY "project_members_delete" ON public.project_members
  FOR DELETE USING (
    profile_id = auth.uid()
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ─── BUILD ONS ───
CREATE POLICY "build_ons_select" ON public.build_ons FOR SELECT USING (true);
CREATE POLICY "build_ons_insert" ON public.build_ons
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.projects WHERE id = child_project_id AND submitted_by = auth.uid())
  );
CREATE POLICY "build_ons_delete" ON public.build_ons
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.projects WHERE id = child_project_id AND submitted_by = auth.uid())
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ─── STARS ───
CREATE POLICY "stars_select" ON public.stars FOR SELECT USING (true);
CREATE POLICY "stars_insert" ON public.stars
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "stars_delete" ON public.stars
  FOR DELETE USING (auth.uid() = user_id);

-- ─── SAVES ───
CREATE POLICY "saves_select_own" ON public.saves
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "saves_insert" ON public.saves
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "saves_delete" ON public.saves
  FOR DELETE USING (auth.uid() = user_id);

-- ─── REPORTS ───
CREATE POLICY "reports_insert" ON public.reports
  FOR INSERT WITH CHECK (auth.uid() = reporter_id);
CREATE POLICY "reports_select_admin" ON public.reports
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ─── TEAMS ───
CREATE POLICY "teams_select_all" ON public.teams FOR SELECT USING (true);
CREATE POLICY "teams_insert_auth" ON public.teams
  FOR INSERT WITH CHECK (auth.uid() = created_by);
CREATE POLICY "teams_update_leader" ON public.teams
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.team_members WHERE team_id = teams.id AND profile_id = auth.uid() AND role = 'leader')
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );
CREATE POLICY "teams_delete_leader" ON public.teams
  FOR DELETE USING (
    created_by = auth.uid()
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ─── TEAM MEMBERS ───
CREATE POLICY "team_members_select" ON public.team_members FOR SELECT USING (true);
CREATE POLICY "team_members_insert" ON public.team_members
  FOR INSERT WITH CHECK (
    profile_id = auth.uid()
    OR EXISTS (SELECT 1 FROM public.team_members WHERE team_id = team_members.team_id AND profile_id = auth.uid() AND role = 'leader')
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );
CREATE POLICY "team_members_delete" ON public.team_members
  FOR DELETE USING (
    profile_id = auth.uid()
    OR EXISTS (SELECT 1 FROM public.team_members tm WHERE tm.team_id = team_members.team_id AND tm.profile_id = auth.uid() AND tm.role = 'leader')
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ─── TEAM INVITATIONS ───
CREATE POLICY "invitations_select" ON public.team_invitations
  FOR SELECT USING (
    invited_user = auth.uid()
    OR invited_by = auth.uid()
    OR EXISTS (SELECT 1 FROM public.team_members WHERE team_id = team_invitations.team_id AND profile_id = auth.uid() AND role = 'leader')
  );
CREATE POLICY "invitations_insert" ON public.team_invitations
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.team_members WHERE team_id = team_invitations.team_id AND profile_id = auth.uid() AND role = 'leader')
  );
CREATE POLICY "invitations_update" ON public.team_invitations
  FOR UPDATE USING (invited_user = auth.uid() OR invited_by = auth.uid());

-- ─── ASSIGNMENTS ───
CREATE POLICY "assignments_select" ON public.assignments
  FOR SELECT USING (
    is_public = true
    OR submitted_by = auth.uid()
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );
CREATE POLICY "assignments_insert" ON public.assignments
  FOR INSERT WITH CHECK (auth.uid() = submitted_by);
CREATE POLICY "assignments_update_own" ON public.assignments
  FOR UPDATE USING (
    submitted_by = auth.uid()
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );
CREATE POLICY "assignments_delete_own" ON public.assignments
  FOR DELETE USING (
    submitted_by = auth.uid()
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ================================================================
-- STORAGE BUCKET POLICIES
-- You must create the buckets manually in the Supabase UI first.
-- Then run these policies.
-- Buckets to create: project-thumbnails, assignments, team-logos, avatars
-- All should be set to PUBLIC
-- ================================================================

-- Allow anyone to read from public buckets
CREATE POLICY "storage_public_read" ON storage.objects
  FOR SELECT USING (bucket_id IN ('project-thumbnails', 'assignments', 'team-logos', 'avatars'));

-- Allow authenticated users to upload
CREATE POLICY "storage_auth_insert" ON storage.objects
  FOR INSERT WITH CHECK (
    auth.role() = 'authenticated'
    AND bucket_id IN ('project-thumbnails', 'assignments', 'team-logos', 'avatars')
  );

-- Allow users to update/delete their own files (filename starts with their user id)
CREATE POLICY "storage_own_update" ON storage.objects
  FOR UPDATE USING (
    auth.role() = 'authenticated'
    AND bucket_id IN ('project-thumbnails', 'assignments', 'team-logos', 'avatars')
  );

CREATE POLICY "storage_own_delete" ON storage.objects
  FOR DELETE USING (
    auth.role() = 'authenticated'
    AND bucket_id IN ('project-thumbnails', 'assignments', 'team-logos', 'avatars')
  );

-- ================================================================
-- MAKE YOUR ACCOUNT AN ADMIN
-- Run this AFTER creating your account through the signup page.
-- Replace 'your_username' with your actual username.
-- ================================================================
-- UPDATE public.profiles SET role = 'admin' WHERE username = 'your_username';
