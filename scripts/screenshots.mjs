/**
 * README screenshot script — 1920×1080, pixel-perfect crops.
 * node scripts/screenshots.mjs
 */

import { launch } from '/home/james/Documents/hffmnn.com/node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js';
import { mkdir, writeFile } from 'fs/promises';
import { execSync } from 'child_process';

const BASE   = 'http://localhost:4173';
const OUT    = 'docs/images';
const W      = 1920;
const H      = 1080;
const CHROME = '/home/james/.cache/puppeteer/chrome/linux-142.0.7444.59/chrome-linux64/chrome';

await mkdir(OUT, { recursive: true });

const browser = await launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
});

async function openPage(url, w = W, h = H, mobile = false) {
  const pg = await browser.newPage();
  await pg.setViewport({ width: w, height: h, deviceScaleFactor: 1, isMobile: mobile });
  await pg.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1000));
  return pg;
}

async function snap(pg, name, scrollY = 0, w = W, h = H) {
  if (scrollY) {
    await pg.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), scrollY);
    await new Promise(r => setTimeout(r, 700));
  }
  await pg.screenshot({ path: `${OUT}/${name}`, clip: { x: 0, y: 0, width: w, height: h } });
  console.log(`✓ ${name}`);
}

// ── 1. header.png — masthead + full hero, y=0 ────────────────────────────────
{
  const pg = await openPage(`${BASE}/`);
  await snap(pg, 'header.png');
  await pg.close();
}

// ── 2. home.png — projects ledger (most visually rich homepage section) ───────
{
  const pg = await openPage(`${BASE}/`);
  const y = await pg.evaluate(() => {
    const el = document.querySelector('#tools-section');
    return el ? el.getBoundingClientRect().top + window.scrollY - 40 : 1400;
  });
  await snap(pg, 'home.png', y);
  await pg.close();
}

// ── 3. tools.png — tools listing page, y=0 ────────────────────────────────────
{
  const pg = await openPage(`${BASE}/tools`);
  await snap(pg, 'tools.png');
  await pg.close();
}

// ── 4. page_showcase.png — GoopSpec project detail, y=0 ───────────────────────
{
  const pg = await openPage(`${BASE}/tools/opencode-goopspec`);
  await snap(pg, 'page_showcase.png');
  await pg.close();
}

// ── 5. venture.png — Pulsyn venture hero, y=0 ────────────────────────────────
{
  const pg = await openPage(`${BASE}/venture`);
  await snap(pg, 'venture.png');
  await pg.close();
}

// ── 6. mobile.png — 390×844 hero, centred on paper canvas ─────────────────────
{
  const pg = await openPage(`${BASE}/`, 390, 844, true);
  const buf = await pg.screenshot({ clip: { x: 0, y: 0, width: 390, height: 844 } });
  await pg.close();
  await writeFile('/tmp/mobile_raw.png', buf);
  try {
    execSync(
      `convert -size ${W}x${H} xc:"#F5F1EB" /tmp/mobile_raw.png -gravity Center -composite ${OUT}/mobile.png`,
      { stdio: 'pipe' }
    );
    console.log('✓ mobile.png  (centred on paper canvas, ImageMagick)');
  } catch {
    await writeFile(`${OUT}/mobile.png`, buf);
    console.log('✓ mobile.png  (390×844 native)');
  }
}

await browser.close();
console.log('\nAll 6 screenshots saved to docs/images/');
