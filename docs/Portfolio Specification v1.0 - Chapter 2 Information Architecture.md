# Muhammad Faizan Khan Portfolio Specification v1.0
## Chapter 2 — Information Architecture

**Document status:** Draft  
**Last updated:** 2025  
**Author:** Muhammad Faizan Khan  
**Scope:** This chapter documents the information architecture of the portfolio as currently implemented. It covers page structure, routing, section inventory, content hierarchy, data sources, and navigation model. It does not prescribe design or implementation changes.

---

## 2.1 Site Overview

The portfolio is a single-page application (SPA) built with React, TypeScript, and Vite. It serves one primary purpose: to present Muhammad Faizan Khan as a backend developer candidate to hiring managers and technical leads.

The site has two distinct page types:

| Page type | Route | Purpose |
|---|---|---|
| Home | `/` | Full portfolio — all sections in sequence |
| Case Study | `/work/:slug` | Deep-dive on a single project |
| 404 | `/404` and `*` | Fallback for unmatched routes |

All pages share a persistent layout: Navbar (top, fixed) and Footer (bottom). A SkipLink and ScrollToTop utility are mounted globally.

---

## 2.2 Navigation Model

### 2.2.1 Primary Navigation (Navbar)

The navbar is fixed to the top of the viewport at all times. It contains:

- **Logo / wordmark** — "FK" monogram + "Faizan Khan" text. Links to `/` via React Router `Link`.
- **Nav links** — Four anchor links that scroll to sections on the home page:
  - Projects → `#work`
  - Experience → `#experience`
  - Skills → `#stack`
  - Contact → `#contact`
- **Download CV** — `<a download>` pointing to `/resume.pdf` (file must be present in `/public`).

The navbar has two visual states:
- **Transparent** — when `scrollY <= 24px`. No background, no border.
- **Frosted** — when `scrollY > 24px`. Background `rgba(9,9,11,0.85)`, `blur(20px) saturate(180%)`, bottom border visible.

On viewports <= 767px, the desktop nav is hidden and replaced by a hamburger toggle. Tapping the toggle opens a full-width mobile drawer that slides in below the navbar. The drawer contains the same four nav links plus the Download CV button. The drawer closes on route change.

### 2.2.2 Footer Navigation

The footer contains a secondary navigation column ("Navigation") with four anchor links mirroring the navbar:
- Projects → `#work`
- Experience → `#experience`
- Skills → `#stack`
- Contact → `#contact`

A second column ("Connect") contains three external/action links:
- GitHub → `https://github.com/mfaizanx7` (opens in new tab)
- LinkedIn → `https://www.linkedin.com/in/muhammad-faizan-khan-x7/` (opens in new tab)
- Email → `mailto:mfaizanx10@gmail.com`

### 2.2.3 In-Page Scroll Anchoring

All section `id` attributes are registered as scroll targets. `scroll-padding-top` is set to `var(--navbar-h)` globally so that anchor navigation accounts for the fixed navbar height.

---

## 2.3 Home Page — Section Inventory

The home page renders seven sections in the following order. Each section is a discrete React component. Sections are stacked vertically with no horizontal layout between them.

```
HomePage
├── Hero
├── About
├── SelectedWork
├── Experience
├── TechStack
├── Contact
└── (Footer — rendered by Layout, not HomePage)
```

> Note: The specification chapter order (Hero, Trust Strip, Selected Projects, Professional Experience, Technical Skills, About Me, Contact, Footer) reflects the intended logical grouping. The current implementation renders About before SelectedWork. This discrepancy is noted here and is a candidate for resolution in a future revision.

---

## 2.4 Section Specifications

---

### 2.4.1 Hero

**Section ID:** `hero`  
**Component:** `src/components/sections/Hero.tsx`  
**Data source:** `meta` object from `src/data/index.ts`

**Purpose:** First impression. Establishes identity, role, and availability. Provides primary calls to action.

**Content hierarchy (left column):**

| Level | Element | Content | Source |
|---|---|---|---|
| 1 | Availability badge | "Available now · Open to full-time roles" | `meta.availableFor` |
| 2 | H1 — Name | "Muhammad Faizan Khan" | `meta.name` |
| 3 | Role | "Backend Developer" | `meta.role` |
| 4 | Headline | "Building production-ready backend systems with Laravel, PHP and MySQL." | Hardcoded in component |
| 5 | Description | "I build CMS platforms, REST APIs, admin panels and business web applications focused on clean architecture, maintainability and performance." | Hardcoded in component |
| 6 | CTAs | View Projects · Download CV · GitHub · LinkedIn | Mixed: `meta.resumeUrl`, `meta.github`, `meta.linkedin` |

**CTA inventory:**

| Button | Type | Destination | Behaviour |
|---|---|---|---|
| View Projects | Primary | `#work` | Anchor scroll |
| Download CV | Secondary | `/resume.pdf` | `<a download>` |
| GitHub | Secondary | `https://github.com/mfaizanx7` | Opens new tab |
| LinkedIn | Secondary | `https://www.linkedin.com/in/muhammad-faizan-khan-x7/` | Opens new tab |

**Right column (MetaPanel):**

A structured metadata panel visible only on viewports >= 900px (`aria-hidden`). Contains five rows:

| Label | Value |
|---|---|
| Location | Islamabad, Pakistan |
| Availability | Open to full-time roles |
| Focus | Backend · Laravel · PHP · MySQL |
| Experience | 2 internships · 6 projects |
| Stack | Laravel, PHP, MySQL, Node.js, React.js |

All values in the MetaPanel are hardcoded in the component. They are not sourced from `meta` or `data/index.ts`.

**Layout:** Two-column grid (`1.1fr 0.9fr`) on >= 900px. Single column on mobile (right column hidden).

**Animation:** Framer Motion stagger on left column children (7 items, 70ms stagger, 50ms delay). MetaPanel fades in at 450ms delay.

---

### 2.4.2 Trust Strip

**Status:** Not currently implemented as a discrete section.

The trust signals that would constitute a Trust Strip are distributed across other sections:
- Availability status → Hero badge
- Company names (NIBAF, Creative IT Park) → Experience section
- Project count and internship count → About section stats cards

If a Trust Strip section is added in future, it would sit between Hero and Selected Projects and surface: company logos or names, project count, years of experience, and availability status in a compact horizontal band.

---

### 2.4.3 Selected Projects

**Section ID:** `work`  
**Component:** `src/components/sections/SelectedWork.tsx`  
**Data source:** `allProjects` array from `src/data/index.ts` (all 6 projects; `featured` flag exists but is `false` on all entries)

**Purpose:** Demonstrate the breadth and depth of project work. Each card is an entry point to a full case study.

**Section header:**
- Section label: "Projects" (11px, uppercase, accent colour)
- H2: "Things I've built"

**Card structure (per project):**

| Element | Content | Source |
|---|---|---|
| Project number | "01" – "06" | `project.number` |
| Title | e.g. "Creative IT Park Website" | `project.title` |
| Tagline | 2-line clamped description | `project.tagline` |
| Stack chips | Up to 4 chips | `project.stack.slice(0, 4)` |
| Case Study button | Links to `/work/:slug` | `project.slug` (React Router `Link`) |
| GitHub button | Conditionally rendered | `project.githubUrl` (optional) |
| Live Demo button | Conditionally rendered | `project.liveUrl` (optional) |

**Current link state across all 6 projects:**

| # | Title | Case Study | GitHub | Live Demo |
|---|---|---|---|---|
| 01 | Creative IT Park Website | `/work/creative-it-park-website` | — | `https://creativeitpark.org` |
| 02 | ODSports CMS | `/work/odsports-cms` | — | — |
| 03 | Perfect Doors CMS | `/work/perfect-doors-cms` | — | — |
| 04 | Thrive Enterprise Portal | `/work/thrive-enterprise-portal` | — | — |
| 05 | Worknex Chat App | `/work/worknex-chat` | — | — |
| 06 | Reachfy Web App | `/work/reachfy` | — | — |

No project currently has a `githubUrl`. Only project 01 has a `liveUrl`.

**Progressive disclosure:** The grid initially shows 3 projects. A "Show N more projects" button reveals the remaining entries using `AnimatePresence`. Once expanded, the button disappears.

**Grid layout:** `repeat(auto-fill, minmax(min(100%, 300px), 1fr))`. Cards stretch to equal height within each row.

---

### 2.4.4 Professional Experience

**Section ID:** `experience`  
**Component:** `src/components/sections/Experience.tsx`  
**Data source:** `experiences` array from `src/data/index.ts` (2 entries)

**Purpose:** Document professional history with verifiable, measurable detail. Demonstrate ownership, technical depth, and problem-solving.

**Section header:**
- Section label: "Experience" (11px, uppercase, accent colour)
- H2: "Where I've worked"

**Experience entries (in order):**

| Field | NIBAF | Creative IT Park |
|---|---|---|
| Company | NIBAF | Creative IT Park |
| Role | Backend Developer Intern | Backend Developer Intern |
| Period | Oct 2024 – Jan 2025 | Jun 2024 – Sep 2024 |
| Location | Islamabad, Pakistan | Islamabad, Pakistan |
| Stack | Laravel · PHP · MySQL · REST APIs · Laravel Sanctum · Git | Laravel · PHP · MySQL · Blade · Git |

**Card structure (per entry):**

1. **Card header** — Company name + "Internship" badge (left), period + location (right)
2. **Summary line** — `exp.description` from data. Scope overview in 1–2 sentences. Separated from bullets by a bottom border.
3. **Bullet list** — Hardcoded in `Experience.tsx` (not sourced from `data/index.ts`). Each bullet has an optional inline tag badge.
4. **Stack chips** — Parsed from `exp.stack` (delimiter: ` · `). Monospace, 11px.

**Bullet inventory:**

NIBAF (5 bullets):

| Bullet | Tag |
|---|---|
| Designed role-based permissions schema (3 tables; new role = DB insert only) | Architecture |
| Reduced slowest query from ~800ms to ~90ms via eager loading + composite indexes | Database |
| Built custom exception handler normalising 422/401/500 into one envelope | REST API |
| Wrote full API spec in Markdown before coding; frontend built independently | REST API |
| Owned backend on both projects within a team of 4 | — |

Creative IT Park (4 bullets):

| Bullet | Tag |
|---|---|
| Deployed company website to production; resolved PHP 8.1 to 7.4 mismatch; documented checklist | Production |
| Added article management + content scheduling to ODSports CMS | CMS |
| Built Intervention Image pipeline generating 3 sizes on upload (200/600/1200px) | CMS |
| Extended two existing codebases without breaking existing functionality | — |

**Tag colour system:**

| Tag | Colour |
|---|---|
| Production | Green `#34D399` |
| REST API | Blue `#60A5FA` |
| Database | Purple `#A78BFA` |
| CMS | Amber `#F59E0B` |
| Architecture | Red `#F87171` |

Bullet dot colour matches its tag colour. Untagged bullets use `var(--color-subtle)` at 40% opacity.

---

### 2.4.5 Technical Skills

**Section ID:** `stack`  
**Component:** `src/components/sections/TechStack.tsx`  
**Data source:** Hardcoded in component (not sourced from `data/index.ts`)

**Purpose:** Communicate the technology surface area clearly. Grouped by category so a reader can assess fit at a glance.

**Section header:**
- Section label: "Skills" (11px, uppercase, accent colour)
- H2: "Tech stack"

**Skill groups (4 cards):**

| Group | Colour | Skills |
|---|---|---|
| Backend | Blue `#3B82F6` | Laravel, PHP, Node.js, Express.js, REST APIs, Laravel Sanctum |
| Frontend | Purple `#A78BFA` | React.js, JavaScript, Blade Templates, HTML, CSS |
| Database | Green `#34D399` | MySQL, Database Design, Query Optimization, Migrations, Eloquent ORM |
| Tools & Deployment | Amber `#F59E0B` | Git, GitHub, Postman, Laravel Debugbar, Intervention Image, Linux CLI, Composer |

**Layout:** `repeat(auto-fill, minmax(min(100%, 260px), 1fr))`. Each card has equal height within its row.

**Note on data source discrepancy:** `src/data/index.ts` contains a `stackGroups` array and a `currently` object that are not consumed by `TechStack.tsx`. The component uses its own hardcoded `GROUPS` array. These two representations are not in sync. The `stackGroups` data distinguishes between "Primary" (production experience) and "Familiar with" (coursework only) — a distinction that the current component does not surface.

---

### 2.4.6 About Me

**Section ID:** `about`  
**Component:** `src/components/sections/About.tsx`  
**Data source:** Hardcoded in component (not sourced from `data/index.ts`)

**Purpose:** Provide a human-readable summary of background, motivation, and availability. Reinforce trust signals with quantified stats.

**Section header:**
- Section label: "About" (11px, uppercase, accent colour)
- H2: "Backend developer based in Islamabad"

**Body copy (2 paragraphs, hardcoded):**
1. Summary of experience: internships, project types, tech stack.
2. Working philosophy and job search intent.

**Stats cards (4 cards, 2x2 grid):**

| Value | Label | Sub-label | Colour |
|---|---|---|---|
| 6+ | Production Projects | CMS, APIs, portals, real-time apps | Blue `#3B82F6` |
| 2 | Professional Internships | Creative IT Park · NIBAF | Purple `#A78BFA` |
| Backend | Focused Tech Stack | Laravel · PHP · MySQL · REST APIs | Green `#34D399` |
| Open | to Full-Time Opportunities | Available immediately · Islamabad, PK | Amber `#F59E0B` |

**Layout:** Two-column grid on >= 900px (text left, stats right). Single column on mobile.

---

### 2.4.7 Contact

**Section ID:** `contact`  
**Component:** `src/components/sections/Contact.tsx`  
**Data source:** `meta` object from `src/data/index.ts`

**Purpose:** Convert a qualified visitor into a direct contact. Reduce friction to reaching out.

**Section header:**
- Section label: "Contact" (11px, uppercase, accent colour)
- H2: "Let's work together"

**Contact note (sourced from `meta.contactNote`):**
> "I'm looking for a backend role where the codebase is something people are proud of. Laravel, PHP, MySQL. Available immediately."

**Primary CTA — Email button:**
- Displays `meta.email` (`mfaizanx10@gmail.com`)
- On click: copies email to clipboard using `useCopyToClipboard` hook (2000ms reset)
- State change on copy: icon switches from mail to checkmark, text switches to "Copied!", colour switches to green
- Does not open a mailto link. Copy-to-clipboard only.

**Secondary CTAs (3 links):**

| Label | Destination | Behaviour |
|---|---|---|
| GitHub | `meta.github` | Opens new tab |
| LinkedIn | `meta.linkedin` | Opens new tab |
| Resume | `meta.resumeUrl` | `<a download>` |

**Layout:** Single centred container card. Full-width on all breakpoints. Max content width constrained by padding (`clamp(2.5rem, 5vw, 4.5rem)`).

---

### 2.4.8 Footer

**Component:** `src/components/layout/Footer.tsx`  
**Data source:** `meta` object from `src/data/index.ts`

**Purpose:** Persistent closing element. Provides secondary navigation and social links. Establishes copyright.

**Structure:**

Top row (two columns):
- Left: Identity block — `meta.name`, `meta.role · meta.location`
- Right: Two link columns — Navigation and Connect (see Section 2.2.2)

Bottom row:
- Left: `© {year} Muhammad Faizan Khan. All rights reserved.`
- Right: "Built with React · TypeScript · Vite"

The year is computed dynamically from `new Date().getFullYear()`.

---

## 2.5 Case Study Page

**Route:** `/work/:slug`  
**Component:** `src/pages/CaseStudyPage.tsx`  
**Data source:** `allProjects` array from `src/data/index.ts`, matched by `slug` parameter

**Purpose:** Full narrative on a single project. Intended for a hiring manager or technical lead who wants to understand how the candidate thinks, not just what they built.

**Content structure per case study (sourced from `Project` interface):**

| Field | Description |
|---|---|
| `title` | Project name |
| `number` | Display number ("01"–"06") |
| `context` | One-line context (internship/personal, live/internal) |
| `tagline` | What/who/problem/tech summary |
| `stack` | Technology array |
| `liveUrl` | Optional live link |
| `githubUrl` | Optional repository link |
| `problem` | What problem existed before this was built |
| `myRole` | Specific ownership and scope |
| `technicalApproach` | How it was built, with schema and code detail |
| `challenges` | Array of `{ title, description, solution }` |
| `takeaways` | What was learned |
| `whereItBreaksDown` | Honest assessment of current limitations |

All 6 case study pages are accessible at their respective slugs. No project currently has a `githubUrl`. Only project 01 (`creative-it-park-website`) has a `liveUrl`.

---

## 2.6 Data Architecture

### 2.6.1 Central Data File

All content is managed from a single file: `src/data/index.ts`.

**Exports:**

| Export | Type | Consumed by |
|---|---|---|
| `meta` | `SiteMeta` | Hero, Contact, Footer, Navbar |
| `navItems` | `NavItem[]` | Not currently consumed |
| `experiences` | `ExperienceItem[]` | Experience |
| `stackGroups` | `StackGroup[]` | Not currently consumed |
| `currently` | `Currently` | Not currently consumed |
| `projects` | `Project[]` | SelectedWork, CaseStudyPage |
| `featuredProjects` | `Project[]` (filtered) | Not currently consumed |
| `supportingProjects` | `Project[]` (filtered) | Not currently consumed |
| `allProjects` | `Project[]` | SelectedWork, CaseStudyPage |

### 2.6.2 Hardcoded Content (not in data file)

The following content is hardcoded directly in component files and is not managed through `src/data/index.ts`:

| Content | Location |
|---|---|
| Hero headline and description | `Hero.tsx` |
| MetaPanel rows (Location, Availability, Focus, Experience, Stack) | `Hero.tsx` |
| About body copy (2 paragraphs) | `About.tsx` |
| About stats cards (4 entries) | `About.tsx` |
| Experience bullets and tag assignments | `Experience.tsx` |
| TechStack skill groups (4 groups, all skills) | `TechStack.tsx` |
| Navbar nav links | `Navbar.tsx` |
| Footer nav links | `Footer.tsx` |

### 2.6.3 Unused Data

The following fields and exports exist in `src/data/index.ts` but are not consumed by any component:

| Item | Reason not consumed |
|---|---|
| `navItems` | Navbar uses its own hardcoded `NAV_LINKS` array |
| `stackGroups` | TechStack uses its own hardcoded `GROUPS` array |
| `currently` | No section renders this data |
| `featuredProjects` | `featured` is `false` on all projects; no component uses this filter |
| `supportingProjects` | Same as above |
| `meta.specialization` | Not rendered anywhere |
| `meta.headline` | Not rendered anywhere (Hero uses hardcoded headline) |
| `meta.subheadline` | Not rendered anywhere |
| `ExperienceItem.teamSize` | Not rendered in Experience section |
| `ExperienceItem.highlight` | Not rendered in Experience section |

---

## 2.7 Routing Summary

| Route | Component | Notes |
|---|---|---|
| `/` | `HomePage` | Renders all sections in sequence |
| `/work/:slug` | `CaseStudyPage` | Slug matched against `project.slug` in data |
| `/404` | `NotFoundPage` | Explicit 404 route |
| `*` | `NotFoundPage` | Catch-all fallback |

React Router v6 (`BrowserRouter`). `ScrollToTop` component resets scroll position on route change.

---

## 2.8 Open Issues

The following discrepancies between the data model and the implementation are noted for resolution:

| # | Issue | Location | Impact |
|---|---|---|---|
| 1 | `navItems` in data is unused; Navbar has its own hardcoded nav links | `Navbar.tsx`, `data/index.ts` | Two sources of truth for navigation |
| 2 | `stackGroups` in data is unused; TechStack has its own hardcoded groups | `TechStack.tsx`, `data/index.ts` | Two sources of truth for skills |
| 3 | `currently` object in data is unused | `data/index.ts` | Dead data |
| 4 | `meta.headline` and `meta.subheadline` are unused | `Hero.tsx`, `data/index.ts` | Hero uses hardcoded strings instead |
| 5 | MetaPanel values are hardcoded, not sourced from `meta` | `Hero.tsx` | Changes to location/availability require edits in two places |
| 6 | Experience bullets are hardcoded in component, not in data | `Experience.tsx` | Content and data are split across files |
| 7 | `featured` flag is `false` on all projects; filtered exports are unused | `data/index.ts` | Flag has no effect |
| 8 | `ExperienceItem.teamSize` and `.highlight` are populated but never rendered | `Experience.tsx` | Data exists but is invisible to the user |
| 9 | About section renders before SelectedWork in the DOM, but the spec order places About after Contact | `HomePage.tsx` | Section order in code does not match specification order |
| 10 | `/resume.pdf` does not exist in `/public` | `public/` | Download CV and Resume links will 404 |

---

*End of Chapter 2 — Information Architecture*
