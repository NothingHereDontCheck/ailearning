# AITrustAudit.com — Product Specification

## Vision
A career platform that turns "I want to get into AI security" into "I just got hired as an AI Security Engineer." Structured, opinionated, and honest — not a link aggregator, not a bootcamp, not a thought leadership blog.

---

## Target Personas

### Persona A — The Security Pro
- Background: SOC analyst, pentester, blue teamer, security engineer, compliance/GRC
- Skills they have: threat modeling, incident response, vuln management, SIEM, network security
- Skills gap: ML/AI fundamentals, LLM-specific attack surfaces, AI audit methodology, agent security
- Motivation: job market signal, salary uplift, staying relevant
- Timeline expectation: 3–5 months to job-ready
- Tone they respond to: peer-to-peer, no hand-holding, get to the point

### Persona B — The Career Changer
- Background: healthcare, legal, finance, military, operations, education, any non-tech field
- Skills they have: domain expertise, communication, risk awareness, process thinking
- Skills gap: everything technical — start from security fundamentals
- Motivation: career change, underemployment, interest in emerging field
- Timeline expectation: 6–9 months to job-ready
- Tone they respond to: welcoming, no condescension, acknowledges their existing value

---

## Design System

### Color Tokens
```css
--bg:       #f5f0e8   /* warm parchment background */
--bg2:      #ede8de   /* slightly darker surface variant */
--surface:  #faf7f2   /* card/panel background */
--ink:      #1a1610   /* near-black heading text */
--ink2:     #3d3528   /* body text */
--muted:    #8c7e6a   /* secondary/helper text */
--border:   #d4c9b4   /* default borders */
--border2:  #bfb39a   /* emphasized borders */
--accent:   #c8401a   /* primary CTA, links, highlights (warm red) */
--accent2:  #1a6cc8   /* info / secondary accent (blue) */
--accent3:  #1a8c5a   /* success / complete states (green) */
--accent4:  #8c1ac8   /* special / premium content (purple) */
--gold:     #c8961a   /* career/job-related content */
```

### Typography
```css
--font-serif: 'DM Serif Display', serif      /* display headings, hero text */
--font-sans:  'Outfit', sans-serif            /* body, UI, buttons */
--font-mono:  'DM Mono', monospace           /* labels, tags, code, metadata */
```

### Spacing & Layout
- Max content width: 1100px
- Section padding: 5rem vertical, 2.5rem horizontal
- Card gap: 1.5px (hairline grid between cards)
- Border radius: 0 (sharp corners throughout — editorial, not soft)
- Box shadow style: offset hard shadow `6px 6px 0 var(--border2)` for featured cards

---

## Site Architecture

### Public Routes (no auth required)
| Route | Description |
|-------|-------------|
| `/` | Homepage — persona selector, roadmap preview, content types, outcomes stats |
| `/roadmap` | Full interactive roadmap (read-only without auth) |
| `/blog` | Blog index |
| `/blog/[slug]` | Individual blog post (MDX) |
| `/tracks/security-pro` | Track A landing page |
| `/tracks/career-changer` | Track B landing page |
| `/about` | About the platform |
| `/newsletter` | Newsletter signup standalone page |

### Auth-Gated Routes (Supabase auth required)
| Route | Description |
|-------|-------------|
| `/dashboard` | Personal progress dashboard |
| `/roadmap/[moduleId]` | Individual module content |
| `/labs/[labId]` | Hands-on security lab |
| `/portfolio` | User's portfolio project tracker |
| `/settings` | Account settings + persona switcher |

---

## Feature Specifications

### 1. Persona Selector (Homepage)
- Two toggle buttons: "Security Pro" and "Career Changer"
- On selection: roadmap preview, estimated timeline, and hero copy updates
- Selection persists to localStorage (and Supabase if logged in)
- On first visit: prompt user to select before showing roadmap content

### 2. Roadmap (Core Feature)
**Structure:**
- 4 Phases, each with 2–4 Modules
- Phase 1 always unlocked; subsequent phases unlock when 80%+ of prior phase completed
- Each module has: title, description, estimated hours, difficulty badge, content type badge, list of resources, and a completion checkbox

**Persona branching:**
- Track A (Security Pro): skips Phase 1 Module 1 (security fundamentals), jumps straight to AI concepts
- Track B (Career Changer): includes full Phase 1 foundation content
- Same data model — `personas` field on each module controls visibility

**Progress tracking:**
- Stored in Supabase `user_progress` table
- Progress bar on dashboard shows % complete per phase and overall
- Completed modules get a visual checkmark; locked modules show padlock

**Phase Content:**

*Phase 1 — Foundation (Weeks 1–4)*
- Module 1A: Skills Gap Assessment (interactive quiz — Track B only)
- Module 1B: How AI Systems Work (6 articles, ~3hrs)
- Module 1C: The AI Security Landscape (guide + overview, ~1hr)

*Phase 2 — Core Skills (Weeks 5–10)*
- Module 2A: Prompt Injection & LLM Attack Techniques (playbook + lab, ~6hrs)
- Module 2B: AI Threat Modeling (templates + walkthrough, ~4hrs)
- Module 2C: ML Supply Chain Security (tool walkthroughs + detection rules, ~3hrs)

*Phase 3 — Applied Practice (Weeks 11–16)*
- Module 3A: Capstone — Audit a Real AI System (guided lab, ~12hrs) [PORTFOLIO PROJECT]
- Module 3B: Build Your AI Security Toolkit (OSS tools setup, ~8hrs) [PORTFOLIO PROJECT]

*Phase 4 — Job Ready (Weeks 17+)*
- Module 4A: Resume & Portfolio for AI Security Roles (templates, ~3hrs)
- Module 4B: Interview Prep — AI Security Edition (question bank + mock scenarios, ongoing)

### 3. Skills Gap Assessment
- Located at `/roadmap/assessment`
- ~15 multiple-choice questions covering: security fundamentals, AI/ML concepts, regulatory awareness
- On completion: generates a gap report showing strong areas (green) vs gaps (red)
- Output feeds into personalized module recommendations
- Stores result in Supabase; re-takeable after 30 days

### 4. Blog System
- MDX files in `/content/blog/`
- Frontmatter schema:
  ```yaml
  title: string
  description: string
  publishedAt: YYYY-MM-DD
  readingTime: number (minutes)
  persona: 'security-pro' | 'career-changer' | 'all'
  tags: string[]
  featured: boolean
  ```
- Blog index: filterable by persona tag
- Each post renders with: estimated read time, persona tag, table of contents (auto-generated from headings), related posts

**Priority blog posts to write first:**
1. "What Does an AI Security Engineer Actually Do All Day?" (persona: all)
2. "Your SOC Skills Are More Transferable Than You Think" (persona: security-pro)
3. "From Career Changer to AI Security: A Realistic Timeline" (persona: career-changer)
4. "The 6 AI Security Certifications Worth Your Time (and 4 That Aren't)" (persona: all)
5. "LLM Red Teaming in 48 Hours: A Crash Course" (persona: security-pro)
6. "Building a Portfolio With No Prior Security Experience" (persona: career-changer)

### 5. Newsletter Signup
- Provider: Resend (email) + custom Supabase table for subscriber management, OR direct integration with Buttondown/ConvertKit
- Capture: email only (no name required — lower friction)
- Double opt-in confirmation email
- Weekly cadence: "The Field Dispatch" — one concept, one skill, one job posting
- Unsubscribe link in every email footer (CAN-SPAM / GDPR compliant)

### 6. Hands-On Labs (Phase 2 — MVP scope)
- Each lab is a structured walkthrough of a deliberately vulnerable AI system
- MVP: iframe embed of a hosted vulnerable app (e.g., a Flask app with intentional prompt injection)
- Each lab has: objectives, setup instructions, guided steps, expected output, debrief section
- Lab completion tracked in Supabase
- Full browser-based lab environment is a post-MVP feature

### 7. Outcomes Stats Section
| Stat | Value | Source note |
|------|-------|-------------|
| Median US salary | $165k | Levels.fyi / LinkedIn 2025 |
| Unfilled global roles | 3.5M | ISC² Workforce Study 2024 |
| YoY job posting growth | 4x | Cyberseek / Indeed 2025 |
| Established degree programs | 0 | "Self-taught legitimately matters" |

---

## Database Schema (Supabase)

```sql
-- Users (extends Supabase auth.users)
create table profiles (
  id uuid references auth.users primary key,
  persona text check (persona in ('security-pro', 'career-changer')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Module completion tracking
create table module_completions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  module_id text not null,
  completed_at timestamptz default now(),
  unique(user_id, module_id)
);

-- Newsletter subscribers
create table subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  confirmed boolean default false,
  subscribed_at timestamptz default now(),
  unsubscribed_at timestamptz
);

-- Assessment results
create table assessment_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  taken_at timestamptz default now(),
  score jsonb not null,  -- { "security": 0.8, "ai_concepts": 0.3, "regulatory": 0.6 }
  recommended_track text
);
```

---

## Content Voice & Brand Guidelines
- **Direct:** Say what you mean. No filler phrases like "In today's rapidly evolving landscape..."
- **Respectful:** Never talk down to beginners. Never assume the reader is stupid.
- **Honest:** If something takes 6 months, say 6 months. Don't say "just a few weeks."
- **Practitioner-first:** Written like someone who's done the job, not someone who read about it
- **No vendor promotion:** Never name specific training providers, bootcamps, or courses as paid endorsements
- **Persona-aware:** Tag content clearly. Don't make career changers feel like they stumbled into a CTF forum.

---

## MVP Scope (Phase 1 Build)
Build these in order:
1. ✅ Homepage (all sections)
2. ✅ Persona selector (localStorage-based, no auth yet)
3. ✅ Roadmap page (static, read-only — no auth required)
4. ✅ Blog system (MDX pipeline + 3 seed posts)
5. ✅ Newsletter signup (Supabase table + Resend confirmation email)
6. ⬜ Auth (Supabase magic link)
7. ⬜ Progress tracking (module completions)
8. ⬜ Dashboard
9. ⬜ Skills Gap Assessment
10. ⬜ Labs (Phase 1 lab embedded)

---

## Security Considerations (Secure by Design)
- All Supabase queries use Row Level Security (RLS) — users can only read/write their own data
- Never expose Supabase service role key client-side — only anon key
- Email addresses in subscribers table: never returned in public API responses
- Assessment results: private to the authenticated user only
- No third-party analytics that sell data (use Plausible or Fathom, not Google Analytics)
- CSP headers configured in `next.config.js`
- All form inputs sanitized before database insertion
- Newsletter unsubscribe must work without authentication (token-based)
