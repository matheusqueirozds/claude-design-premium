# image-to-code.skill.md

## Name

Image-to-Code Pipeline

## Purpose

Enforces strict rules when translating uploaded visual references (screenshots, mockups from Figma, wireframes) into code. Ensures that the model uses the bound Design System (`BOUND_DS.json`) to recreate the visuals instead of inventing new CSS or disconnected raw HTML.

## When to use

- Whenever the user uploads an image/mockup and asks to build it.
- When adapting a visual reference to a new component.

## Procedure

1. **Analyze the uploaded image**: Identify the core structural elements: Layout, Typography, Spacing, and Colors.
2. **Token Mapping (Crucial)**: 
   - Before writing any code, map the visual elements in the image to the available tokens in the bound DS token CSS (`BOUND_DS.json` -> `globalCssPaths`).
   - If the image uses a specific blue, find the closest semantic token (e.g., `var(--primary)`). Do NOT hardcode the hex value.
   - If the image uses specific spacing, find the closest spacing token.
3. **Component Mapping**:
   - Check `BOUND_DS.json` -> `components` to see if a UI element from the mockup (like a Button, Input, or Card) already exists in the Design System.
   - If it exists, use the bound component via `<x-import>`. Do NOT rebuild a button from scratch with `<div>` just to match the mockup perfectly.
4. **Identify Gaps**: If the mockup requires a pattern or token that genuinely does NOT exist in the bound DS, explicitly call it out as a gap and use the closest fallback.
5. **Dials Adjustments**: Set the `DESIGN_VARIANCE`, `MOTION_INTENSITY`, and `VISUAL_DENSITY` (from `DESIGN.md`) to best match the vibe of the uploaded image.

## Output contract

- A translated UI using only `var(--*)` tokens and bound components.
- A brief mapping summary of which tokens/components were used to represent the mockup's elements.

## Failure modes

- **Hardcoding values**: Writing `color: #3b82f6` or `padding: 14px` because it matches the image exactly. -> Map to the closest token instead.
- **Ignoring components**: Rebuilding a complex select dropdown from scratch when the DS already has `<x-import name="Select">`. -> Use the DS components.

## Example invocation

```text
Run image-to-code on the uploaded mockup. Map all colors and spacing to our tokens, and use our bound components where applicable.
```
