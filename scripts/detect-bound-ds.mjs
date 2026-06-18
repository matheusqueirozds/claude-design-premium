#!/usr/bin/env node
/**
 * detect-bound-ds.mjs
 *
 * Discovers the bound design system under ./_ds/ and returns a machine-readable
 * binding object. Works with any Claude Design export that ships _ds_manifest.json
 * and _ds_bundle.js (Academia, Forja, future DS bundles).
 */
import fs from 'node:fs';
import path from 'node:path';
import { safeRead } from './file-snapshot.mjs';

const DS_DIR = '_ds';

const DEFAULT_CHROME_SELECTORS = [
  '.es-nav',
  '.fx-rail',
  '.as-overlay',
];

function exists(root, rel) {
  return fs.existsSync(path.join(root, rel));
}

function read(root, rel) {
  return safeRead(root, rel);
}

function readJson(root, rel) {
  try {
    return JSON.parse(read(root, rel));
  } catch {
    return null;
  }
}

function listDsCandidates(root) {
  const abs = path.join(root, DS_DIR);
  if (!fs.existsSync(abs)) return [];
  return fs
    .readdirSync(abs, { withFileTypes: true })
    .filter((ent) => ent.isDirectory())
    .map((ent) => path.join(DS_DIR, ent.name))
    .filter(
      (rel) =>
        exists(root, path.join(rel, '_ds_manifest.json')) &&
        exists(root, path.join(rel, '_ds_bundle.js')),
    );
}

function humanNameFromFolder(folderName) {
  const base = folderName.replace(
    /-[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    '',
  );
  return base
    .split('-')
    .filter(Boolean)
    .map((part, i, arr) => {
      const lower = part.toLowerCase();
      if (lower === 'ds' && i === arr.length - 1) return 'DS';
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join(' ');
}

function detectIconLibrary(manifest, bundleText) {
  const usesIconoir =
    /iconoir/i.test(bundleText) ||
    manifest.components?.some((c) => c.name === 'Icon');

  if (usesIconoir) {
    return {
      type: 'iconoir',
      cdn: 'https://cdn.jsdelivr.net/npm/iconoir@7.11.0/css/iconoir.css',
      classPrefix: 'iconoir-',
    };
  }

  return { type: 'none', cdn: null, classPrefix: null };
}

function detectChromeSelectors(bundleText) {
  const found = DEFAULT_CHROME_SELECTORS.filter((sel) => {
    const cls = sel.replace(/^\./, '');
    return new RegExp(
      `["'\`]${cls}["'\`]|className\\s*[:=]\\s*["'\`][^"'\`]*\\b${cls}\\b`,
    ).test(bundleText);
  });
  return found.length ? found : DEFAULT_CHROME_SELECTORS;
}

function findReadme(root, dsRoot) {
  for (const name of ['readme.md', 'README.md', 'Readme.md']) {
    const rel = path.join(dsRoot, name);
    if (exists(root, rel)) return rel;
  }
  return null;
}

function tokenDirFromPaths(globalCssPaths = []) {
  const first = globalCssPaths.find((p) => p.includes('/'));
  if (!first) return null;
  return path.posix.dirname(first);
}

function loadExistingBinding(root) {
  const rel = 'BOUND_DS.json';
  if (!exists(root, rel)) return null;
  try {
    return JSON.parse(read(root, rel));
  } catch {
    return null;
  }
}

/**
 * @param {string[]} candidates
 * @param {{ bundleFlag?: string, existingBinding?: object }} [opts]
 */
export function resolveDsCandidate(candidates, opts = {}) {
  if (!candidates.length) {
    return { ok: false, error: 'no_candidates' };
  }

  if (candidates.length === 1) {
    return { ok: true, root: candidates[0], multiBundle: false, selectedBy: 'single' };
  }

  const { bundleFlag, existingBinding } = opts;

  if (bundleFlag) {
    const match = candidates.find(
      (c) => c === bundleFlag || c.endsWith(`/${bundleFlag}`) || c.includes(bundleFlag),
    );
    if (match) {
      return { ok: true, root: match, multiBundle: true, selectedBy: 'flag' };
    }
    return { ok: false, error: 'bundle_flag_not_found', candidates };
  }

  const cachedRoot = existingBinding?.root ?? existingBinding?.selectedBundle;
  if (cachedRoot && candidates.includes(cachedRoot)) {
    return { ok: true, root: cachedRoot, multiBundle: true, selectedBy: 'cache' };
  }

  const sorted = [...candidates].sort();
  return {
    ok: true,
    root: sorted[0],
    multiBundle: true,
    selectedBy: 'alphabetical',
    warning: `Multiple DS bundles under ${DS_DIR}/; defaulting to ${sorted[0]}. Pass --bundle <folder> or set BOUND_DS.json → root.`,
    alternates: sorted.slice(1),
  };
}

/**
 * @param {string} [cwd]
 * @param {{ bundleFlag?: string, allowMulti?: boolean }} [options]
 */
export function detectBoundDs(cwd = process.cwd(), options = {}) {
  const candidates = listDsCandidates(cwd);

  if (!candidates.length) {
    return {
      ok: false,
      error: `No bound design system found under ${DS_DIR}/. Expected one folder with _ds_manifest.json and _ds_bundle.js.`,
      candidates: [],
    };
  }

  const existingBinding = loadExistingBinding(cwd);
  const resolved = resolveDsCandidate(candidates, {
    bundleFlag: options.bundleFlag,
    existingBinding,
  });

  if (!resolved.ok) {
    if (resolved.error === 'bundle_flag_not_found') {
      return {
        ok: false,
        error: `Bundle "${options.bundleFlag}" not found under ${DS_DIR}/.`,
        candidates,
      };
    }
    return {
      ok: false,
      error: `No bound design system found under ${DS_DIR}/.`,
      candidates,
    };
  }

  if (resolved.multiBundle && !options.allowMulti && !options.bundleFlag && !existingBinding?.root) {
    const sorted = [...candidates].sort();
    return {
      ok: false,
      error: `Multiple design systems found under ${DS_DIR}/. Pass --bundle <folder> or keep one bundle.`,
      candidates: sorted,
    };
  }

  const dsRoot = resolved.root;
  const folderName = path.basename(dsRoot);
  const manifestPath = path.join(dsRoot, '_ds_manifest.json');
  const bundlePath = path.join(dsRoot, '_ds_bundle.js');
  const manifest = readJson(cwd, manifestPath);
  const bundleText = read(cwd, bundlePath);

  if (!manifest?.namespace) {
    return {
      ok: false,
      error: `${manifestPath} is missing a namespace field.`,
      candidates,
    };
  }

  const globalCssPaths = manifest.globalCssPaths ?? [];
  const components = (manifest.components ?? []).map((c) => c.name);
  const readmePath = findReadme(cwd, dsRoot);
  const iconLibrary = detectIconLibrary(manifest, bundleText);
  const chromeSelectors = detectChromeSelectors(bundleText);

  const binding = {
    version: 1,
    detectedAt: new Date().toISOString(),
    name: humanNameFromFolder(folderName),
    folder: folderName,
    root: dsRoot.replace(/\\/g, '/'),
    bundle: bundlePath.replace(/\\/g, '/'),
    manifest: manifestPath.replace(/\\/g, '/'),
    namespace: manifest.namespace,
    components,
    componentCount: components.length,
    globalCssPaths,
    tokenDir: tokenDirFromPaths(globalCssPaths),
    readme: readmePath ? readmePath.replace(/\\/g, '/') : null,
    iconLibrary,
    chromeSelectors,
    cards: (manifest.cards ?? []).map((c) => c.name),
    templates: (manifest.templates ?? []).map((t) => t.name),
    selectedBundle: dsRoot.replace(/\\/g, '/'),
    selectionMethod: resolved.selectedBy,
  };

  if (resolved.warning) binding.multiBundleWarning = resolved.warning;
  if (resolved.alternates?.length) binding.alternateBundles = resolved.alternates;

  return { ok: true, binding, candidates, warning: resolved.warning };
}

import { pathToFileURL } from 'node:url';

const isMain =
  process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;

if (isMain) {
  const args = process.argv.slice(2);
  const bundleIdx = args.indexOf('--bundle');
  const bundleFlag = bundleIdx >= 0 ? args[bundleIdx + 1] : undefined;
  const allowMulti = args.includes('--allow-multi');

  const result = detectBoundDs(process.cwd(), { bundleFlag, allowMulti });
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  process.exit(result.ok ? 0 : 1);
}