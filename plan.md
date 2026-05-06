# AITrustAudit.com — Build Plan

## Stack
- **Framework:** Next.js 15 (App Router, TypeScript strict)
- **Styling:** Tailwind CSS + CSS variables
- **Content:** MDX (bundled at build time via next-mdx-remote/rsc)
- **Database:** Cloudflare D1 (SQLite, native Workers binding)
- **Auth:** Custom magic-link auth — tokens + sessions in D1, signed cookie
- **Email:** Resend (magic links + newsletter confirmation)
- **Deployment:** Cloudflare Workers via @opennextjs/cloudflare
- **Dev tooling:** Wrangler

---

## Phase 1 — Foundation ✅ Complete
- [x] Next.js 15 scaffold (TS strict, Tailwind, App Router)
- [x] Dependencies installed
- [x] Cloudflare config: wrangler.toml, @opennextjs/cloudflare, D1 binding
- [x] Design system: globals.css + fonts in layout.tsx
- [x] UI primitives: Button, Card, Badge, Tag
- [x] Homepage (Nav, Hero, Tracks, Roadmap preview, Content types, Outcomes, Blog preview, Newsletter, Footer)
- [x] D1 schema: users, sessions, auth_tokens, module_completions, subscribers, assessment_results

---

## Phase 2 — Blog System ✅ Complete
- [x] `lib/mdx.ts`: getAllPosts, getRawPost, extractToc, slugify
- [x] Blog index page: `/app/(marketing)/blog/page.tsx`
- [x] Client filter: `app/(marketing)/blog/BlogList.tsx` (persona tabs)
- [x] Blog post page: `/app/(marketing)/blog/[slug]/page.tsx` (MDX + ToC + reading time)
- [x] Prose styles in globals.css
- [x] 3 seed posts in `/content/blog/`

---

## Phase 3 — Full Roadmap Page ✅ Complete
- [x] `lib/roadmap-data.ts` (4 phases, 9 modules, full metadata)
- [x] `app/(marketing)/roadmap/page.tsx` (async, reads ?track= searchParam)
- [x] `app/(marketing)/roadmap/RoadmapContent.tsx` (client component)
- [x] Persona toggle — Track A filters Module 1A (career-changer only)
- [x] Timeline with phase dots and connecting spine
- [x] Phase 1 unlocked; Phases 2–4 show padlock + "Unlocks after 80%" banner
- [x] ?track= URL param pre-seeds persona from Hero CTAs

---

## Phase 4 — Auth + Progress Tracking ✅ Complete
- [x] Auth pages: `/app/(auth)/login/page.tsx` (magic link only)
- [x] API route: `/app/api/auth/send-link/route.ts` (token → D1 → Resend)
- [x] API route: `/app/api/auth/verify/route.ts` (validate → session → cookie)
- [x] Middleware: protect `/dashboard` and `/api/progress`
- [x] Dashboard: `/app/(platform)/dashboard/page.tsx`
- [x] API route: `/app/api/progress/route.ts` (upsert module_completions)
- [x] Sign out endpoint

---

## Phase 5 — Newsletter + Email ✅ Complete
- [x] POST `/api/newsletter/subscribe` (validate → D1 → Resend confirmation)
- [x] GET `/api/newsletter/confirm/[token]` (verify → confirmed → redirect)
- [x] GET `/api/newsletter/unsubscribe/[token]` (no auth required)
- [x] `/subscribed` thank-you page
- [x] Wire homepage newsletter form to live endpoint

---

## Phase 6 — Skills Gap Assessment ✅ Complete
- [x] `lib/assessment-data.ts` (15 questions, 3 categories, scoring)
- [x] `/app/(marketing)/assessment/page.tsx` (public, no login required)
- [x] `AssessmentClient.tsx` (progress bar, grouped questions, animated results)
- [x] POST `/api/assessment/route.ts` (score → D1, updates user.persona)

---

## Post-MVP
- [ ] Browser-based lab environment
- [ ] Portfolio project tracker
- [ ] Community features
