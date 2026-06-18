# Changelog

## 2.2.0 — 2026-06-18

### Added

- `scripts/synthesize-design-md.mjs` — síntese determinística de `DESIGN.md` (paridade com Phase 5 do canvas)
- `scripts/extract-ds-tokens.mjs` — amostragem de tokens CSS para voz e DESIGN.md
- `scripts/file-snapshot.mjs` — snapshot/rollback para scripts mutantes (R3 script-security)
- `scripts/templates/design-md.template.md` — stub restaurado pelo unbind
- `.github/workflows/ci.yml` — CI de validação do harness (node --check + context-signals gate + detectores advisory)
- `CLAUDE.md` § Placeholder Inventory + Structure Markers + protocolo de mismatch token/CSS

### Changed

- `bootstrap-harness.mjs` agora sintetiza `DESIGN.md`, suporta `--dry-run`, `--bundle`, `--allow-multi`, exit codes 0/1/2/3
- `unbind-harness.mjs` **não apaga `_ds/`**; unbind dinâmico via `BOUND_DS.json`; snapshot/rollback
- `detect-bound-ds.mjs` — fallback alfabético + `selectedBundle` quando há múltiplos bundles
- `extract-ds-voice.mjs` — hints de tema a partir de token CSS quando readme é vago
- `detect-*-antipatterns.mjs` — path traversal bloqueado; canvas scanner default = `.`
- `.gitignore` — `/_ds/` ignorado (host-project DS nunca é shipado com o harness)

### Fixed

- Drift canvas ↔ scripts: `node scripts/bootstrap-harness.mjs` produz o mesmo estado que auto-setup (incl. DESIGN.md)

## 2.1.1 — 2026-06-18

### Fixed

- Corrigido erro documental: `scripts/` **não** são "só fora do canvas" — rodam no canvas (Claude
  executa a lógica JS), pareados com skills na ordem v1
- Novo [`docs/script-pipeline.md`](docs/script-pipeline.md) — pipeline scripts → skills
- `CLAUDE.md`: roteamento, `SCRIPTS APPLIED`, guardrails
- Skills de auditoria voltam a exigir `detect-*` **antes** do julgamento

## 2.1.0 — 2026-06-18

### Added

- `scripts/extract-ds-voice.mjs` — extrai tagline, superfícies, CTAs e tema do readme do DS
- `scripts/personalize-dc.mjs` — personaliza `*.dc.html` com voz + poda por componente
- `scripts/templates/dc/` — snapshots agnósticos para `unbind-harness.mjs`

### Changed

- Bootstrap e `harness-auto-setup` agora personalizam comunicação e estrutura dos DCs
- Placeholders de voz em Landing, AppShell, Deck, Doc, Starter
- Blocos `CDP:REQUIRES`, `CDP:SURFACES`, `CDP:NAV-LINKS`, `CDP:APP-NAV` para poda/regeneração

## 2.0.1 — 2026-06-18

### Changed

- README reduzido ao fluxo de 4 passos (ZIP → upload → copiar → GO)
- `_archive/v1/` marcado como legado — ignorar para uso brownfield

## 2.0.0 — 2026-06-18

### Changed

- Repositório simplificado: harness brownfield agnóstico como distribuição principal.
- Auto-setup no canvas (`harness-auto-setup`) — primeira mensagem ou `GO` configura tudo.
- Fluxo humano: baixar ZIP → upload → copiar para raiz → nova guia → `GO`.
- Starter greenfield (`starter-kit/`, `templates/`, `components/`) movido para `_archive/v1/`.

### Added

- `BOUND_DS.json`, `bootstrap-harness.mjs`, `unbind-harness.mjs`, `detect-bound-ds.mjs`
- Templates DC: `Starter`, `AppShell`, `Landing`, `Deck`, `Doc`
- `activation-prompt.md` → `GO`