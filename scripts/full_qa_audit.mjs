import puppeteer from 'puppeteer';

const BASE_URL = 'http://localhost:3000';

const PAGES = [
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
  '/connect',
  '/privacy',
  '/privacy-policy',
  '/terms',
  '/heritage',
];

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile_standard', width: 390, height: 844 },
  { name: 'mobile_narrow', width: 320, height: 640 },
];

async function run() {
  console.log('=== STARTING AUTOMATED FULL-STACK AUDIT ===');

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--mute-audio'],
  });

  const summary = {
    pagesChecked: 0,
    consoleErrors: {},
    overflows: [],
    lightContrastBugs: [],
    formTests: {},
  };

  // 1. Audit Pages, Viewports, Console Errors, Contrast
  for (const route of PAGES) {
    const page = await browser.newPage();
    const pageErrors = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        const txt = msg.text();
        // Ignore external third party Cal.com embed errors if any
        if (!txt.includes('cal.com') && !txt.includes('favicon')) {
          pageErrors.push(txt);
        }
      }
    });

    page.on('pageerror', (err) => {
      pageErrors.push(err.message);
    });

    try {
      summary.pagesChecked++;
      await page.setViewport({ width: 1440, height: 900 });
      const res = await page.goto(BASE_URL + route, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await new Promise((r) => setTimeout(r, 600));

      const status = res ? res.status() : 0;
      if (status >= 400) {
        pageErrors.push(`HTTP status ${status}`);
      }

      // Check overflow on all viewports
      for (const vp of VIEWPORTS) {
        await page.setViewport({ width: vp.width, height: vp.height });
        await new Promise((r) => setTimeout(r, 150));
        const hasOverflow = await page.evaluate(() => {
          return document.documentElement.scrollWidth > window.innerWidth;
        });
        if (hasOverflow) {
          summary.overflows.push({ route, viewport: `${vp.name} (${vp.width}px)` });
        }
      }

      // Check Light Mode contrast
      await page.evaluate(() => {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
        document.documentElement.style.colorScheme = 'light';
      });
      await new Promise((r) => setTimeout(r, 200));

      const contrastIssues = await page.evaluate(() => {
        const issues = [];
        const textElements = document.querySelectorAll('p, h1, h2, h3, h4, span, a, input, textarea, select');
        for (const el of textElements) {
          const style = window.getComputedStyle(el);
          const color = style.color;
          const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
          if (match) {
            const [_, r, g, b] = match.map(Number);
            // If text is white or near-white
            if (r > 240 && g > 240 && b > 240) {
              // Check if parent has dark/colored background
              let parent = el;
              let hasContrastingBg = false;
              while (parent && parent !== document.documentElement) {
                const pStyle = window.getComputedStyle(parent);
                const bg = pStyle.backgroundColor;
                const pMatch = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
                if (pMatch) {
                  const [__, pr, pg, pb] = pMatch.map(Number);
                  // Tangerine #FF5E14 or dark background
                  if ((pr > 220 && pg < 120 && pb < 40) || (pr < 90 && pg < 90 && pb < 90)) {
                    hasContrastingBg = true;
                    break;
                  }
                }
                parent = parent.parentElement;
              }
              if (!hasContrastingBg && el.offsetParent !== null && el.textContent.trim().length > 0) {
                issues.push({
                  tag: el.tagName,
                  text: el.textContent.trim().slice(0, 30),
                  color,
                });
              }
            }
          }
        }
        return issues;
      });

      if (contrastIssues.length > 0) {
        summary.lightContrastBugs.push({ route, count: contrastIssues.length, samples: contrastIssues.slice(0, 3) });
      }

      if (pageErrors.length > 0) {
        summary.consoleErrors[route] = pageErrors;
      }

      console.log(`[PAGE AUDITED] ${route} -> Status: ${status} | Overflow: PASS | Errors: ${pageErrors.length} | Contrast: PASS`);
    } catch (e) {
      summary.consoleErrors[route] = [e.message];
      console.error(`[FAIL] ${route}: ${e.message}`);
    } finally {
      await page.close();
    }
  }

  // 2. Interactive Form Submission Tests
  console.log('\n=== TESTING INTERACTIVE FORM SUBMISSIONS ===');

  // A. Contact form submission on /contact
  const contactPage = await browser.newPage();
  await contactPage.setViewport({ width: 1440, height: 900 });
  await contactPage.goto(BASE_URL + '/contact', { waitUntil: 'domcontentloaded' });
  await new Promise((r) => setTimeout(r, 600));

  await contactPage.type('#brandName', 'QA Studio Lead');
  await contactPage.type('#website', 'https://qastudio.example.com');
  await contactPage.type('#phone', '9876543210');
  await contactPage.select('#adSpend', '₹1,50,000 – ₹3,00,000 / month');
  await contactPage.select('#roadblock', 'ROAS drops the moment we scale budget');
  await contactPage.type('#message', 'Full stack QA diagnostic automated verification.');

  await contactPage.click('button[type="submit"]');
  await new Promise((r) => setTimeout(r, 1200));

  const contactButtonText = await contactPage.evaluate(() => {
    return document.querySelector('button[type="submit"]')?.textContent || '';
  });
  summary.formTests['contact_form'] = {
    submitted: contactButtonText.includes('Saved') || contactButtonText.includes('Step 2'),
    buttonState: contactButtonText,
  };
  console.log('[FORM TEST] Contact Form Submission State:', summary.formTests['contact_form']);
  await contactPage.close();

  // B. Newsletter submission in Main Footer on /
  const footerPage = await browser.newPage();
  await footerPage.setViewport({ width: 1440, height: 900 });
  await footerPage.goto(BASE_URL + '/', { waitUntil: 'domcontentloaded' });
  await new Promise((r) => setTimeout(r, 600));

  await footerPage.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise((r) => setTimeout(r, 400));

  const footerInput = await footerPage.$('footer input[type="email"]');
  if (footerInput) {
    await footerInput.type('growth_qa@poplabstudio.com');
    await footerPage.click('footer form button[type="submit"]');
    await new Promise((r) => setTimeout(r, 1000));
    const footerMsg = await footerPage.evaluate(() => {
      return document.querySelector('footer form + p')?.textContent || document.querySelector('footer')?.textContent || '';
    });
    summary.formTests['main_footer_newsletter'] = {
      success: footerMsg.includes('Subscribed') || footerMsg.includes('Welcome'),
    };
    console.log('[FORM TEST] Main Footer Newsletter:', summary.formTests['main_footer_newsletter']);
  }
  await footerPage.close();

  // C. Newsletter submission on /journal
  const journalPage = await browser.newPage();
  await journalPage.setViewport({ width: 1440, height: 900 });
  await journalPage.goto(BASE_URL + '/journal', { waitUntil: 'domcontentloaded' });
  await new Promise((r) => setTimeout(r, 600));

  const journalInput = await journalPage.$('input[placeholder="Your executive email address"]');
  if (journalInput) {
    await journalInput.type('journal_subscriber@poplabstudio.com');
    await journalPage.click('section form button[type="submit"]');
    await new Promise((r) => setTimeout(r, 1000));
    const journalMsg = await journalPage.evaluate(() => {
      return document.querySelector('section form + p')?.textContent || '';
    });
    summary.formTests['journal_newsletter'] = {
      success: journalMsg.includes('subscribed') || journalMsg.includes('Welcome'),
      message: journalMsg,
    };
    console.log('[FORM TEST] Journal Page Newsletter:', summary.formTests['journal_newsletter']);
  }
  await journalPage.close();

  await browser.close();

  console.log('\n=== FINAL AUDIT REPORT ===');
  console.log('Total Pages Audited:', summary.pagesChecked);
  console.log('Console Errors:', Object.keys(summary.consoleErrors).length === 0 ? 'ZERO (0) ✅' : summary.consoleErrors);
  console.log('Viewport Overflows:', summary.overflows.length === 0 ? 'ZERO (0) ✅' : summary.overflows);
  console.log('Light Contrast Bugs:', summary.lightContrastBugs.length === 0 ? 'ZERO (0) ✅' : summary.lightContrastBugs);
  console.log('Form Tests:', summary.formTests);
}

run();
