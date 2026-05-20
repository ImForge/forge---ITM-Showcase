# Forge — Knowledge doesn't graduate.

Forge is the permanent project-sharing and knowledge-preservation platform for ITM University Raipur. Every project submitted outlives its creator's time here — available for every future student to discover, study, and build upon.

---

## What it does

- **Archive projects** — Students submit their work permanently. Solo or team, with documentation, GitHub links, live demos, and faculty guide attribution.
- **Build-on system** — Projects can be linked to previous student work, creating a visible knowledge lineage tree across batches and years.
- **Teams** — Create or join teams, invite members, share resources (GitHub, Figma, Drive), submit collaborative projects.
- **Assignments** — Upload and share academic resources publicly or keep them private.
- **Admin panel** — Approve/reject submissions, manage tags, manage users.

---

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 15.3.2 (App Router, TypeScript, Turbopack) |
| Database | Supabase (PostgreSQL + RLS) |
| Auth | Supabase Auth (OTP email flow) |
| Storage | Supabase Storage |
| Styling | Tailwind CSS v4 + inline CSS variables |
| Fonts | Cormorant Garamond + DM Sans (next/font) |
| Deployment | Vercel |

---

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/imforge/forge.git
cd forge
npm install
```

### 2. Set up environment variables

Create a `.env.local` file in the root:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Get these from your Supabase project → Settings → API.

### 3. Set up Supabase

1. Run `SUPABASE_SETUP.sql` in Supabase → SQL Editor — creates all tables, RLS policies, triggers, and RPCs.
2. Run `MIGRATION_001_branches_teams_docs.sql` for program/branch/documentation fields.
3. Create these storage buckets in Supabase → Storage (all Public):
   - `project-thumbnails`
   - `assignments`
   - `team-logos`
   - `avatars`
   - `project-docs`

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 5. Make yourself an admin

After signing up, run this in Supabase SQL Editor:

```sql
UPDATE profiles SET role = 'admin' WHERE username = 'your_username';
```

---

## Project Structure

```
forge/
├── app/
│   ├── (auth)/              # Login + signup (no sidebar)
│   │   ├── login/
│   │   └── signup/
│   ├── (main)/              # All main pages (with sidebar)
│   │   ├── page.tsx         # Homepage — cinematic archive
│   │   ├── projects/        # Browse, submit, detail, edit
│   │   ├── teams/           # Teams list + workspace
│   │   ├── assignments/     # Public + private assignments
│   │   ├── build-on/        # Knowledge lineage tree
│   │   ├── profile/         # Public profile + settings
│   │   └── docs/            # About Forge
│   ├── admin/               # Admin dashboard
│   ├── globals.css          # Design system + CSS variables
│   └── layout.tsx           # Root layout (html + body + fonts)
├── components/
│   ├── layout/              # SidebarClient, MainContent
│   ├── projects/            # ProjectActions, BuildOnSelector
│   ├── profile/             # ProfileClient (all interactive cards)
│   └── ui/                  # Toast, Greeting, TrendingCard
├── lib/
│   ├── supabase/            # client.ts, server.ts, middleware.ts
│   └── types/               # database.ts — all TypeScript types
├── public/
│   └── itm-logo.png
├── proxy.ts                 # Next.js middleware
├── SUPABASE_SETUP.sql       # Full schema — run this first
├── MIGRATION_001_branches_teams_docs.sql
└── .env.local               # Never commit this
```

---

## Key Design Decisions

**No thumbnails** — project cards use deterministic cinematic gradients based on the project title. Keeps the aesthetic consistent and avoids broken image links.

**Server + Client split** — pages that only display data are Server Components (faster, SEO friendly). Pages with filters, forms, or interactivity are Client Components. Event handlers are never passed across the boundary.

**`proxy.ts` not `middleware.ts`** — Next.js 15 naming convention for the middleware file.

**Supabase FK hints** — all joins use explicit FK hints (e.g. `profiles!projects_submitted_by_fkey`) to avoid ambiguous relationship errors.

**Programs and semesters** — BCA has 6 semesters, B.Tech has 8. The semester dropdown updates based on the selected program. Stored in `profiles.program` and `projects.program`.

---

## Deployment

Deployed on Vercel. After pushing to GitHub, Vercel auto-deploys on every push to `main`.

Environment variables must be set in Vercel → Project Settings → Environment Variables.

After deployment, update Supabase → Authentication → URL Configuration with your Vercel URL.

---


> *"Every project submitted is a letter to the next generation."*
