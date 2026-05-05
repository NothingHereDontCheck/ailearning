# AITrustAudit.com — Claude Code Session Prompt

> Copy and paste this as your FIRST message to Claude Code after navigating to your project directory.
> Before pasting: make sure CLAUDE.md and SPEC.md are in your project root.

---

## Initial Session Prompt (paste this verbatim)

```
Read @CLAUDE.md and @SPEC.md fully before doing anything else.

We are building AITrustAudit.com — a career roadmap platform for people transitioning into AI Security Engineering. The full product spec is in SPEC.md. The project conventions are in CLAUDE.md.

Your first task is to scaffold the project and build the MVP in sequence. Do not skip ahead.

**Before writing any code:**
1. Confirm you've read both files
2. Write a `plan.md` that lists the exact build sequence with checkboxes — follow the MVP Scope section in SPEC.md
3. Ask me if anything in the spec is ambiguous before you start

**Then execute Phase 1 of the build:**

Set up a new Next.js 14 project (App Router, TypeScript strict mode, Tailwind CSS) with this structure:

- Initialize the project: `npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*"`
- Install additional dependencies: `npm install @supabase/supabase-js @supabase/ssr next-mdx-remote gray-matter reading-time`
- Set up the global design system (CSS variables) in `app/globals.css` — use the exact color tokens from SPEC.md
- Add the Google Fonts (DM Serif Display, Outfit, DM Mono) to `app/layout.tsx`
- Create the base UI primitives in `/components/ui/`: Button, Card, Badge, Tag — typed, variant-based
- Build the homepage at `app/(marketing)/page.tsx` with all sections from the prototype:
  - Nav with logo + links + CTA button
  - Hero section with persona selector (localStorage-based toggle)
  - Roadmap preview card (static)
  - Tracks section (two persona cards)
  - Outcomes stats grid
  - Newsletter signup section
  - Footer

Use the visual design from the HTML prototype I provided as the reference. Match the aesthetic: warm parchment background, DM Serif Display headings, sharp corners, warm red accent (#c8401a). The prototype HTML is attached below for reference.

After completing the homepage, run `npm run lint && npm run typecheck` and confirm both pass before stopping.

Then update plan.md to mark completed items and pause for my review.
```

---

## Prototype HTML Reference

Attach the file `aitrustaudit-career.html` to the Claude Code session when you paste the prompt above.
In Claude Code terminal, you can reference it with: `@aitrustaudit-career.html`

---

## Follow-Up Session Prompts

Use these in subsequent sessions to build out remaining features. Always start a new session with:
```
Read @CLAUDE.md and @plan.md. Continue from where we left off.
```

### Session 2 — Blog System
```
Read @CLAUDE.md and @SPEC.md.

Build the blog system:
1. Set up MDX pipeline using next-mdx-remote with gray-matter for frontmatter parsing
2. Create the blog index page at `app/(marketing)/blog/page.tsx` — filterable by persona tag (security-pro / career-changer / all)
3. Create the blog post page at `app/(marketing)/blog/[slug]/page.tsx` — renders MDX with: reading time, persona badge, auto-generated table of contents from headings
4. Write 3 seed blog posts in `/content/blog/` with realistic AI security content (no lorem ipsum). Posts to write:
   - `what-does-ai-security-engineer-do.mdx` (persona: all)
   - `soc-skills-transferable.mdx` (persona: security-pro)
   - `career-changer-realistic-timeline.mdx` (persona: career-changer)

Match the frontmatter schema in SPEC.md exactly.
Run lint + typecheck when done.
```

### Session 3 — Full Roadmap Page
```
Read @CLAUDE.md and @SPEC.md.

Build the full roadmap page at `app/(marketing)/roadmap/page.tsx`:
1. Render all 4 phases and their modules from a static data file at `lib/roadmap-data.ts`
2. Use the Phase and Module types defined in SPEC.md
3. Persona toggle at the top of the page filters visible modules (Track A hides security fundamentals module, Track B shows everything)
4. Modules render as cards showing: title, description, estimated hours, difficulty badge, content type badge
5. Phase progression is shown visually — phases stack vertically with a connecting timeline line
6. This page is read-only/static (no auth yet) — locked modules show a padlock icon but are still visible

Run lint + typecheck when done.
```

### Session 4 — Auth + Progress Tracking
```
Read @CLAUDE.md and @SPEC.md.

Set up Supabase auth and progress tracking:
1. Create Supabase client in `lib/supabase/client.ts` and `lib/supabase/server.ts` using @supabase/ssr
2. Set up the database schema — run the SQL from SPEC.md in the Supabase dashboard (remind me to do this manually — do not try to run it programmatically)
3. Build auth pages: `app/(auth)/login/page.tsx` — magic link only (email input + "Send link" button)
4. Build middleware at `middleware.ts` to protect `/dashboard` and `/roadmap/[moduleId]` routes
5. On successful auth: redirect to `/dashboard`
6. Build the dashboard at `app/(platform)/dashboard/page.tsx` showing:
   - Welcome message with user's persona
   - Overall progress bar
   - Per-phase progress bars
   - "Continue where you left off" button pointing to next incomplete module
7. Wire module completion: clicking "Mark complete" on a module POSTs to `app/api/progress/route.ts` which upserts to `module_completions` table

Enable RLS on all tables — add the policies from SPEC.md security section.
Run lint + typecheck when done.
```

### Session 5 — Newsletter + Email
```
Read @CLAUDE.md and @SPEC.md.

Build the newsletter system:
1. Install Resend: `npm install resend`
2. Create `app/api/newsletter/subscribe/route.ts` — POST endpoint that:
   - Validates email format
   - Inserts to `subscribers` table with confirmed: false
   - Generates a confirmation token (crypto.randomUUID())
   - Sends a confirmation email via Resend with a confirm link
   - Returns 200 with "Check your inbox" message
3. Create `app/api/newsletter/confirm/[token]/route.ts` — GET endpoint that:
   - Looks up token, sets confirmed: true
   - Redirects to a `/subscribed` thank-you page
4. Create `app/api/newsletter/unsubscribe/[token]/route.ts` — no auth required
5. Build the `/subscribed` confirmation page
6. Wire the newsletter form on the homepage to call the subscribe endpoint

Never log or return email addresses in API responses.
Run lint + typecheck when done.
```

### Session 6 — Skills Gap Assessment
```
Read @CLAUDE.md and @SPEC.md.

Build the Skills Gap Assessment:
1. Create the assessment data at `lib/assessment-data.ts` — 15 questions across 3 categories:
   - Security Fundamentals (5 questions — for career changers)
   - AI/ML Concepts (5 questions — for both)
   - Regulatory Awareness (5 questions — for both)
   Each question: { id, question, options: [{text, value}], category, correctValue }
2. Build the assessment UI at `app/(platform)/roadmap/assessment/page.tsx`:
   - One question at a time with progress indicator
   - Clean card-based question layout
   - Back/Next navigation
   - No ability to skip
3. On completion: calculate scores per category (0–1 scale)
4. Show results page: gap report with per-category score bars (green = strong, red = gap)
5. Save result to `assessment_results` table via `app/api/assessment/route.ts`
6. Show recommended track (A or B) based on score

Auth required for this route.
Run lint + typecheck when done.
```

---

## Tips for Working With Claude Code on This Project

- **Start each session fresh** with `Read @CLAUDE.md and @plan.md` — don't assume context carries over
- **Use plan mode** (Shift+Tab) when planning new features before implementing
- **Reference the prototype** with `@aitrustaudit-career.html` when Claude needs visual reference
- **Gate phases** — don't ask Claude Code to build everything at once; one session per feature area
- **Run the verifier** — always end sessions with `npm run lint && npm run typecheck`
- **Commit often** — after each session completes cleanly, `git commit -m "feat: [feature name]"`
- **If Claude goes off-spec** — paste the relevant section of SPEC.md into the chat and say "stick to the spec"
- **Don't over-instruct CLAUDE.md** — it's already at the right length; don't keep adding to it or performance degrades
