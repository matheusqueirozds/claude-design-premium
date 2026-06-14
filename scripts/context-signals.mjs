#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

function exists(rel) {
  return fs.existsSync(path.join(root, rel));
}

function read(rel) {
  try {
    return fs.readFileSync(path.join(root, rel), 'utf8');
  } catch {
    return '';
  }
}

function parseJson(rel) {
  try {
    JSON.parse(read(rel));
    return true;
  } catch {
    return false;
  }
}

function walk(dir, files = []) {
  const abs = path.join(root, dir);
  if (!fs.existsSync(abs)) return files;
  for (const ent of fs.readdirSync(abs, { withFileTypes: true })) {
    if (ent.name === 'node_modules' || ent.name === '.git') continue;
    const rel = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(rel, files);
    else files.push(rel);
  }
  return files;
}

const claude = read('CLAUDE.md');
const runtime = read('docs/canvas-runtime.md');
const staticFiles = walk('starter-kit/static');
const skillFiles = walk('skills').filter((file) => file.endsWith('.skill.md'));
const nativeTemplates = walk('templates').filter((file) => /\/index\.html$/.test(file));
const nativeComponents = walk('components').filter((file) => file.endsWith('.jsx'));
const nativeComponentCards = walk('components').filter((file) => file.endsWith('.html'));

const signals = {
  protocol: {
    hasClaude: exists('CLAUDE.md'),
    hasCanary: claude.includes('CDP-CLAUDE-OK'),
    hasLiteralRoutingTable: /Literal routing table/i.test(claude),
    hasMandatoryReporting: claude.includes('SKILLS APPLIED') && claude.includes('NOT APPLIED'),
    skillCount: skillFiles.length,
  },
  runtime: {
    hasCanvasRuntimeDoc: exists('docs/canvas-runtime.md'),
    hasCanvasCoreDoc: exists('docs/canvas-core.md'),
    documentsReactEscapeHatch: /React\/JSX in-browser/i.test(runtime),
    documentsGlobalScriptHatch: /Self-contained UMD\/IIFE/i.test(runtime),
    documentsStorageCaveat: /localStorage/.test(runtime) && /try\/catch/.test(runtime),
  },
  tokens: {
    hasRootStyles: exists('styles.css'),
    hasJsonExample: exists('design-tokens.json.example'),
    jsonParses: parseJson('design-tokens.json.example'),
    hasCssTokenSource: exists('starter-kit/static/tokens.css'),
    hasTokenGenerator: exists('scripts/generate-design-tokens.mjs'),
  },
  nativeDesignSystem: {
    nativeTemplateCount: nativeTemplates.length,
    hasPageBaseTemplate: exists('templates/page-base/index.html'),
    hasLandingTemplate: exists('templates/landing/index.html'),
    hasDeckTemplate: exists('templates/deck/index.html'),
    hasDsBase: exists('templates/ds-base.js'),
    componentCount: nativeComponents.length,
    hasBotaoComponent: exists('components/Botao.jsx') && exists('components/Botao.d.ts') && exists('components/Botao.html'),
    botaoUsesNativeExport: /\bexport\s+function\s+Botao\b/.test(read('components/Botao.jsx')),
    dsCardCount: nativeComponentCards.filter((file) => read(file).includes('@dsCard')).length,
  },
  scaffold: {
    staticFileCount: staticFiles.length,
    hasStaticReadme: exists('starter-kit/static/README.md'),
    hasGlobalScriptExample: exists('starter-kit/static/global-script-example/widget.js'),
    hasReactExample: exists('starter-kit/static/react-example/component.jsx'),
  },
  textIntegrity: {
    hasTextIntegritySkill: exists('skills/text-integrity-audit.skill.md'),
    hasTextDetector: exists('scripts/detect-text-antipatterns.mjs'),
  },
  recommendedChecks: [
    'node scripts/generate-design-tokens.mjs --check',
    'node scripts/validate-cdp.mjs',
    'node scripts/detect-canvas-antipatterns.mjs starter-kit/static',
    'node scripts/detect-canvas-antipatterns.mjs templates',
    'node scripts/detect-text-antipatterns.mjs README.md docs skills'
  ],
};

process.stdout.write(`${JSON.stringify(signals, null, 2)}\n`);
