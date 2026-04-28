import { launch } from '/home/james/Documents/hffmnn.com/node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js';
import { writeFile } from 'fs/promises';
import { execSync } from 'child_process';

const CHROME = '/home/james/.cache/puppeteer/chrome/linux-142.0.7444.59/chrome-linux64/chrome';
const BASE   = 'http://localhost:4173';
const CSS    = '*, *::before, *::after { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; } .reveal-clip, .animate-fade-up, .animate-fade-in { opacity: 1 !important; transform: none !important; }';

const browser = await launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
});

// ── home.png: tools ledger with masthead ─────────────────────────────────────
{
  const pg = await browser.newPage();
  await pg.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
  await pg.goto(`${BASE}/`, { waitUntil: 'networkidle2', timeout: 30000 });
  await pg.addStyleTag({ content: CSS });
  await new Promise(r => setTimeout(r, 500));
  await pg.evaluate(() => window.scrollTo({ top: 2053, behavior: 'instant' }));
  await new Promise(r => setTimeout(r, 800));
  await pg.screenshot({ path: 'docs/images/home.png', clip: { x: 0, y: 0, width: 1920, height: 1080 } });
  console.log('✓ home.png');
  await pg.close();
}

// ── mobile.png: 390×844 hero, 780px wide on paper canvas ─────────────────────
{
  const pg = await browser.newPage();
  await pg.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
  await pg.goto(`${BASE}/`, { waitUntil: 'networkidle2', timeout: 30000 });
  await pg.addStyleTag({ content: CSS });
  await new Promise(r => setTimeout(r, 600));
  await pg.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await new Promise(r => setTimeout(r, 400));
  const buf = await pg.screenshot({ clip: { x: 0, y: 0, width: 390, height: 844 } });
  await pg.close();
  await writeFile('/tmp/mobile_raw.png', buf);
  try {
    execSync(
      'convert -size 960x1080 xc:"#F5F1EB" ' +
      '\\( /tmp/mobile_raw.png -resize 780x \\) ' +
      '-gravity Center -composite docs/images/mobile.png',
      { stdio: 'pipe' }
    );
    console.log('✓ mobile.png');
  } catch {
    await writeFile('docs/images/mobile.png', buf);
    console.log('✓ mobile.png (fallback)');
  }
}

await browser.close();
console.log('\nDone.');
