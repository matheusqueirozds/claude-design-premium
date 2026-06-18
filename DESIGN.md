# DESIGN.md — Academia DS

> Active visual constraint for **Academia DS**. Synthesized by `scripts/synthesize-design-md.mjs`.
> Token **values** live in `_ds/academia-ds-460d36aa-7bb2-48dc-9ede-f9e8954fcdb3` (re-exported by root `styles.css`). This file is the interpretive layer.
> When this file disagrees with token CSS, **the CSS wins** — flag mismatches inline, then proceed with tokens.


Read `BOUND_DS.json` for machine binding (`namespace`: `LendRIADesignSystem_096da5`, `21` components).
Readme: `_ds/academia-ds-460d36aa-7bb2-48dc-9ede-f9e8954fcdb3/readme.md`.

---

## 1. Design Philosophy

**Tagline:** Unir e potencializar pessoas lendárias com IA para construírem soluções e negócios que imortalizam seu legado.

a Brazilian AI-first education platform

**Surface registers**
- **Brand** — marketing, heroes, campaigns, editorial (Biblioteca)
- **Product** — app UI, dashboards, workflows (Academia / Área do Aluno (LMS))
- **System** — specimens, tokens, documentation, this harness

**Anti-references** (do not drift into):
- no (LMS)** — courses, tracks ("trilhas"), live sessions, certificates, gamification
- no para dados/status e ouro como sinal de estado
- no shimmer sweeps, no gold glows/auras, no PNG textures, no generic rounded-card sh
- no `active:scale` press
- No emoji in product UI
- no chips, tinted alerts), never blocks

---

## 2. Core Principles

### Hierarchy & Scanning
Primary action and headline visible within 3 seconds. Type roles: display (headings), UI (sans), data (mono) per token fonts.

### Spacing & Rhythm
Use the bound token scale only. Sample spacing/radius tokens: `--spacing-*`, `--radius-*`.

### Components
Namespace `LendRIADesignSystem_096da5`. Compose bound components — never recreate markup. Inventory: BookCard, SectionHeader, Badge, Button, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Icon, Alert, +9 more.

### Responsiveness
Mobile-first; touch targets ≥ 44px. Document shell/nav collapse per surface.

### Accessibility
Respect contrast from token CSS. Run accessibility audit before final; never claim certification.

---

## 3. Visual Language

Ground decisions in: `tokens/fonts.css`, `tokens/colors.css`, `tokens/typography.css`, `tokens/spacing.css`.

### Color
Semantic tokens: `--background`, `--foreground`, `--primary`, `--border`. Never invent hexes when tokens exist.

### Typography
Font roles: `--font-sans`, `--font-serif`, `--font-mono`, `--font-display`. Use size tokens only.

### Elevation & Depth
Shadows and hairlines per bound DS. No glows or effects the readme forbids.

### Corner radii
Per `--radius-*` scale. Do not invent radii outside the system.

### Motion
Duration/easing: `--duration-*`, easing tokens from effects CSS`. Respect `prefers-reduced-motion`.

### Iconography
**Iconoir** via CDN. Use `iconoir-` classes through the bundled Icon component.

---

## 4. Do / Don't

**Do**
- Compose `LendRIADesignSystem_096da5.*` components via `<x-import>`; load the bundle once in `<helmet>`.
- Use `var(--*)` tokens for every visual decision.
- Match product voice from this file and the bound DS readme.
- Run `design-system-guardian` before generating or changing UI.

**Don't**
- Invent colors, type sizes, spacing, or radii outside the token graph.
- Restyle raw HTML to imitate bound components.
- Copy patterns from a different design system.
- Stack conflicting navigation layers on one screen.

---

## 5. Component Philosophy

All components mount from `LendRIADesignSystem_096da5` after loading `_ds/academia-ds-460d36aa-7bb2-48dc-9ede-f9e8954fcdb3/_ds_bundle.js`.

Major inventory:
- **BookCard** — use manifest/readme voice; see `Starter.dc.html` gallery when present.
- **SectionHeader** — use manifest/readme voice; see `Starter.dc.html` gallery when present.
- **Badge** — use manifest/readme voice; see `Starter.dc.html` gallery when present.
- **Button** — use manifest/readme voice; see `Starter.dc.html` gallery when present.
- **Card** — use manifest/readme voice; see `Starter.dc.html` gallery when present.
- **CardHeader** — use manifest/readme voice; see `Starter.dc.html` gallery when present.
- **CardTitle** — use manifest/readme voice; see `Starter.dc.html` gallery when present.
- **CardDescription** — use manifest/readme voice; see `Starter.dc.html` gallery when present.
- **CardContent** — use manifest/readme voice; see `Starter.dc.html` gallery when present.
- **CardFooter** — use manifest/readme voice; see `Starter.dc.html` gallery when present.
- **Icon** — use manifest/readme voice; see `Starter.dc.html` gallery when present.
- **Alert** — use manifest/readme voice; see `Starter.dc.html` gallery when present.
- **Avatar** — use manifest/readme voice; see `Starter.dc.html` gallery when present.
- **Progress** — use manifest/readme voice; see `Starter.dc.html` gallery when present.
- **StatChip** — use manifest/readme voice; see `Starter.dc.html` gallery when present.
- **Tabs** — use manifest/readme voice; see `Starter.dc.html` gallery when present.
- **Checkbox** — use manifest/readme voice; see `Starter.dc.html` gallery when present.
- **Input** — use manifest/readme voice; see `Starter.dc.html` gallery when present.
- **Label** — use manifest/readme voice; see `Starter.dc.html` gallery when present.
- **Switch** — use manifest/readme voice; see `Starter.dc.html` gallery when present.
- *+1 additional components in `BOUND_DS.json`.*

Specimen cards: Brand — SectionHeader · BookCard, Core — Button · Badge · Card · Icon, Display — Tabs · Avatar · Progress · Alert · StatChip, Forms — Input · Textarea · Switch · Checkbox, App — Login → Biblioteca → Área do Aluno.

---

## 6. Reusable Patterns

Preserve named patterns through to code handoff:
- Section headers / heroes
- App shell / navigation
- Cards / lists / empty states
- Data display / status chips

Surfaces from readme: **Biblioteca**, **Academia / Área do Aluno (LMS)**, **Comunidade**, **Mentes Sintéticas**, **JetBrains Mono**.

---

## 7. Framework Handoff

- **Astro** — marketing, editorial, mostly-static content
- **Vite** — interactive app/dashboard prototypes
- **Next** — SSR / SEO-heavy routes / team conventions

Produce a framework-neutral component inventory first (`skills/framework-handoff.skill.md`); target a framework only after canvas direction is approved.

