# Claude Design Premium

**A document-backed operating layer for Claude Design Web.**

Claude Design Premium rides on top of Claude Design's native rails and adds project governance,
token discipline, review checkpoints, and handoff structure. It does not make the model
deterministic or production-ready by itself; it makes the design process more explicit, auditable,
and easier to carry into a real codebase after review.

Claude Design Web has a fixed native Skill set; this starter does not install new native Skills.
It uses a root `CLAUDE.md` as a lightweight bootstrap that references document-backed `.skill.md`
procedures, `DESIGN.md`, native templates/components/cards, and the active token CSS.

> Unofficial community workflow. Not affiliated with Anthropic.

[🇧🇷 Leia em português](README.pt-BR.md)

<!-- TODO: attach real Claude Design Web demo.gif / screenshot (see docs/assets/) -->

---

## The problem

Claude Design without an operating layer is taste roulette.

Claude Design can create impressive prototypes, but without an operating layer it tends to drift:

- inconsistent tokens between screens and components;
- generic generated aesthetics (excess cards, shadows, gradients, rounded corners);
- weak visual hierarchy;
- responsiveness handled too late;
- accessibility skipped;
- arbitrary Tailwind classes;
- no polish phase;
- no transparency about which criteria were actually applied.

## The solution

**Claude Design Premium is a behavior harness: it gives Claude Design a repeatable procedure for
better UI craft and cleaner production handoff**:

```text
CLAUDE.md
  -> bootstraps Claude Design Web from the project root
  -> routes document-backed .skill.md procedures without pretending they are native Skills
  -> uses native templates, @dsCard specimens, components, CSS tokens, and check_design_system
  -> applies DESIGN.md + tokens.css
  -> asks for craft checks, audits, polish, responsive checks, and accessibility review
  -> reports what was applied, skipped, and recommended next
```

> Premium is not a style. Premium is a repeatable operating procedure.

## What the harness makes explicit

Claude Design can do strong work, but it drifts when the project contract is implicit. This harness
keeps the contract visible:

1. **Anti-drift, on-brand taste.** `visual-originality-audit` + `DESIGN.md` call out generic
   template reflexes such as category-obvious layouts, sky-blue accents, card-in-card composition, and
   unowned visual language.
2. **Review checkpoints before "done".** `mobile-first-audit`, `accessibility-audit`, and
   `design-system-guardian` give the model a concrete checklist to run and report. They are
   review aids, not a substitute for manual QA.
3. **Cleaner handoff shape.** Native specimens, CSS tokens, `@dsCard`, `ui_kits/`, and component
   inventories make the work easier to migrate to Astro, Vite, or Next after the design direction is
   approved. Handoff is still an implementation step, not an automatic export to production.

## Quick Start

### If Claude Design can read this starter folder

1. Create a new Claude Design Web project.
2. Point Claude at this starter folder and ask it to replicate the real files, not reinterpret them.
3. Put these files in the project root/context:
   - `CLAUDE.md`
   - `DESIGN.md.example` (rename to `DESIGN.md` and customize)
   - `styles.css` (greenfield root design-system CSS facade for the native compiler)
   - `starter-kit/static/tokens.css` (greenfield canvas token source)
   - `templates/<slug>/index.html` native templates when you want them in the picker
   - `components/*.jsx` + `components/*.d.ts` + component sidecar `components/*.html` cards when proving components/specimens
   - `design-tokens.json.example` (optional generated/reference handoff artifact)
   - all files inside `skills/`
   - optionally `starter-kit/` for reusable static and framework-ready patterns
4. Start working normally. If `CLAUDE.md` did not load, use `activation-prompt.md` as a fallback and
   run the setup diagnostics in [`docs/validation-method.md`](docs/validation-method.md).
5. Ask Claude:

   ```text
   Create a premium SaaS dashboard for a fintech analytics product.
   Use Claude Design Premium and report which skills were applied.
   ```

6. Check the final `SKILLS APPLIED`, `NOT APPLIED`, and `NEXT RECOMMENDED` report.

For the lean canvas working set, use [`docs/canvas-core.md`](docs/canvas-core.md). The rest of this
repository is distribution, documentation, maintenance, or handoff material.

For brownfield Claude Design exports, do not force this greenfield file layout. Existing exports often
use `colors_and_type.css` plus `preview/*.html` cards without root `styles.css`, templates, or native
components. In that case, the existing CSS graph is the token source; see
[`docs/legacy-claude-design-exports.md`](docs/legacy-claude-design-exports.md).

### If you are starting from an empty canvas

Claude Design Web cannot start from an uploaded folder and does not run git, npm, Vite, Next, Astro,
or a dev server inside the canvas. Attach [`CLAUDE-DESIGN-SEED.md`](CLAUDE-DESIGN-SEED.md) first and
use this prompt:

```text
Use CLAUDE-DESIGN-SEED.md.
Create the root CLAUDE.md first, then scaffold the static design-system structure.
Do not generate the visual design yet.
After the structure exists, ask the opening questions.
```

The seed is a bootstrap instruction, not a visual reference. If Claude can also read this source
folder, use the hybrid path: seed for governance, folder replication for real file fidelity.

No installation. No build step inside Claude Design Web. Prove the setup with
[`docs/validation-method.md`](docs/validation-method.md), especially the native
`check_design_system` signal, and read
[`docs/canvas-runtime.md`](docs/canvas-runtime.md) for the static canvas contract.

## How it works

The protocol uses **selective context engineering**. Instead of dumping every rule at once (which makes
the model start ignoring instructions), `CLAUDE.md` routes only the relevant document-backed procedures for each
task type and asks for a transparent report at delivery/audit checkpoints. See
[`docs/native-claude-design-alignment.md`](docs/native-claude-design-alignment.md),
[`docs/canvas-core.md`](docs/canvas-core.md), [`docs/legacy-claude-design-exports.md`](docs/legacy-claude-design-exports.md),
[`docs/architecture.md`](docs/architecture.md),
[`docs/how-it-works.md`](docs/how-it-works.md), and [`PLAYBOOK.md`](PLAYBOOK.md).

## Included files

- **`CLAUDE.md`**: central protocol: selective routing logic + checkpoint reporting.
- **`CLAUDE-DESIGN-SEED.md`**: first-message bootstrap seed for empty Claude Design Web canvases.
- **`DESIGN.md.example`** + **`starter-kit/static/tokens.css`**: opinionated greenfield taste and
  token starting point.
- **`templates/`** and **`components/`**: native Claude Design templates, component example, and
  `@dsCard` sidecar specimen.
- **`design-tokens.json.example`**: generated/reference token artifact for docs and handoff.
- **`starter-kit/`**: modular app patterns that can be carried into Astro, Vite, or Next.
- **`activation-prompt.md`**: fallback prompt if the root bootstrap did not load.
- **`PROMPTS-LIBRARY.md`**: copy-paste prompts that work with the protocol.
- **`docs/canvas-core.md`**: lean file set to load in Claude Design Web.
- **`PLAYBOOK.md`**, **`LIMITATIONS.md`**, **`SECURITY.md`**: workflow, honest limits, and safety.
- **`templates/*.template.*`**: start your own `CLAUDE.md`, `DESIGN.md`, tokens, and procedures.
- **`examples/`**: landing page, SaaS dashboard, and design system walkthroughs.

## Included skills

- `brief-framing`: classifies the surface and captures blocking context before design starts.
- `design-system-guardian`: checks decisions against your design tokens and system.
- `visual-originality-audit`: catches generic template reflexes before polish.
- `ui-audit`: hierarchy, spacing, typography, composition, and states.
- `polish-phase`: micro-interactions, states, and premium finishing.
- `text-integrity-audit`: checks UI copy, docs, prompts, reports, and public text for generic wording
  and weak voice.
- `tailwind-audit`: class quality and token adherence for external implementation/handoff code.
- `mobile-first-audit`: responsive behavior and touch targets.
- `accessibility-audit`: contrast, semantics, keyboard navigation (with a real-testing disclaimer).
- `framework-handoff`: component inventory and Astro/Vite/Next handoff planning.

## Starter Kit

`starter-kit/` gives Claude Design Web a component vocabulary before implementation: `MarketingNav`,
`AppShell`, `Button`, `Card`, `SectionHeader`, `Hero`, and `DashboardFrame`. Use it when you want the
canvas output to be easier to carry into Astro, Vite, or Next later.

`starter-kit/static/` is the canvas-safe scaffold: plain HTML, CSS, and browser JS that requires no
server, package install, bundler, or git operation. Framework migration stays a later handoff step.
Use `starter-kit/static/tokens.css` as the greenfield canvas token source; for brownfield exports,
preserve the existing CSS token file such as `colors_and_type.css`. Do not try to import JSON tokens
directly from CSS in Claude Design Web. Regenerate `design-tokens.json.example` outside the canvas
when token values change.

Self-contained global scripts can run when they are loaded with `<script src>` and expose their API
on `window`; see `starter-kit/static/global-script-example/`. The canvas still does not run the
bundler that produced them.

React/JSX is supported only as an optional in-browser escape hatch via UMD React + Babel standalone.
See `starter-kit/static/react-example/`; the default canvas path remains HTML/CSS/vanilla JS.

## Deterministic local scripts

These scripts are for maintaining the starter outside Claude Design Web. The canvas itself still does
not run shell commands. The scripts are dependency-free JavaScript: Node built-ins only, no npm
packages.

```bash
node scripts/context-signals.mjs
node scripts/generate-design-tokens.mjs --check
node scripts/detect-canvas-antipatterns.mjs starter-kit/static
node scripts/detect-text-antipatterns.mjs README.md docs skills
node scripts/detect-canvas-antipatterns.mjs templates
node scripts/validate-cdp.mjs
```

- `context-signals.mjs` prints cheap project health signals as JSON.
- `generate-design-tokens.mjs` generates/checks `design-tokens.json.example` from
  `starter-kit/static/tokens.css`.
- `detect-canvas-antipatterns.mjs` scans static canvas files for measurable generic-output, mobile, and
  accessibility preflight issues. P1 findings fail; P2 findings are advisory unless you pass
  `--strict`. Native `@dsCard` specimens are not treated as public-page documents for title/lang/
  viewport checks.
- `detect-text-antipatterns.mjs` scans docs, prompts, and copy for hard voice/style bans plus
  review-level wording patterns. P1 findings fail; P2 findings are advisory unless you pass
  `--strict`.
- `validate-cdp.mjs` checks the protocol, generated tokens, native template/component/specimen
  scaffolds, examples, links, stale runtime claims, and detector output.

## Example workflows

See [`examples/`](examples/): each has a `prompt.md`, a sample `reporting-block.md` reporting block, and
a `screenshots/` folder. Where real visual proof is not attached yet, an explicit `TODO` marks it.

## Why "enforce"?

In this repo, "enforce" means **procedural enforcement**: Claude is explicitly instructed to check
against `CLAUDE.md`, `DESIGN.md`, the active CSS token file, optional generated token JSON, and the
relevant procedure documents, then report what it applied or skipped. This is reviewable guidance,
not deterministic policy enforcement. Human review is still required.

## Limitations

This is a powerful **context-based pattern**, not runtime enforcement. It significantly improves
consistency and quality, but results still depend on the model, your `DESIGN.md`, and how well you
maintain the system. Read [`LIMITATIONS.md`](LIMITATIONS.md) for an honest assessment.

## Contributing

We welcome high-quality skill contributions. See [`CONTRIBUTING.md`](CONTRIBUTING.md).

## License

MIT. See [`LICENSE`](LICENSE).

---

**For people who want premium, consistent design output from Claude: not just pretty prototypes.**
