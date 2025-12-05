import puppeteer from "puppeteer";
import { join } from "path";

const WIDTH = 1200;
const HEIGHT = 630;

// Design tokens from app.css
const COLORS = {
  foreground: "oklch(93% 0 0)",
  muted: "oklch(55% 0 0)",
  pulsyn: "oklch(75% 0.18 160)",
};

// Mesh gradient from app.css (blue variant)
const MESH_GRADIENT = `
  background-color: #000;
  background-image:
    radial-gradient(at 0% 0%, oklch(18% 0.04 220) 0px, transparent 50%),
    radial-gradient(at 100% 0%, oklch(15% 0.03 200) 0px, transparent 50%),
    radial-gradient(at 100% 100%, oklch(12% 0.02 210) 0px, transparent 50%),
    radial-gradient(at 0% 100%, oklch(14% 0.03 230) 0px, transparent 50%),
    radial-gradient(at 50% 50%, oklch(8% 0.02 215) 0px, transparent 70%);
`;

// Font paths from fontsource packages
const FONT_PATHS = {
  kodeMono: join(
    process.cwd(),
    "node_modules/@fontsource-variable/kode-mono/files/kode-mono-latin-wght-normal.woff2"
  ),
  inter: join(
    process.cwd(),
    "node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2"
  ),
};

// Base HTML template wrapper
function baseTemplate(content: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <style>
    @font-face {
      font-family: 'Kode Mono Variable';
      src: url('file://${FONT_PATHS.kodeMono}') format('woff2');
      font-weight: 100 900;
    }
    @font-face {
      font-family: 'Inter Variable';
      src: url('file://${FONT_PATHS.inter}') format('woff2');
      font-weight: 100 900;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      width: ${WIDTH}px;
      height: ${HEIGHT}px;
      ${MESH_GRADIENT}
      font-family: 'Inter Variable', system-ui, sans-serif;
      color: ${COLORS.foreground};
      display: flex;
      flex-direction: column;
      padding: 60px 80px;
    }
    .logo {
      font-family: 'Kode Mono Variable', monospace;
      font-size: 28px;
      font-weight: 700;
      letter-spacing: -0.02em;
    }
    h1 {
      font-family: 'Kode Mono Variable', monospace;
      font-weight: 700;
      word-spacing: -0.15em;
      letter-spacing: -0.02em;
    }
    .muted { color: ${COLORS.muted}; }
    .pulsyn-color { color: ${COLORS.pulsyn}; }
    .badge {
      display: inline-block;
      padding: 8px 16px;
      border-radius: 9999px;
      font-size: 14px;
      font-weight: 500;
      background: rgba(100, 200, 150, 0.1);
      border: 1px solid rgba(100, 200, 150, 0.3);
      color: ${COLORS.pulsyn};
    }
    .url {
      font-size: 20px;
      color: ${COLORS.muted};
    }
    .content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  </style>
</head>
<body>
  ${content}
</body>
</html>`;
}

// Template definitions
const templates: Record<string, () => string> = {
  home: () =>
    baseTemplate(`
    <div class="logo">hffmnn</div>
    <div class="content">
      <h1 style="font-size: 72px; line-height: 1.1; margin-bottom: 24px;">
        Building tools for<br>
        <span class="muted">privacy & productivity</span>
      </h1>
      <p style="font-size: 24px; color: ${COLORS.muted}; max-width: 700px; line-height: 1.5;">
        Creating elegant, privacy-respecting software.<br>
        From desktop environments to AI-powered tools.
      </p>
    </div>
    <div class="url">hffmnn.com</div>
  `),

  tools: () =>
    baseTemplate(`
    <div class="logo">hffmnn</div>
    <div class="content">
      <h1 style="font-size: 72px; margin-bottom: 24px;">Tools & Projects</h1>
      <p style="font-size: 24px; color: ${COLORS.muted}; max-width: 700px; line-height: 1.5;">
        Open-source projects focused on privacy,<br>
        productivity, and beautiful design.
      </p>
    </div>
    <div class="url">hffmnn.com/tools</div>
  `),

  venture: () =>
    baseTemplate(`
    <div class="logo">hffmnn</div>
    <div class="content">
      <span class="badge" style="margin-bottom: 20px; width: fit-content;">Current Venture</span>
      <h1 style="font-size: 80px; margin-bottom: 16px;">Pulsyn</h1>
      <p style="font-size: 32px; color: ${COLORS.muted}; margin-bottom: 16px; font-style: italic;">
        Premium Smart Ring. Half the Price.
      </p>
      <p style="font-size: 20px; color: ${COLORS.muted}; max-width: 700px; line-height: 1.5;">
        Track sleep, fitness, and recovery with clinical-grade sensors for $149.
      </p>
    </div>
    <div class="url">hffmnn.com/venture</div>
  `),
};

async function generateOGImages() {
  console.log("Generating OG images...\n");

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: WIDTH, height: HEIGHT });

  for (const [name, templateFn] of Object.entries(templates)) {
    const html = templateFn();
    await page.setContent(html, { waitUntil: "domcontentloaded" });

    // Wait for fonts to load and render
    await page.evaluate(() => document.fonts.ready);
    await new Promise((r) => setTimeout(r, 1000));

    const outputName = name === "home" ? "og-image.png" : `og-${name}.png`;
    const outputPath = join(process.cwd(), "static", outputName);

    await page.screenshot({ path: outputPath, type: "png" });
    console.log(`  ${outputName}`);
  }

  await browser.close();
  console.log("\nDone!");
}

generateOGImages().catch(console.error);
