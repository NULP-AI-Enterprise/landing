# CLAUDE.md — AiDepartmentWeb

> **Agents: update this file whenever you add, remove, or significantly modify pages, components, routes, data files, dependencies, or architectural patterns.**

## Project Overview

University AI Department website — a public-facing, multilingual (Ukrainian/English) marketing & information site built with **Next.js 16 App Router**. Dark-themed, glass-morphism UI. No backend — all content is static data in TypeScript files and JSON translation messages.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.1.6 (App Router) |
| Language | TypeScript 5 |
| UI | React 19.2 |
| Styling | Tailwind CSS 4 (via @tailwindcss/postcss) |
| i18n | next-intl 4.8.3 (locales: `uk` default, `en`) |
| Carousel | react-slick 0.31 |
| Icons | Material Symbols Outlined (CDN) |
| Font | Manrope (Google Fonts, Cyrillic) |
| Linting | ESLint 9 (Next.js config) |

## Scripts

```bash
npm run dev      # Dev server (localhost:3000)
npm run build    # Production build
npm start        # Production server
npm run lint     # ESLint
```

## Project Structure

```
AiDepartmentWeb/
├── app/
│   ├── [locale]/              # All routes under dynamic locale
│   │   ├── layout.tsx         # Root layout (i18n, generateMetadata, EducationalOrganization JSON-LD)
│   │   ├── not-found.tsx      # Locale-scoped 404 page
│   │   ├── page.tsx           # Home
│   │   ├── about/
│   │   ├── applicants/
│   │   ├── chat/
│   │   ├── contacts/
│   │   ├── donate/
│   │   ├── news/
│   │   ├── partners/
│   │   ├── privacy-policy/
│   │   ├── projects/[slug]/   # Dynamic project detail
│   │   ├── research-units/
│   │   │   └── [slug]/        # Dynamic research unit detail (9 units)
│   │   ├── rnd/
│   │   ├── settings/admin/
│   │   ├── team/
│   │   └── terms-of-use/
│   ├── not-found.tsx          # Global 404 page (no redirect)
│   ├── robots.ts              # Dynamic robots.txt generation
│   ├── sitemap.ts             # Dynamic sitemap.xml (static + API routes × 2 locales)
│   └── globals.css
├── components/
│   ├── Navbar.tsx             # Fixed nav, mobile menu, lang switcher, theme toggle
│   ├── Footer.tsx
│   ├── JsonLd.tsx             # Server component: renders <script type="application/ld+json">
│   ├── BreadcrumbJsonLd.tsx   # Reusable BreadcrumbList JSON-LD schema
│   ├── ThemeProvider.tsx      # Client context: dark/light theme state + localStorage
│   ├── ThemeToggle.tsx        # Sun/moon CSS toggle (uiverse.io style)
│   └── sections/              # Page-specific section components
│       ├── Hero.tsx, About.tsx, Education.tsx, RnD.tsx, Projects.tsx, Partners.tsx
│       ├── about/             # AboutHero, MissionVision, ResearchDirections, Faculty
│       ├── applicants/        # ApplicantsHero, Programs, International, Testimonial
│       ├── chat/              # ChatContent (client component extracted from page)
│       ├── contact/           # ContactHero, ContactForm, ContactInfo, ContactMap, ContactResources
│       ├── donate/            # DonateContent (client component extracted from page)
│       ├── news/
│       ├── partners/
│       ├── project-details/   # ProjectHero, ProjectDetails, ProjectFeatures, ProjectTeam
│       ├── research-units/    # UnitsHero, UnitsGrid
│       ├── rnd/               # RndHero, ResearchUnits, OngoingProjects
│       ├── team/              # TeamHero, TeamDirectory
│       └── unit-details/      # UnitHero, UnitAbout, UnitAreas, UnitInfrastructure, UnitProjects, UnitTeam
├── data/
│   ├── projectsData.ts       # 15 projects with full details (hero, details, features, team)
│   └── allProjects.ts        # Project metadata & interface
├── i18n/
│   └── request.ts            # i18n config (locale → messages loader)
├── messages/
│   ├── uk.json                # Ukrainian translations
│   └── en.json                # English translations
├── public/                    # Static assets (SVGs, student photos)
├── proxy.ts                   # next-intl middleware (locale routing)
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Architecture & Patterns

### Rendering
- **Server components by default**; only interactive components use `"use client"` (Navbar, Hero, ContactForm, carousels, ThemeProvider, ThemeToggle).
- Layout is async — `params` is a Promise (Next.js 15+ pattern).

### Theming (Dark/Light Mode)
- **CSS custom properties** in `globals.css` define semantic tokens (`:root` = dark defaults, `[data-theme="light"]` overrides).
- Tokens registered in `@theme` block → Tailwind generates utility classes: `bg-surface`, `text-t-primary`, `bg-glass`, etc.
- `ThemeProvider` context manages state + `localStorage` persistence; inline `<script>` in `<head>` prevents flash.
- **Semantic token naming:** `surface` (backgrounds), `t-primary`/`t-secondary` (text), `glass`/`glass-hover`/`glass-strong` (translucent overlays/borders).
- **Exception:** `text-white` is kept for elements on solid colored backgrounds (`bg-primary`, social-brand hovers, etc.).
- Logo gets `filter: brightness(0)` in light mode via `.logo-img` class + `[data-theme="light"]` selector.

### SEO
- **`metadataBase`:** `https://app.thesis-i.com` — used for canonical, hreflang, sitemap, OG.
- Every page exports `generateMetadata()` with locale-aware `title`, `description`, `alternates.canonical`, `alternates.languages` (uk, en, x-default).
- Root layout sets `title.template` (`%s | siteName`), OG defaults, Twitter card.
- `"Metadata"` namespace in `messages/*.json` holds all SEO titles/descriptions.
- `app/sitemap.ts` — dynamic sitemap with static routes × 2 locales + API-driven project/news routes.
- `app/robots.ts` — dynamic robots.txt with sitemap reference and disallow rules.
- **JSON-LD schemas:** `EducationalOrganization` (layout), `Course` (applicants), `Article` (news detail), `BreadcrumbList` (all pages).
- `components/JsonLd.tsx` and `components/BreadcrumbJsonLd.tsx` are reusable server components.
- Client-only pages (`chat`, `donate`) are wrapped: server page.tsx (metadata) → client content component.

### Routing
- All routes nested under `[locale]` dynamic segment (`/uk/...`, `/en/...`).
- Middleware in `proxy.ts` handles locale detection, default redirect, excludes `/_next`, `/api`, static files.
- Project details use `[slug]` with `notFound()` fallback.
- 404 pages render proper UI (not redirects) at `app/not-found.tsx` and `app/[locale]/not-found.tsx`.

### Data Model
- **No API / no database.** All content lives in:
  - `data/projectsData.ts` — project objects keyed by slug
  - `data/allProjects.ts` — project list metadata
  - `messages/*.json` — all UI text (translated)
- Contact form is UI-only (no submission handler).

### i18n
- next-intl with `NextIntlClientProvider` in root layout.
- Access via `useTranslations('Namespace')` (client) or `getTranslations` (server).
- Language switcher in Navbar reconstructs current path with new locale.

### Styling
- Tailwind CSS 4 with CSS-variable-based theme in `globals.css`.
- **Accent colors:** primary `#6C63FF`, indigo `#2A2F8F` (same in both modes).
- **Semantic tokens** (vary by mode): `bg-surface`, `bg-surface-card`, `text-t-primary`, `text-t-secondary`, `bg-glass`, `border-glass-hover`, `shadow-shadow`, etc.
- Design language: glass-morphism cards (`backdrop-blur`, `bg-glass`, `border-glass-hover`), gradient text, glow spheres.
- Mobile-first responsive (breakpoints: sm, md, lg, xl).
- **Never hardcode** `bg-[#0A0A15]`, `text-white`, `bg-white/5`, etc. — always use semantic token utilities.

### Component Pattern
- Pages compose section components: each page imports its `*Hero` + content sections.
- Sections are self-contained with their own styling.
- ~40+ section components organized by page in `components/sections/`.

## Key Config Notes

- `next.config.ts` — allows remote images from `placeholder.com`, `placehold.co`, `googleusercontent.com`; SVG allowed via CSP.
- `tsconfig.json` — path alias `@/*` → project root.
- `tailwind.config.ts` — custom colors + Space Grotesk font-display (primary font is Manrope via CSS).

## Conventions

- Component files: PascalCase (e.g., `ContactForm.tsx`)
- Section directories: kebab-case (e.g., `project-details/`)
- Translation keys: PascalCase namespaces, dot-nested (e.g., `Hero.title`)
- All user-facing text **must** go through i18n (`useTranslations`) — never hardcode display strings
- Static data changes (projects, team, units) go in `data/` files
- New pages: create directory under `app/[locale]/`, add translations to both `uk.json` and `en.json`

## Agent Instructions

When making changes to this repository:

1. **After adding/removing pages or routes** — update the "Project Structure" and routing sections above.
2. **After adding/removing components** — update the component tree in "Project Structure".
3. **After changing dependencies** — update the "Tech Stack" table.
4. **After changing architectural patterns** (state management, data fetching, new APIs) — update "Architecture & Patterns".
5. **After adding new data files or translation namespaces** — update "Data Model" and "Conventions".
6. **Keep this file concise** — bullet points over paragraphs, structure over prose.
