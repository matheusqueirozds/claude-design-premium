# design-system-guardian.skill.md

## Name

Design System Guardian

## Purpose

Keep every visual and code decision anchored to `DESIGN.md` and the active canvas CSS tokens so
generated UI stays consistent and on-brand instead of drifting into generic default aesthetics. This is
the foundation skill that almost every other skill builds on.

## When to use

- Before generating any new screen, component, or major layout change.
- When modifying existing UI.
- Whenever visual consistency with `DESIGN.md` and the token system is required.
- As the first skill in almost every UI-related workflow.

## Procedure

1. Load `DESIGN.md` and the active token CSS as non-negotiable constraints. In greenfield starter
   projects this is usually `starter-kit/static/tokens.css`; in brownfield Claude Design exports,
   use the CSS graph reported by `_ds_manifest.json.globalCssPaths` such as `colors_and_type.css`.
2. Treat `design-tokens.json` as a generated/reference artifact for documentation and handoff, not
   the CSS runtime source.
3. For every color decision, use a token from the active token CSS (prefer semantic tokens:
   `primary`, `destructive`, etc.).
4. For every spacing decision, use a value from the spacing scale.
5. For typography, respect the type scale, weights, and line heights defined in tokens.
6. For radius, elevation, and motion, use the defined token values exactly.
7. If static canvas CSS is being written, use CSS custom properties from the active token CSS; do not
   import or reference JSON directly from CSS.
8. If generated token JSON and the active token CSS disagree, treat the CSS as the canvas source of
   truth and flag that the JSON must be regenerated outside Claude Design Web.
9. Check component and brand alignment: does this match how the system defines this component?
10. If a visual decision conflicts with `DESIGN.md` principles (e.g., introducing generic default chrome),
   flag the conflict explicitly before proceeding.
11. Never invent new colors, spacing values, or type sizes.
12. Outside Claude Design Web, when maintaining this starter repo, run `node scripts/validate-cdp.mjs`
    to deterministically check protocol files, generated token JSON, static examples, and stale
    runtime claims. Do not claim Claude Design Web ran this script.

## Output contract

- Every generated or modified UI element must reference the specific tokens or principles applied.
- Static canvas output must reference CSS custom properties from the active token CSS.
- If you deviate from tokens, state the reason clearly and propose updating the token file instead.

## Failure modes

- **Token invention:** Hard-coded colors or spacing when tokens exist. -> Correct and reference the token.
- **Generic aesthetic drift:** Layouts that feel like generic SaaS screens. -> Re-anchor in `DESIGN.md` §1-2.
- **Reference copying without brand logic:** Cloning a reference visually without applying the brand. -> Re-derive from `DESIGN.md`.
- **Treating tokens as suggestions:** Using tokens loosely. -> Tokens are constraints, not hints.
- **JSON-first token edits in canvas:** Treating `design-tokens.json` as the runtime source. -> Use
  CSS custom properties from the active token CSS; regenerate JSON later outside the canvas.
- **Unverified local maintenance:** Updating protocol/runtime docs without running the repo-side
  validator. -> Run `node scripts/validate-cdp.mjs` outside the canvas.
- **Over-application:** Enforcing the whole system in one heavy response. -> Prioritize the 2-3 most critical constraints; note the rest.

## Example invocation

```text
Generate the pricing section. Apply design-system-guardian: list which color, spacing, and
typography tokens you will use before generating, and flag anything not covered by the tokens.
```
