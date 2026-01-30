
Goal
- Remove all Supabase-related code and configuration from the repository so the app becomes purely frontend-only for now, while keeping your existing Supabase database/data untouched.

What “remove all Supabase stuff” will mean (based on your selections)
- Remove Supabase from the codebase (no client, no types, no imports).
- Remove Supabase config/migrations from the repo (the `supabase/` folder and migration SQL files).
- Remove Supabase keys/config from the repo (the `.env` file in this project).
- Attempt to “disconnect” the project from Supabase: this part is not something I can guarantee from code alone; it typically requires changing project settings outside the repo. I will document what to do and where to check.

Important notes (so nothing surprises you)
- This will NOT delete your Supabase database objects (tables, bucket, roles) because you explicitly chose “Keep database as-is”.
- Even after removing Supabase from the repo, your Lovable project may still have Supabase secrets/integration attached at the workspace/project level. Removing repo files does not necessarily remove those settings.

Step 1 — Audit current Supabase usage (to ensure we won’t break the build)
- Confirm where Supabase is referenced:
  - Currently, Supabase usage appears isolated to `src/integrations/supabase/client.ts` and `src/integrations/supabase/types.ts`
  - No other app code imports `@/integrations/supabase/client` (so removal should not break runtime behavior)
- Confirm dependencies:
  - `@supabase/supabase-js` is present in `package.json`

Step 2 — Remove Supabase integration code (frontend)
- Delete `src/integrations/supabase/` entirely:
  - `src/integrations/supabase/client.ts`
  - `src/integrations/supabase/types.ts`
- Double-check there are no leftover references:
  - Search for: `@/integrations/supabase/client`, `createClient`, `supabase.auth`, `supabase.from`
- Outcome: no TypeScript symbols or imports remain that require Supabase.

Step 3 — Remove Supabase dependency (package.json)
- Remove `@supabase/supabase-js` from `dependencies`.
- Outcome: the app no longer installs Supabase client code.

Step 4 — Remove Supabase repo configuration (migrations + config)
- Delete Supabase config folder:
  - `supabase/config.toml`
  - `supabase/migrations/*` (including the 2 migration files that created roles/tables/policies)
- Outcome: the repository no longer contains infrastructure-as-code for Supabase.

Step 5 — Remove Supabase-related environment/config files in the repo
- Remove the `.env` file currently present in this repo that includes:
  - `VITE_SUPABASE_PROJECT_ID`
  - `VITE_SUPABASE_PUBLISHABLE_KEY`
  - `VITE_SUPABASE_URL`
- Outcome: no Supabase keys remain committed/included in this codebase.

Step 6 — “Disconnect project” guidance (non-code / settings-level)
Because repository edits cannot always detach a Lovable project from its Supabase integration:
- I will check what secrets currently exist in the project (names only) so we can confirm Supabase is still configured at the project level.
- Then I will provide exact guidance on where to remove/disable the Supabase integration in your Lovable project settings (if available), or the practical alternative:
  - Create a new Lovable project without Supabase connected, then copy the frontend code over (cleanest “hard disconnect” option).

Verification (how we’ll confirm it’s fully removed from the codebase)
- Build/TypeScript sanity:
  - No missing module error for `@supabase/supabase-js`
  - No import path errors referencing `src/integrations/supabase/*`
- Repo sanity:
  - `src/integrations/supabase/` no longer exists
  - `supabase/` no longer exists
  - `.env` no longer exists
- Functional sanity:
  - App still loads at `/` without console errors

Potential follow-up (when you’re ready to “talk about it later”)
- Re-adding Supabase is straightforward:
  - restore `src/integrations/supabase/client.ts` (or regenerate it)
  - reinstall `@supabase/supabase-js`
  - optionally restore migrations (or manage schema in Supabase dashboard)

Implementation scope summary (what I will change in the next step once we switch back to editing mode)
- Remove:
  - `src/integrations/supabase/client.ts`
  - `src/integrations/supabase/types.ts`
  - `supabase/config.toml`
  - `supabase/migrations/*.sql`
  - `.env`
- Update:
  - `package.json` to remove `@supabase/supabase-js`
- Verify:
  - No remaining “supabase” references in `src/`

