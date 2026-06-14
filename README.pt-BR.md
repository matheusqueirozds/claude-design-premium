# Claude Design Premium

**Camada operacional documentada para Claude Design Web.**

Claude Design Web não instala Skills customizadas. Em projetos testados, um `CLAUDE.md` na raiz pode
ser carregado como governança da sessão. Este starter usa esse arquivo como bootstrap leve para
referenciar procedimentos documentais (`.skill.md`), `DESIGN.md`, o CSS de tokens ativo e artefatos
opcionais de handoff, dando ao Claude um roteiro de design próprio do projeto sem fingir que isso é
uma Skill nativa instalada.

> Fluxo de comunidade não oficial. Sem afiliação com a Anthropic.

[🇺🇸 Read in English](README.md)

<!-- TODO: anexar demo.gif / screenshot real do Claude Design Web (ver docs/assets/) -->

---

## O problema

Claude Design sem uma camada operacional é roleta de gosto.

Claude Design gera protótipos impressionantes, mas sem uma camada operacional ele tende a derivar:

- tokens inconsistentes entre telas e componentes;
- estética genérica de IA (excesso de cards, sombras, gradients, cantos arredondados);
- hierarquia visual fraca;
- responsividade tratada tarde demais;
- acessibilidade pulada;
- classes Tailwind arbitrárias;
- ausência de fase de polish;
- nenhuma transparência sobre quais critérios foram aplicados.

## A solução

**Claude Design Premium transforma critérios de UI em um procedimento repetível e revisável**:

```text
CLAUDE.md
  -> faz bootstrap do Claude Design Web a partir da raiz do projeto
  -> roteia procedimentos .skill.md sem tratá-los como Skills nativas
  -> aplica DESIGN.md + tokens.css
  -> pede craft, auditorias, polish, checagens responsivas e revisão de acessibilidade
  -> reporta o que foi aplicado, pulado e recomendado a seguir
```

> Premium não é um estilo. Premium é um procedimento operacional repetível.

## Início rápido

### Se o Claude Design conseguir ler esta pasta starter

1. Crie um novo projeto no Claude Design Web.
2. Aponte o Claude para esta pasta starter e peça para replicar os arquivos reais, não reinterpretar
   de memória.
3. Coloque estes arquivos na raiz/contexto do projeto:
   - `CLAUDE.md`
   - `DESIGN.md.example` (renomeie para `DESIGN.md` e personalize)
   - `styles.css` (fachada CSS greenfield para o compilador nativo de design system)
   - `starter-kit/static/tokens.css` (fonte de tokens para projetos greenfield)
   - `design-tokens.json.example` (artefato opcional gerado/de referência para handoff)
   - todos os arquivos em `skills/`
   - opcionalmente `starter-kit/` para padrões reutilizáveis estáticos e prontos para handoff
4. Trabalhe normalmente. Se o `CLAUDE.md` não carregar, use `activation-prompt.md` como fallback e
   rode a canary `CDP-CLAUDE-OK` de [`docs/validation-method.md`](docs/validation-method.md).
5. Peça ao Claude:

   ```text
   Crie um dashboard SaaS premium para um produto de analytics fintech.
   Use o Claude Design Premium e reporte quais skills foram aplicadas.
   ```

6. Confira o relatório final `SKILLS APPLIED`, `NOT APPLIED` e `NEXT RECOMMENDED`.

Para o conjunto enxuto que deve entrar no canvas, use [`docs/canvas-core.md`](docs/canvas-core.md).
O restante do repositório é distribuição, documentação, manutenção ou handoff.

Para exports brownfield do Claude Design, não force este layout greenfield. Muitos exports existentes
usam `colors_and_type.css` + cards em `preview/*.html`, sem `styles.css` raiz, templates ou
componentes nativos. Nesse caso, o grafo CSS existente é a fonte dos tokens; veja
[`docs/legacy-claude-design-exports.md`](docs/legacy-claude-design-exports.md).

### Se você está começando em um canvas vazio

Claude Design Web não começa a partir de uma pasta enviada e não roda git, npm, Vite, Next, Astro ou
dev server dentro do canvas. Anexe [`CLAUDE-DESIGN-SEED.md`](CLAUDE-DESIGN-SEED.md) primeiro e use:

```text
Use CLAUDE-DESIGN-SEED.md.
Create the root CLAUDE.md first, then scaffold the static design-system structure.
Do not generate the visual design yet.
After the structure exists, ask the opening questions.
```

O seed é uma instrução de bootstrap, não uma referência visual. Se o Claude também conseguir ler esta
pasta fonte, use o caminho híbrido: seed para governança, replicação da pasta para fidelidade dos
arquivos reais.

Sem instalação. Sem build dentro do Claude Design Web. Valide o carregamento com
[`docs/validation-method.md`](docs/validation-method.md) e leia
[`docs/canvas-runtime.md`](docs/canvas-runtime.md) para o contrato do canvas estático.

## Como funciona

O protocolo usa **context engineering seletivo**. Em vez de despejar todas as regras de uma vez (o que
faz o modelo começar a ignorar instruções), o `CLAUDE.md` roteia só as skills documentais relevantes
por tipo de tarefa e pede um relatório transparente nos checkpoints de entrega/auditoria. Veja
[`docs/canvas-core.md`](docs/canvas-core.md), [`docs/legacy-claude-design-exports.md`](docs/legacy-claude-design-exports.md),
[`docs/architecture.md`](docs/architecture.md),
[`docs/how-it-works.md`](docs/how-it-works.md) e [`PLAYBOOK.md`](PLAYBOOK.md).

## Skills incluídas

- `brief-framing`: classifica a superfície e captura contexto bloqueante antes do design.
- `design-system-guardian`: reforça tokens e sistema visual.
- `visual-originality-audit`: detecta reflexos genéricos de template antes do polish.
- `ui-audit`: hierarquia, espaçamento, tipografia, composição e estados.
- `polish-phase`: microinterações, estados e acabamento premium.
- `text-integrity-audit`: revisa textos de UI, docs, prompts, relatórios e texto público contra
  linguagem genérica e voz fraca.
- `tailwind-audit`: qualidade de classes e aderência a tokens para código externo/handoff.
- `mobile-first-audit`: responsividade e alvos de toque.
- `accessibility-audit`: contraste, semântica, teclado e foco, sem prometer certificação.
- `framework-handoff`: inventário de componentes e handoff para Astro/Vite/Next.

## Starter Kit

`starter-kit/` dá ao Claude Design Web um vocabulário de componentes antes da implementação:
`MarketingNav`, `AppShell`, `Button`, `Card`, `SectionHeader`, `Hero` e `DashboardFrame`. Use quando
quiser que o output do canvas seja mais fácil de levar depois para Astro, Vite ou Next.

`starter-kit/static/` é o scaffold seguro para o canvas: HTML, CSS e JS de browser sem servidor,
instalação de pacote, bundler ou operação de git. A migração para framework fica como handoff
posterior.
Use `starter-kit/static/tokens.css` como a fonte inicial de tokens em projetos greenfield criados a
partir deste starter; em brownfield, preserve o CSS existente, geralmente `colors_and_type.css`. Não
tente importar tokens JSON diretamente pelo CSS no Claude Design Web. Gere novamente
`design-tokens.json.example` fora do canvas quando os valores de tokens mudarem.

Scripts globais auto-contidos podem rodar quando carregados por `<script src>` e expostos em
`window`; veja `starter-kit/static/global-script-example/`. O canvas ainda não roda o bundler que
gerou esses arquivos.

React/JSX só entra como escape hatch opcional via React UMD + Babel standalone no browser. Veja
`starter-kit/static/react-example/`; o caminho padrão do canvas continua HTML/CSS/JS vanilla.

## Scripts locais determinísticos

Estes scripts servem para manter o starter fora do Claude Design Web. O canvas continua sem rodar
comandos de shell. Eles são JavaScript sem dependências externas: apenas Node built-ins, sem pacotes
npm.

```bash
node scripts/context-signals.mjs
node scripts/generate-design-tokens.mjs --check
node scripts/detect-canvas-antipatterns.mjs starter-kit/static
node scripts/detect-text-antipatterns.mjs README.md docs skills
node scripts/validate-cdp.mjs
```

- `context-signals.mjs` imprime sinais baratos de saúde do projeto em JSON.
- `generate-design-tokens.mjs` gera/checa `design-tokens.json.example` a partir de
  `starter-kit/static/tokens.css`.
- `detect-canvas-antipatterns.mjs` varre arquivos estáticos do canvas em busca de tells mensuráveis
  de design gerado e problemas de preflight mobile/acessibilidade. Achados P1 falham; P2 são
  consultivos, exceto com `--strict`. Specimens nativos `@dsCard` não são tratados como páginas
  públicas nas checagens de title/lang/viewport.
- `detect-text-antipatterns.mjs` varre docs, prompts e copy em busca de bloqueios de voz/estilo e
  padrões de texto que precisam de revisão. Achados P1 falham; P2 são consultivos, exceto com
  `--strict`.
- `validate-cdp.mjs` checa protocolo, tokens gerados, exemplos, links, claims antigas de runtime e
  saída do detector.

A skill `framework-handoff` transforma uma direção visual aprovada em inventário de componentes,
dependências de tokens e recomendação de Astro/Vite/Next quando fizer sentido.

## Por que "enforce"?

Neste repo, "enforce" significa **enforcement procedural**: o Claude é explicitamente instruído a
checar contra `CLAUDE.md`, `DESIGN.md`, o CSS de tokens ativo, JSON de tokens opcional e os
procedimentos relevantes, e então reportar o que aplicou ou pulou. É orientação revisável, não
enforcement determinístico de política. A revisão humana continua necessária.

## Limitações

Este é um **padrão baseado em contexto** poderoso, não enforcement em runtime. Ele melhora muito a
consistência e a qualidade, mas o resultado ainda depende do modelo, do seu `DESIGN.md` e de como você
mantém o sistema. Leia [`LIMITATIONS.md`](LIMITATIONS.md) para uma avaliação honesta.

## Contribuindo

Aceitamos contribuições de skills de alta qualidade. Veja [`CONTRIBUTING.md`](CONTRIBUTING.md).

## Licença

MIT. Veja [`LICENSE`](LICENSE).

---

**Para quem quer output de design premium e consistente do Claude: não só protótipos bonitos.**
