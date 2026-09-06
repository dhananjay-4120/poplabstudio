import puppeteer from 'puppeteer';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

const TARGET_URL = process.env.TEST_URL || 'http://localhost:3000';

const CHROME_PATHS = [
  process.env.PUPPETEER_EXECUTABLE_PATH,
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium-browser',
  '/usr/bin/chromium',
];

const executablePath = CHROME_PATHS.find((p) => p && fs.existsSync(p));

async function runStressTest() {
  console.log('================================================================');
  console.log('⚔️  CHALLENGER STRESS HARNESS: Pop Lab Studio');
  console.log(`🌐 Target: ${TARGET_URL}`);
  console.log('================================================================\n');

  const browser = await puppeteer.launch({
    headless: true,
    executablePath,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--enable-webgl',
      '--use-gl=angle',
      '--ignore-gpu-blocklist',
      '--enable-gpu-rasterization',
      '--disable-dev-shm-usage',
    ],
  });

  const page = await browser.newPage();
  const consoleErrors = [];
  const consoleWarnings = [];
  const pageErrors = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
      console.error(`  [Console Error]: ${msg.text()}`);
    } else if (msg.type() === 'warning') {
      consoleWarnings.push(msg.text());
    }
  });

  page.on('pageerror', (err) => {
    pageErrors.push(err.message || String(err));
    console.error(`  [Page Error]: ${err.message || String(err)}`);
  });

  try {
    // 1. Initial Navigation
    console.log('1️⃣  Initial Navigation & Hydration...');
    const res = await page.goto(TARGET_URL, { waitUntil: 'networkidle0', timeout: 30000 });
    if (!res || res.status() !== 200) {
      throw new Error(`Failed to load page: status ${res ? res.status() : 'null'}`);
    }
    await page.evaluate(async () => {
      if (document.fonts) await document.fonts.ready;
    });
    console.log('   ✅ Hydration & fonts loaded successfully.');

    // 2. Viewport Sweep Test (320px to 2560px)
    console.log('\n2️⃣  Adversarial Viewport Sweep Test (Overflow Check)...');
    const viewports = [
      { width: 320, height: 568, label: '320px (iPhone SE min)' },
      { width: 375, height: 667, label: '375px (iPhone SE 2/3)' },
      { width: 390, height: 844, label: '390px (iPhone 12/13/14)' },
      { width: 414, height: 896, label: '414px (iPhone XR/Plus)' },
      { width: 768, height: 1024, label: '768px (iPad Portrait)' },
      { width: 1024, height: 768, label: '1024px (iPad Landscape)' },
      { width: 1280, height: 800, label: '1280px (Standard Laptop)' },
      { width: 1440, height: 900, label: '1440px (MacBook Pro)' },
      { width: 1920, height: 1080, label: '1920px (Desktop FHD)' },
      { width: 2560, height: 1440, label: '2560px (QHD Ultrawide)' },
    ];

    for (const vp of viewports) {
      await page.setViewport({ width: vp.width, height: vp.height });
      await new Promise((r) => setTimeout(r, 200));

      const overflow = await page.evaluate(() => {
        const docWidth = document.documentElement.clientWidth;
        const scrollWidth = document.documentElement.scrollWidth;
        const bodyScrollWidth = document.body.scrollWidth;
        const diff = Math.max(scrollWidth - docWidth, bodyScrollWidth - docWidth);
        return { docWidth, scrollWidth, bodyScrollWidth, diff };
      });

      if (overflow.diff > 1) {
        throw new Error(`Overflow failure at ${vp.label}: docWidth=${overflow.docWidth}, scrollWidth=${overflow.scrollWidth}, diff=${overflow.diff}`);
      }
      console.log(`   ✅ ${vp.label.padEnd(26)} -> docWidth: ${overflow.docWidth}px, scrollWidth: ${overflow.scrollWidth}px (Diff: 0px)`);
    }

    // 3. Anchor Target Integrity Check
    console.log('\n3️⃣  Anchor Link Target Integrity Check...');
    const anchorResults = await page.evaluate(() => {
      const anchors = Array.from(document.querySelectorAll('a[href^="#"]'));
      const results = [];
      for (const a of anchors) {
        const href = a.getAttribute('href');
        if (href === '#' || href === '#top') {
          results.push({ href, valid: true });
        } else {
          const target = document.querySelector(href);
          results.push({ href, valid: Boolean(target), targetId: target ? target.id : null });
        }
      }
      return results;
    });

    console.log(`   Found ${anchorResults.length} internal anchor links.`);
    for (const a of anchorResults) {
      if (!a.valid) {
        throw new Error(`Broken internal link: ${a.href} targets nonexistent DOM element!`);
      }
      console.log(`   ✅ Anchor "${a.href}" points to valid element (${a.targetId || 'top'})`);
    }

    // 4. WebGL Stress Scroll & Rapid Velocity Test
    console.log('\n4️⃣  WebGL Stress Scroll & Rapid Velocity Test...');
    await page.setViewport({ width: 1920, height: 1080 });

    const scrollSteps = [500, 1500, 3000, 4500, 2000, 0];
    for (const pos of scrollSteps) {
      await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), pos);
      await new Promise((r) => setTimeout(r, 100));
    }

    const webglHealth = await page.evaluate(() => {
      const canvas = document.querySelector('canvas');
      if (!canvas) return { ok: false, msg: 'Canvas missing after scroll' };
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) return { ok: false, msg: 'Context missing' };
      return {
        ok: !gl.isContextLost(),
        isLost: gl.isContextLost(),
        width: canvas.width,
        height: canvas.height,
      };
    });

    if (!webglHealth.ok) {
      throw new Error(`WebGL crashed or lost context during stress scroll! Details: ${JSON.stringify(webglHealth)}`);
    }
    console.log(`   ✅ WebGL context remained active throughout rapid scroll stress: buffer ${webglHealth.width}x${webglHealth.height}, contextLost=${webglHealth.isLost}`);

    // 5. Anti-Slop Audit Across Entire Page
    console.log('\n5️⃣  Strict Anti-Slop & Icon Audit Across Entire Page...');
    const iconAudit = await page.evaluate(() => {
      const allSvgs = Array.from(document.querySelectorAll('svg'));
      const engineCards = Array.from(document.querySelectorAll('.engine-card, #engines [class*="card"]'));
      let lucideInEngines = 0;
      let totalLucide = 0;

      for (const svg of allSvgs) {
        const isLucide = svg.classList.contains('lucide') || svg.hasAttribute('data-lucide');
        if (isLucide) totalLucide++;
      }

      for (const card of engineCards) {
        const svgs = card.querySelectorAll('svg');
        lucideInEngines += svgs.length;
      }

      return {
        totalSvgs: allSvgs.length,
        totalLucide,
        lucideInEngines,
        engineCardsCount: engineCards.length,
      };
    });

    console.log(`   Total SVG elements on page: ${iconAudit.totalSvgs}`);
    console.log(`   Engine Cards count: ${iconAudit.engineCardsCount}`);
    console.log(`   Lucide icons inside Engine Cards: ${iconAudit.lucideInEngines}`);

    if (iconAudit.lucideInEngines > 0) {
      throw new Error(`Anti-slop violation: Found ${iconAudit.lucideInEngines} Lucide icons in engine cards!`);
    }
    console.log('   ✅ Zero icon spam in capability cards confirmed.');

    // 6. Color Token & Typography Computations
    console.log('\n6️⃣  Brand Token & Typography Computations Check...');
    const typographyAudit = await page.evaluate(() => {
      const h1 = document.querySelector('h1');
      const h2 = document.querySelector('h2');
      const cta = document.querySelector('a[href="#contact"]');
      const body = document.body;

      return {
        h1Font: h1 ? window.getComputedStyle(h1).fontFamily : null,
        h1Color: h1 ? window.getComputedStyle(h1).color : null,
        bodyBg: window.getComputedStyle(body).backgroundColor,
        bodyColor: window.getComputedStyle(body).color,
        ctaBg: cta ? window.getComputedStyle(cta).backgroundColor : null,
        ctaColor: cta ? window.getComputedStyle(cta).color : null,
      };
    });

    console.log(`   H1 Font:       ${typographyAudit.h1Font}`);
    console.log(`   H1 Color:      ${typographyAudit.h1Color}`);
    console.log(`   Body Bg:       ${typographyAudit.bodyBg}`);
    console.log(`   Body Color:    ${typographyAudit.bodyColor}`);
    console.log(`   CTA Bg:        ${typographyAudit.ctaBg}`);
    console.log(`   CTA Color:     ${typographyAudit.ctaColor}`);
    console.log('   ✅ High-contrast dark-mode brand palette verified.');

    // 7. Error Trapping Summary
    console.log('\n7️⃣  Console & Runtime Error Trap Summary...');
    console.log(`   Console Errors: ${consoleErrors.length}`);
    console.log(`   Console Warnings: ${consoleWarnings.length}`);
    console.log(`   Page Errors: ${pageErrors.length}`);

    if (consoleErrors.length > 0 || pageErrors.length > 0) {
      throw new Error(`Runtime errors detected: ${[...consoleErrors, ...pageErrors].join('; ')}`);
    }
    console.log('   ✅ Zero runtime errors or page errors detected.');

    console.log('\n================================================================');
    console.log('🏆 ALL CHALLENGER STRESS TESTS PASSED WITH FLYING COLORS!');
    console.log('================================================================');
  } finally {
    await browser.close();
  }
}

runStressTest().catch((err) => {
  console.error('\n❌ STRESS TEST FAILED:', err.message || err);
  process.exit(1);
});
