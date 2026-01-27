
Goal
- Guide you to create the 3 Supabase “areas” you described, using the correct Supabase patterns:
  1) Login/Signup: Supabase Auth (no “password table”), plus an optional public.profiles table for extra user info
  2) Contact Us: public.contact_messages table (public can submit, only admins can read)
  3) PDFs/links/videos: public.resources table + Supabase Storage bucket for PDFs (store only file paths/URLs in DB, never file bytes)

Key reality check (important)
- You do NOT create a “login table” that stores emails + passwords.
  - Supabase Auth already stores users securely in its own auth system.
  - Storing passwords yourself is a security risk and will break best practices.
- For admin-only management (your requirement: “Public view, admin manage”), you need an “admin roles” mechanism.
  - Roles must be in a separate table (public.user_roles) with a helper function (public.has_role) to avoid RLS recursion issues.

What we will create (schema overview)
1) public.profiles (optional, but recommended)
Purpose:
- Store extra user-facing information that your UI can read (name, avatar, etc.)
Columns (suggested):
- id uuid primary key (this will equal auth user id)
- display_name text (nullable)
- avatar_url text (nullable)
- created_at timestamptz default now() not null
RLS behavior:
- Users can read their own profile row
- Users can update their own profile row
- Insert is typically handled by a trigger on signup

2) public.contact_messages
Purpose:
- Store “Contact Us” form submissions.
Columns (suggested):
- id uuid primary key default gen_random_uuid()
- email text not null
- message text not null
- created_at timestamptz default now() not null
Optional but useful:
- status text default 'new' (or an enum later: new/handled)
- user_id uuid null (if you later require login, you can store auth.uid())
RLS behavior (matching your choice: “Public submit, private read”):
- INSERT: allowed to anon + authenticated (anyone can submit)
- SELECT: admin only
- UPDATE/DELETE: admin only

3) public.resources
Purpose:
- Store metadata about resources (PDFs, external links, videos), and connect them to projects/tags.
Important: PDFs themselves go to Supabase Storage; this table only stores references (URLs/paths).
Columns (suggested):
- id uuid primary key default gen_random_uuid()
- title text not null
- description text null
- kind text not null  -- e.g. 'pdf' | 'video' | 'link' (we can use an enum later if you want)
- url text null       -- for external links/videos OR for public URL to a PDF
- storage_path text null  -- path inside the bucket if it’s a PDF upload (recommended)
- project_id text null    -- to match your current frontend “p1/p2/p3…” IDs, OR we can make a real projects table later
- category text null      -- simple category or tag group (e.g. Training/Project)
- tags text[] null        -- optional, for flexible tagging
- created_at timestamptz default now() not null
- updated_at timestamptz default now() not null (maintained by a trigger)
RLS behavior (matching your choice: “Public view, admin manage”):
- SELECT: allowed to everyone (anon + authenticated)
- INSERT/UPDATE/DELETE: admin only

Storage (for PDFs)
- Create a Supabase Storage bucket, e.g. “resources” (public = true)
- Upload PDFs to that bucket.
- Store only:
  - the storage path (bucket object key) in public.resources.storage_path, and/or
  - a generated public URL in public.resources.url
Never store PDFs (binary/base64) in database rows.

Admin roles (required to enforce “admin manage” safely)
We will create:
- public.app_role enum: 'admin', 'moderator', 'user'
- public.user_roles table: (user_id, role)
- public.has_role(user_id, role) security definer function
Then apply policies like:
- “Admins can insert/update/delete resources”
- “Admins can read contact_messages”

Step-by-step process you’ll follow (what I will implement once you approve)
Phase A — Database migrations (schema + RLS + triggers)
1) Create roles system:
   - create type public.app_role as enum ('admin','moderator','user')
   - create table public.user_roles (...)
   - enable RLS on public.user_roles
   - create function public.has_role(...)
   - add minimal policies (later we can add a secure admin bootstrap approach)

2) Create public.profiles + trigger:
   - create table public.profiles (...)
   - enable RLS
   - policies: users can select/update their own profile
   - create trigger function in public schema to auto-create a profile row on signup
     - This trigger listens to auth events (we will not modify auth schema directly; the trigger will be created in public and attached appropriately via supported pattern)

3) Create public.contact_messages:
   - create table public.contact_messages (...)
   - enable RLS
   - policies:
     - INSERT: true for anon/auth
     - SELECT/UPDATE/DELETE: public.has_role(auth.uid(), 'admin')

4) Create public.resources:
   - create table public.resources (...)
   - enable RLS
   - policies:
     - SELECT: true for anon/auth
     - INSERT/UPDATE/DELETE: admin only
   - updated_at trigger (public schema) to keep updated_at fresh

5) Create Storage bucket “resources”:
   - insert into storage.buckets (id,name,public) values ('resources','resources',true)
   - add RLS policies on storage.objects so:
     - Anyone can read objects in the 'resources' bucket (public view)
     - Only admins can upload/update/delete objects in 'resources'

Phase B — Frontend wiring (optional, but recommended next)
Your UI currently is “demo auth” (it sets isAuthed=true in local state). That will NOT satisfy admin RLS policies.
To actually manage resources/contact messages from the app, you will need real Supabase Auth in the UI.
Options:
- Option 1 (recommended): Implement real login/signup with Supabase Auth in the existing navbar dialog
- Option 2: Keep UI-only login for now, and manage admin-only tasks in Supabase Dashboard (manual admin)
If you choose Option 2 initially, the tables still work, but your website won’t be able to “admin manage” from the UI yet.

How this maps to your current code
- Projects currently live as hardcoded items in src/pages/Index.tsx (EonicsProjectCarousel items with id p1..p6, plus pdfUrl/videoUrl).
- Training resources currently are hardcoded links in EonicsTrainingGrid.
We can keep them hardcoded now, and later migrate them to public.resources for editing without code changes.

Minimal “what should go in each table” (simple checklist)
1) Login/Signup (profiles table)
- id (user id)
- display_name (optional)
- avatar_url (optional)
- created_at
Do NOT store: password, OTP, reset tokens in public tables.

2) Contact Us (contact_messages table)
- email
- message
- created_at
Optional: status, admin_notes, handled_at

3) Resources (resources table)
- title
- kind (pdf/video/link)
- url (for external links/videos)
- storage_path (for PDFs in Storage)
- category + tags
- project_id (to attach to specific project cards)

Risks / pitfalls to avoid (so you don’t get stuck)
- If you enable RLS but forget policies, inserts will fail with “new row violates row-level security policy”.
- If you try to “check admin” by selecting from the same table inside a policy, you can trigger “infinite recursion detected in policy”. We avoid this by using public.has_role() security definer function.
- Don’t store files in DB—use Storage and keep only references in tables.

Deliverables after implementation (what you will see)
- 3 new public tables (profiles, contact_messages, resources) plus admin role tables/functions
- A new Storage bucket “resources”
- RLS policies matching:
  - Public can submit Contact Us
  - Public can view Resources
  - Only admins can read Contact messages and manage Resources/bucket uploads

Links you’ll use in Supabase Dashboard
- SQL Editor (for visibility): https://supabase.com/dashboard/project/dwnzllhereniufnnvgds/sql/new
- Storage buckets: https://supabase.com/dashboard/project/dwnzllhereniufnnvgds/storage/buckets
- Users: https://supabase.com/dashboard/project/dwnzllhereniufnnvgds/auth/users

Built-in “next features” suggestions (after tables exist)
1) Replace the Navbar demo login/signup with real Supabase Auth (email/password)
2) Create an Admin page in the site to:
   - read contact_messages
   - add/edit resources
   - upload PDFs to the resources bucket
3) Move your hardcoded project pdfUrl/videoUrl into the resources table so you can edit from the dashboard
4) Add filtering/search for resources by category/tags/project
5) Add a lightweight moderation workflow for contact messages (status: new/handled)

