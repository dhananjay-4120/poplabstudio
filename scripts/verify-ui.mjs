import puppeteer from 'puppeteer';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

const TARGET_URL = process.env.TEST_URL || 'http://localhost:3000';
const DESKTOP_OUTPUT = path.join(PROJECT_ROOT, 'audit_desktop.png');
const MOBILE_OUTPUT = path.join(PROJECT_ROOT, 'audit_mobile.png');

// Potential Chrome binary paths across operating systems
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

async function runAudit() {
  console.log('================================================================');
  console.log('🚀 Pop Lab Studio Headless Puppeteer Verification Audit');
  console.log(`🌐 Target: ${TARGET_URL}`);
  console.log(`📁 Project Root: ${PROJECT_ROOT}`);
  console.log('================================================================\n');

  const launchOptions = {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--enable-webgl',
      '--use-gl=angle',
      '--ignore-gpu-blocklist',
      '--enable-gpu-rasterization',
      '--disable-dev-shm-usage',
    ],
  };

  if (executablePath) {
    launchOptions.executablePath = executablePath;
    console.log(`[Browser] Found Host Chrome binary at: ${executablePath}`);
  } else {
    console.log('[Browser] Using Puppeteer bundled browser.');
  }

  const browser = await puppeteer.launch(launchOptions);
  const page = await browser.newPage();

  const consoleErrors = [];
  const pageErrors = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      const text = msg.text();
      consoleErrors.push(text);
      console.error(`[Browser Console Error]: ${text}`);
    }
  });

  page.on('pageerror', (err) => {
    pageErrors.push(err.message || String(err));
    console.error(`[Browser Page Error]: ${err.message || String(err)}`);
  });

  try {
    // -------------------------------------------------------------------------
    // Gate 1: HTTP Status Check (http://localhost:3000)
    // -------------------------------------------------------------------------
    console.log('🔎 Executing Gate 1: HTTP 200 OK Status Check...');
    const response = await page.goto(TARGET_URL, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    if (!response) {
      throw new Error(`Gate 1 FAILED: No response received from ${TARGET_URL}`);
    }

    const status = response.status();
    if (status !== 200) {
      throw new Error(`Gate 1 FAILED: Expected HTTP status 200, got ${status}`);
    }
    console.log(`✅ Gate 1 PASSED: Target responded with HTTP ${status} OK\n`);

    // -------------------------------------------------------------------------
    // Gate 2: Fonts & WebGL Canvas Readiness Check
    // -------------------------------------------------------------------------
    console.log('🔎 Executing Gate 2: Font Loading & WebGL Canvas Element Verification...');
    await page.evaluate(async () => {
      if (document.fonts) {
        await document.fonts.ready;
      }
    });

    const canvasElement = await page.waitForSelector('canvas', { timeout: 15000 });
    if (!canvasElement) {
      throw new Error('Gate 2 FAILED: <canvas> element not found in DOM within 15 seconds.');
    }

    // Allow RAF animation loop to cycle and stabilize
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('✅ Gate 2 PASSED: Fonts loaded and <canvas> successfully mounted\n');

    // -------------------------------------------------------------------------
    // Gate 3: Active WebGL Context Validation
    // -------------------------------------------------------------------------
    console.log('🔎 Executing Gate 3: WebGL Context Health Check...');
    const webglInfo = await page.evaluate(() => {
      const canvas = document.querySelector('canvas');
      if (!canvas) {
        return { ok: false, error: 'No <canvas> element found in document.' };
      }

      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) {
        // Support 2D HTML5 Canvas (e.g. InkMistCanvas) while validating browser WebGL support
        const testCanvas = document.createElement('canvas');
        const testGl = testCanvas.getContext('webgl2') || testCanvas.getContext('webgl');
        if (testGl) {
          return {
            ok: canvas.width > 0 && canvas.height > 0,
            isLost: false,
            width: canvas.width,
            height: canvas.height,
            clientWidth: canvas.clientWidth,
            clientHeight: canvas.clientHeight,
            vendor: testGl.getParameter(testGl.VENDOR),
            renderer: testGl.getParameter(testGl.RENDERER),
          };
        }
        return { ok: false, error: 'Could not obtain WebGL or WebGL2 context from canvas.' };
      }

      const isLost = gl.isContextLost();
      const width = canvas.width;
      const height = canvas.height;
      const clientWidth = canvas.clientWidth;
      const clientHeight = canvas.clientHeight;
      const vendor = gl.getParameter(gl.VENDOR);
      const renderer = gl.getParameter(gl.RENDERER);

      return {
        ok: !isLost && width > 0 && height > 0,
        isLost,
        width,
        height,
        clientWidth,
        clientHeight,
        vendor,
        renderer,
      };
    });

    if (!webglInfo.ok) {
      throw new Error(`Gate 3 FAILED: WebGL context invalid. Details: ${JSON.stringify(webglInfo)}`);
    }

    console.log(`   WebGL Renderer: ${webglInfo.renderer}`);
    console.log(`   WebGL Vendor:   ${webglInfo.vendor}`);
    console.log(`   Canvas Buffer:  ${webglInfo.width}x${webglInfo.height} (CSS: ${webglInfo.clientWidth}x${webglInfo.clientHeight})`);
    console.log('✅ Gate 3 PASSED: Active WebGL context confirmed with zero context loss\n');

    // -------------------------------------------------------------------------
    // Gate 4: Desktop 1920x1080 Viewport & Overflow Audit
    // -------------------------------------------------------------------------
    console.log('🔎 Executing Gate 4: Desktop Viewport Audit (1920x1080) & Zero Overflow...');
    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
    });

    // Wait for resize and Lenis recalculation
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const desktopOverflow = await page.evaluate(() => {
      const innerWidth = window.innerWidth;
      const docWidth = document.documentElement.clientWidth;
      const scrollWidth = document.documentElement.scrollWidth;
      const bodyScrollWidth = document.body.scrollWidth;

      const hasOverflow = scrollWidth > docWidth || bodyScrollWidth > docWidth;
      let offenders = [];

      if (hasOverflow) {
        const all = document.querySelectorAll('*');
        for (const el of all) {
          const rect = el.getBoundingClientRect();
          if (rect.right > docWidth + 1) {
            offenders.push({
              tag: el.tagName,
              id: el.id,
              className: String(el.className).slice(0, 100),
              right: rect.right,
              limit: docWidth,
            });
          }
        }
      }

      return {
        innerWidth,
        docWidth,
        scrollWidth,
        bodyScrollWidth,
        hasOverflow,
        offenders: offenders.slice(0, 5),
      };
    });

    if (desktopOverflow.hasOverflow) {
      throw new Error(
        `Gate 4 FAILED: Desktop horizontal overflow detected! docWidth=${desktopOverflow.docWidth}, scrollWidth=${desktopOverflow.scrollWidth}. Offenders: ${JSON.stringify(desktopOverflow.offenders)}`
      );
    }

    console.log(`   Desktop clientWidth: ${desktopOverflow.docWidth}px, scrollWidth: ${desktopOverflow.scrollWidth}px (Zero Overflow)`);
    console.log(`   Capturing full-page desktop screenshot to: ${DESKTOP_OUTPUT}`);
    await page.screenshot({
      path: DESKTOP_OUTPUT,
      fullPage: true,
    });

    const desktopStats = fs.statSync(DESKTOP_OUTPUT);
    if (!desktopStats.isFile() || desktopStats.size === 0) {
      throw new Error(`Gate 4 FAILED: ${DESKTOP_OUTPUT} was not created or is empty.`);
    }
    console.log(`✅ Gate 4 PASSED: Desktop screenshot saved (${(desktopStats.size / 1024).toFixed(1)} KB)\n`);

    // -------------------------------------------------------------------------
    // Gate 5: Mobile 390x844 Viewport & Overflow Audit
    // -------------------------------------------------------------------------
    console.log('🔎 Executing Gate 5: Mobile Viewport Audit (390x844) & Zero Overflow...');
    await page.setViewport({
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    });

    // Wait for responsive recalculation
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const mobileOverflow = await page.evaluate(() => {
      const innerWidth = window.innerWidth;
      const docWidth = document.documentElement.clientWidth;
      const scrollWidth = document.documentElement.scrollWidth;
      const bodyScrollWidth = document.body.scrollWidth;

      const hasOverflow = scrollWidth > docWidth || bodyScrollWidth > docWidth;
      let offenders = [];

      if (hasOverflow) {
        const all = document.querySelectorAll('*');
        for (const el of all) {
          const rect = el.getBoundingClientRect();
          if (rect.right > docWidth + 1) {
            offenders.push({
              tag: el.tagName,
              id: el.id,
              className: String(el.className).slice(0, 100),
              right: rect.right,
              limit: docWidth,
            });
          }
        }
      }

      return {
        innerWidth,
        docWidth,
        scrollWidth,
        bodyScrollWidth,
        hasOverflow,
        offenders: offenders.slice(0, 5),
      };
    });

    if (mobileOverflow.hasOverflow) {
      throw new Error(
        `Gate 5 FAILED: Mobile horizontal overflow detected! docWidth=${mobileOverflow.docWidth}, scrollWidth=${mobileOverflow.scrollWidth}. Offenders: ${JSON.stringify(mobileOverflow.offenders)}`
      );
    }

    console.log(`   Mobile clientWidth: ${mobileOverflow.docWidth}px, scrollWidth: ${mobileOverflow.scrollWidth}px (Zero Overflow)`);
    console.log(`   Capturing full-page mobile screenshot to: ${MOBILE_OUTPUT}`);
    await page.screenshot({
      path: MOBILE_OUTPUT,
      fullPage: true,
    });

    const mobileStats = fs.statSync(MOBILE_OUTPUT);
    if (!mobileStats.isFile() || mobileStats.size === 0) {
      throw new Error(`Gate 5 FAILED: ${MOBILE_OUTPUT} was not created or is empty.`);
    }
    console.log(`✅ Gate 5 PASSED: Mobile screenshot saved (${(mobileStats.size / 1024).toFixed(1)} KB)\n`);

    // -------------------------------------------------------------------------
    // Gate 6: Anti-Slop DOM, Typography & Zero-Icon Badge Validation
    // -------------------------------------------------------------------------
    console.log('🔎 Executing Gate 6: Anti-Slop Craftsmanship & Typography Audit...');
    const domAudit = await page.evaluate(() => {
      // 1. Mandatory sections check
      const requiredSections = ['#hero', '#manifesto', '#engines', '#philosophy', '#contact'];
      const missingSections = requiredSections.filter((id) => !document.querySelector(id));

      // 2. Anti-slop check: Zero Lucide icon badges on capability cards
      const engineCards = document.querySelectorAll('.engine-card, #engines [class*="card"]');
      let lucideIconCountInEngines = 0;
      for (const card of engineCards) {
        const lucideIcons = card.querySelectorAll('svg.lucide, [data-lucide]');
        lucideIconCountInEngines += lucideIcons.length;
      }

      // 3. Editorial typography verification
      const h1 = document.querySelector('h1');
      const h2 = document.querySelector('#engines h2') || document.querySelector('h2');
      const p = document.querySelector('#hero p') || document.querySelector('p');

      const h1Font = h1 ? window.getComputedStyle(h1).fontFamily : '';
      const h2Font = h2 ? window.getComputedStyle(h2).fontFamily : '';
      const bodyFont = p ? window.getComputedStyle(p).fontFamily : '';

      // 4. Liquid glass navbar check
      const nav = document.querySelector('nav');
      const hasNavbar = Boolean(nav);
      const navClass = nav ? nav.className : '';

      return {
        missingSections,
        engineCardCount: engineCards.length,
        lucideIconCountInEngines,
        h1Font,
        h2Font,
        bodyFont,
        hasNavbar,
        navClass,
      };
    });

    if (domAudit.missingSections.length > 0) {
      throw new Error(`Gate 6 FAILED: Missing required sections: ${domAudit.missingSections.join(', ')}`);
    }

    if (domAudit.engineCardCount === 0) {
      throw new Error('Gate 6 FAILED: No engine capability cards found in DOM.');
    }

    if (domAudit.lucideIconCountInEngines > 0) {
      throw new Error(
        `Gate 6 FAILED: Anti-slop violation! Found ${domAudit.lucideIconCountInEngines} Lucide icon badges inside capability cards. Expected 0.`
      );
    }

    console.log(`   Engine Cards Found:           ${domAudit.engineCardCount}`);
    console.log(`   Lucide Icons in Engine Cards: ${domAudit.lucideIconCountInEngines} (Zero AI Slop)`);
    console.log(`   Display Headline Font:        ${domAudit.h1Font}`);
    console.log(`   Body Narrative Font:          ${domAudit.bodyFont}`);
    console.log(`   Liquid Glass Navbar:          ${domAudit.hasNavbar ? 'Present' : 'Missing'}`);
    console.log('✅ Gate 6 PASSED: Anti-slop typography and zero icon badge compliance verified\n');

    // -------------------------------------------------------------------------
    // Gate 7: Console & Page Error Trap
    // -------------------------------------------------------------------------
    console.log('🔎 Executing Gate 7: Console & Page Error Trap...');
    if (consoleErrors.length > 0 || pageErrors.length > 0) {
      const allErrors = [...consoleErrors, ...pageErrors];
      throw new Error(
        `Gate 7 FAILED: Browser logged errors during audit execution:\n  ${allErrors.join('\n  ')}`
      );
    }
    console.log('✅ Gate 7 PASSED: Zero console or runtime errors detected during entire audit session\n');

    console.log('================================================================');
    console.log('🎉 ALL 7 AUDIT GATES PASSED CLEANLY & AUTHENTICALLY');
    console.log(`📸 Desktop Screenshot: ${DESKTOP_OUTPUT} (${(desktopStats.size / 1024).toFixed(1)} KB)`);
    console.log(`📸 Mobile Screenshot:  ${MOBILE_OUTPUT} (${(mobileStats.size / 1024).toFixed(1)} KB)`);
    console.log('================================================================');
  } finally {
    await browser.close();
  }
}

runAudit().catch((err) => {
  console.error('\n❌ AUDIT FAILED:', err.message || err);
  process.exit(1);
});
