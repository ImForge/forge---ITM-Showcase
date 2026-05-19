# 🔧 Forge — Setup Checklist

This is for someone who has Supabase **partially set up**.
Go through every item in order.

---

## ✅ STEP 1 — Get Your Supabase Keys

1. Go to **[supabase.com](https://supabase.com)** → Your project
2. Click **Settings** (gear icon, bottom left) → **API**
3. Copy:
   - **Project URL** → looks like `https://abcdefgh.supabase.co`
   - **Anon (public) key** → long string starting with `eyJ...`
4. Open `forge/.env.local` and paste:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://abcdefgh.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...your_anon_key...
   ```

---

## ✅ STEP 2 — Run the SQL Schema

**This is the most important step.** It creates every table, policy, trigger, and function.

1. In Supabase → click **SQL Editor** (left sidebar)
2. Click **New Query**
3. Open `forge/SUPABASE_SETUP.sql` → copy the entire contents
4. Paste into the SQL editor
5. Click **Run** (green button, top right)
6. You should see: `Success. No rows returned`

If you get errors about tables already existing, that's okay —
the `IF NOT EXISTS` clauses protect you. Just make sure it runs without `ERROR` lines.

---

## ✅ STEP 3 — Create Storage Buckets

Storage is where thumbnails, avatars, and assignment files are stored.

1. In Supabase → click **Storage** (left sidebar)
2. Click **New Bucket** and create each one:

   | Bucket Name          | Public? |
   |----------------------|---------|
   | `project-thumbnails` | ✅ Yes  |
   | `assignments`        | ✅ Yes  |
   | `team-logos`         | ✅ Yes  |
   | `avatars`            | ✅ Yes  |

   ⚠️ The names must be **exact** — lowercase, hyphens, no spaces.
   ⚠️ Toggle **Public bucket** ON for all four.

---

## ✅ STEP 4 — Configure Auth (Email/OTP)

Forge uses OTP (magic link / email code) for signup. Check these settings:

1. In Supabase → **Authentication** → **Providers**
2. Make sure **Email** is **enabled**

3. Click **Authentication** → **Email Templates** (optional but recommended)
   - You can customize the OTP email template here

4. **SMTP (for real emails):**
   - By default Supabase sends from their test domain (rate limited)
   - For production, go to **Authentication** → **SMTP Settings**
   - Add your Resend or SendGrid credentials
   - Resend is free and works well: [resend.com](https://resend.com)

5. Under **Authentication** → **URL Configuration**:
   - **Site URL**: `http://localhost:3000` (change to your Vercel URL after deploy)
   - **Redirect URLs**: Add `http://localhost:3000/**` and `https://your-app.vercel.app/**`

---

## ✅ STEP 5 — Make Yourself an Admin

After you've run the SQL and signed up through the app:

1. Go to Supabase → **SQL Editor** → **New Query**
2. Run this (replace `your_username` with your actual username):
   ```sql
   UPDATE public.profiles SET role = 'admin' WHERE username = 'your_username';
   ```
3. Now the **Admin** link appears in your sidebar

---

## ✅ STEP 6 — Install and Run Locally

```bash
# In the forge/ folder:
npm install

# Start dev server
npm run dev
```

Open **http://localhost:3000**

You should see the Forge homepage with the warm cream sidebar.

---

## ✅ STEP 7 — Deploy to Vercel

1. Push your code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial Forge build"
   git remote add origin https://github.com/YOUR_USERNAME/forge
   git push -u origin main
   ```

2. Go to **[vercel.com](https://vercel.com)** → Import Project → Select your repo

3. In Vercel project settings → **Environment Variables**, add:
   ```
   NEXT_PUBLIC_SUPABASE_URL     = your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY = your_anon_key
   ```

4. Click **Deploy**

5. After deploy: go back to Supabase → **Authentication** → **URL Configuration**
   and add your Vercel URL to Redirect URLs:
   ```
   https://your-app.vercel.app/**
   ```

---

## 🔍 Troubleshooting

### "relation does not exist" error
→ The SQL schema wasn't run. Go to Step 2 and run it.

### OTP email not arriving
→ Check spam folder. In dev, Supabase rate-limits to 3 OTPs/hour.
  You can also check **Authentication** → **Users** in Supabase to see if the user was created.

### Images not showing
→ Check that your storage buckets are set to **Public**.

### "Failed to fetch" / network errors
→ Check your `.env.local` has the correct URL and anon key (no trailing spaces).

### Sidebar not showing
→ Check browser console for errors. Usually a missing env variable.

### Can't log in after signing up
→ In Supabase → Authentication → **Settings** → make sure "Confirm email" is set appropriately.
  For testing, you can disable email confirmation.

---

## 📁 File Structure

```
forge/
├── app/
│   ├── (auth)/          # Login + signup pages (no sidebar)
│   │   ├── login/
│   │   └── signup/
│   ├── (main)/          # All main pages (with sidebar)
│   │   ├── page.tsx     # Homepage
│   │   ├── projects/
│   │   ├── teams/
│   │   ├── assignments/
│   │   ├── profile/
│   │   └── docs/
│   ├── admin/           # Admin dashboard
│   ├── globals.css      # Design system + CSS variables
│   └── layout.tsx       # Root layout (html + body)
├── components/
│   ├── layout/          # Sidebar, MainContent
│   ├── projects/        # ProjectCard, ProjectActions, BuildOnSelector
│   └── ui/              # Toast
├── lib/
│   ├── supabase/        # client.ts, server.ts, middleware.ts
│   └── types/           # database.ts (all TypeScript types)
├── proxy.ts             # Next.js 16 middleware (named proxy, not middleware)
├── .env.local           # Your Supabase keys (never commit this)
├── SUPABASE_SETUP.sql   # Run this in Supabase SQL Editor
└── SETUP_CHECKLIST.md   # This file
```
