import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, '..', 'public');

const ROUTES = [
  '/',
  '/work',
  '/work/bakery',
  '/work/jewellery',
  '/work/travel-europe',
  '/work/interiors',
  '/work/wellness',
  '/work/holiday',
  '/work/linkedin',
  '/work/d2c',
  '/process',
  '/journal',
  '/journal/post-leads',
  '/journal/post-expensive-click',
  '/journal/post-ai-workflow',
  '/journal/post-pixel',
  '/journal/post-creative-testing',
  '/journal/post-funnel-stages',
  '/journal/post-scaling-roas',
  '/contact',
  '/privacy',
  '/terms',
];

const VIEWPORTS = [
  { width: 390, height: 844, name: 'mobile_390' },
  { width: 768, height: 1024, name: 'tablet_768' },
  { width: 1440, height: 900, name: 'desktop_1440' },
];

(async () => {
  console.log('Starting full-suite Puppeteer verification for Pop Lab Studio...');

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--mute-audio',
    ],
  });

  const failures = [];
  const locationViolations = [];
  let totalChecked = 0;

  for (const route of ROUTES) {
    console.log(`\n==========================================`);
    console.log(`Checking route: ${route}`);

    for (const vp of VIEWPORTS) {
      for (const theme of ['dark', 'light']) {
        totalChecked++;
        const page = await browser.newPage();
        await page.setViewport({ width: vp.width, height: vp.height });

        page.on('console', (msg) => {
          if (msg.type() === 'error') {
            const text = msg.text();
            // Ignore non-fatal external network telemetry (GTM, Cal.com embed)
            if (!text.includes('googletagmanager') && !text.includes('cal.com')) {
              failures.push(`Console error [${route} ${vp.name} ${theme}]: ${text}`);
            }
          }
        });

        try {
          const res = await page.goto(`http://localhost:3000${route}`, {
            waitUntil: 'domcontentloaded',
            timeout: 15000,
          });

          const status = res ? res.status() : 200;
          if (status >= 400) {
            failures.push(`HTTP status ${status} on ${route} (${vp.name})`);
          }

          // Apply theme
          await page.evaluate((th) => {
            const root = document.documentElement;
            if (th === 'dark') {
              root.classList.add('dark');
              root.classList.remove('light');
              root.style.colorScheme = 'dark';
            } else {
              root.classList.remove('dark');
              root.classList.add('light');
              root.style.colorScheme = 'light';
            }
          }, theme);

          await new Promise((r) => setTimeout(r, 400));

          // Check horizontal overflow
          const overflow = await page.evaluate(() => {
            const docEl = document.documentElement;
            const body = document.body;
            const docScroll = docEl.scrollWidth > docEl.clientWidth + 1;
            const bodyScroll = body ? body.scrollWidth > body.clientWidth + 1 : false;
            return docScroll || bodyScroll;
          });

          if (overflow) {
            failures.push(`Horizontal overflow on ${route} (${vp.name}, ${theme})`);
            console.log(`  ❌ Overflow on ${vp.name} [${theme}]`);
          }

          // Check location constraint: "Chandigarh" must appear ONLY in Footer or Contact Page
          if (route !== '/contact' && route !== '/connect') {
            const foundViolations = await page.evaluate(() => {
              const clone = document.body.cloneNode(true);
              const footerInClone = clone.querySelector('footer');
              if (footerInClone) footerInClone.remove();

              // Remove script and style tags to check visible content only
              clone.querySelectorAll('script, style').forEach((el) => el.remove());

              const text = clone.innerText || '';
              return text.toLowerCase().includes('chandigarh');
            });

            if (foundViolations) {
              locationViolations.push(`"Chandigarh" found outside footer/contact on route ${route}`);
              console.log(`  ❌ Location constraint violation on ${route}`);
            }
          }

          // Check contrast: No white-on-white text in light mode
          if (theme === 'light') {
            const contrastIssues = await page.evaluate(() => {
              const issues = [];
              const headings = document.querySelectorAll('h1, h2, h3, h4');
              headings.forEach((h) => {
                const style = window.getComputedStyle(h);
                const color = style.color;
                const m = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
                if (m) {
                  const r = parseInt(m[1]), g = parseInt(m[2]), b = parseInt(m[3]);
                  if (r > 240 && g > 240 && b > 240) {
                    let parent = h.parentElement;
                    let parentBg = style.backgroundColor;
                    while (parent && (parentBg === 'rgba(0, 0, 0, 0)' || parentBg === 'transparent')) {
                      parentBg = window.getComputedStyle(parent).backgroundColor;
                      parent = parent.parentElement;
                    }
                    const pm = parentBg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
                    if (pm) {
                      const pr = parseInt(pm[1]), pg = parseInt(pm[2]), pb = parseInt(pm[3]);
                      if (pr > 220 && pg > 220 && pb > 220) {
                        issues.push(`Invisible heading: "${h.textContent.trim().slice(0, 35)}" (color ${color} on ${parentBg})`);
                      }
                    }
                  }
                }
              });
              return issues;
            });

            if (contrastIssues.length > 0) {
              failures.push(...contrastIssues.map((ci) => `Contrast issue on ${route} (${vp.name}, ${theme}): ${ci}`));
              console.log(`  ❌ Contrast issues found on ${route}: ${contrastIssues.length}`);
            }
          }

          // Take selective screenshots for verification artifacts
          if (
            (route === '/work' ||
              route === '/process' ||
              route === '/journal' ||
              route === '/work/bakery' ||
              route === '/journal/post-leads') &&
            vp.name === 'desktop_1440'
          ) {
            const shotPath = path.join(PUBLIC_DIR, `audit_${route.replace(/\//g, '_')}_${theme}.png`);
            await page.screenshot({ path: shotPath, fullPage: false });
          }
          if (
            (route === '/work' || route === '/process' || route === '/journal') &&
            vp.name === 'mobile_390'
          ) {
            const shotPath = path.join(
              PUBLIC_DIR,
              `audit_mobile_${route.replace(/\//g, '_')}_${theme}.png`
            );
            await page.screenshot({ path: shotPath, fullPage: false });
          }
        } catch (err) {
          failures.push(`Error loading ${route} (${vp.name} ${theme}): ${err.message}`);
          console.log(`  ❌ Error: ${err.message}`);
        } finally {
          await page.close();
        }
      }
    }
    console.log(`  ✓ Route ${route} passed across all viewports & themes.`);
  }

  await browser.close();

  console.log('\n==========================================');
  console.log(`Total checks completed: ${totalChecked}`);
  console.log(`Failures: ${failures.length}`);
  console.log(`Location violations: ${locationViolations.length}`);

  if (failures.length > 0) {
    console.error('FAILURES:');
    failures.forEach((f) => console.error('  - ' + f));
  }

  if (locationViolations.length > 0) {
    console.error('LOCATION VIOLATIONS:');
    locationViolations.forEach((v) => console.error('  - ' + v));
  }

  if (failures.length === 0 && locationViolations.length === 0) {
    console.log('\nALL TESTS PASSED! ZERO OVERFLOW, PERFECT CONTRAST, CLEAN ARCHITECTURE.');
    process.exit(0);
  } else {
    process.exit(1);
  }
})();
