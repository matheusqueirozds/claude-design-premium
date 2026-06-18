# Changelog

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