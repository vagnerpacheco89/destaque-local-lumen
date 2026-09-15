import { chromium } from 'playwright';
import fs from 'node:fs';

const baseUrl = 'https://vagnerpacheco89.github.io/destaque-local-lumen/';
const outDir = 'qa-artifacts';
fs.mkdirSync(outDir, { recursive: true });

const viewports = [
  { name: 'mobile-320', width: 320, height: 780 },
  { name: 'mobile-390', width: 390, height: 844 },
  { name: 'tablet-768', width: 768, height: 900 },
  { name: 'tablet-1024', width: 1024, height: 900 },
  { name: 'desktop-1440', width: 1440, height: 1000 }
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const failures = [];
const reports = [];

async function waitForMasterDeploy(page) {
  for (let i = 0; i < 30; i += 1) {
    const response = await page.goto(`${baseUrl}?masterqa=${Date.now()}`, { waitUntil: 'domcontentloaded', timeout: 45000 });
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href').catch(() => null);
    const staticFaq = await page.locator('#faq .faq-list details').count().catch(() => 0);
    if (response?.ok() && canonical === baseUrl && staticFaq === 6) return;
    await sleep(10000);
  }
  throw new Error('Timed out waiting for the consolidated MASTER candidate deploy.');
}

async function settleImagesAndLayout(page) {
  await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});
  await page.evaluate(() => document.fonts?.ready.then(() => true));
  await sleep(300);

  await page.evaluate(async () => {
    const height = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    for (let y = 0; y < height; y += 600) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 40));
    }
    window.scrollTo(0, 0);
    document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
      img.loading = 'eager';
    });
  });

  await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
  await page.waitForFunction(() => [...document.images].every((img) => img.complete), null, { timeout: 10000 }).catch(() => {});
  await sleep(500);
}

const browser = await chromium.launch({ headless: true });
try {
  for (const viewport of viewports) {
    const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height } });
    const page = await context.newPage();

    const consoleErrors = [];
    const pageErrors = [];
    const failedRequests = [];
    page.on('console', (msg) => {
      const loc = msg.location()?.url || '';
      if (msg.type() === 'error' && (!loc || loc.includes('vagnerpacheco89.github.io/destaque-local-lumen'))) {
        consoleErrors.push(msg.text());
      }
    });
    page.on('pageerror', (error) => pageErrors.push(error.message));
    page.on('requestfailed', (request) => {
      if (request.url().startsWith(baseUrl)) {
        failedRequests.push(`${request.method()} ${request.url()} :: ${request.failure()?.errorText || 'failed'}`);
      }
    });

    await waitForMasterDeploy(page);
    await settleImagesAndLayout(page);

    const staticReport = await page.evaluate(() => {
      const ids = [...document.querySelectorAll('[id]')].map((el) => el.id);
      const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
      const brokenHashes = [...document.querySelectorAll('a[href^="#"]')]
        .map((a) => a.getAttribute('href'))
        .filter((href) => href && href !== '#' && !document.getElementById(href.slice(1)));
      const brokenImages = [...document.images]
        .filter((img) => !img.complete || img.naturalWidth === 0)
        .map((img) => img.getAttribute('src'));
      const jsonLd = [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => {
        try { JSON.parse(s.textContent); return true; } catch { return false; }
      });
      const overflowElements = [...document.querySelectorAll('body *')].map((el) => {
        const rect = el.getBoundingClientRect();
        return {
          tag: el.tagName.toLowerCase(),
          id: el.id || null,
          className: typeof el.className === 'string' ? el.className : null,
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          width: Math.round(rect.width)
        };
      }).filter((item) => item.right > window.innerWidth + 1 || item.left < -1).slice(0, 20);

      return {
        title: document.title,
        h1Count: document.querySelectorAll('h1').length,
        duplicateIds,
        brokenHashes,
        brokenImages,
        overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
        overflowElements,
        robots: document.querySelector('meta[name="robots"]')?.content || null,
        canonical: document.querySelector('link[rel="canonical"]')?.href || null,
        ogTitle: document.querySelector('meta[property="og:title"]')?.content || null,
        twitterCard: document.querySelector('meta[name="twitter:card"]')?.content || null,
        jsonLd,
        faqCount: document.querySelectorAll('#faq .faq-list details').length,
        hasSince2017: document.body.innerText.toLowerCase().includes('desde 2017'),
        hasFinalCta: document.body.innerText.includes('Não precisa saber o nome do problema. Me conte o que está acontecendo.'),
        demoButtonsWithRealHref: [...document.querySelectorAll('[data-demo-cta]')].some((el) => /^(https?:|whatsapp:|tel:)/i.test(el.getAttribute('href') || ''))
      };
    });

    const localFailures = [];
    if (!staticReport.title) localFailures.push('missing title');
    if (staticReport.h1Count !== 1) localFailures.push(`h1 count ${staticReport.h1Count}`);
    if (staticReport.duplicateIds.length) localFailures.push(`duplicate ids: ${staticReport.duplicateIds.join(',')}`);
    if (staticReport.brokenHashes.length) localFailures.push(`broken hashes: ${staticReport.brokenHashes.join(',')}`);
    if (staticReport.brokenImages.length) localFailures.push(`broken images: ${staticReport.brokenImages.join(',')}`);
    if (staticReport.overflow) localFailures.push(`horizontal overflow: ${JSON.stringify(staticReport.overflowElements)}`);
    if (!staticReport.robots?.startsWith('noindex,follow')) localFailures.push(`robots=${staticReport.robots}`);
    if (staticReport.canonical !== baseUrl) localFailures.push(`canonical=${staticReport.canonical}`);
    if (!staticReport.ogTitle) localFailures.push('missing og:title');
    if (staticReport.twitterCard !== 'summary_large_image') localFailures.push(`twitter card=${staticReport.twitterCard}`);
    if (!staticReport.jsonLd.length || staticReport.jsonLd.includes(false)) localFailures.push('invalid JSON-LD');
    if (staticReport.faqCount !== 6) localFailures.push(`FAQ count ${staticReport.faqCount}`);
    if (staticReport.hasSince2017) localFailures.push('removed demo claim “desde 2017” resurfaced');
    if (!staticReport.hasFinalCta) localFailures.push('final CTA semantic text missing');
    if (staticReport.demoButtonsWithRealHref) localFailures.push('demo CTA points to a real external scheme');

    // Demo CTA: perform a real click on the first visible action while still at the top.
    const beforeUrl = page.url();
    const visibleDemoCta = page.locator('[data-demo-cta]:visible').first();
    await visibleDemoCta.click();
    await sleep(100);
    const dialogOpen = await page.locator('#demo-dialog').evaluate((el) => el.open);
    if (!dialogOpen) localFailures.push('demo dialog did not open');
    if (page.url().split('?')[0] !== beforeUrl.split('?')[0]) localFailures.push('demo CTA navigated away');
    await page.locator('[data-dialog-close]').first().click();

    // FAQ: native summary click, after explicitly stabilizing its viewport position.
    const faq = page.locator('#faq .faq-list details');
    if (await faq.count() >= 2) {
      const secondSummary = faq.nth(1).locator('summary');
      await secondSummary.scrollIntoViewIfNeeded();
      await sleep(350);
      await secondSummary.click({ force: true });
      await sleep(120);
      const openCount = await page.locator('#faq .faq-list details[open]').count();
      if (openCount !== 1) localFailures.push(`FAQ open count after interaction=${openCount}`);
    }

    // Mobile menu keyboard behavior.
    if (viewport.width <= 768) {
      const toggle = page.locator('.menu-toggle');
      await toggle.click();
      const openExpanded = await toggle.getAttribute('aria-expanded');
      const openLabel = await toggle.getAttribute('aria-label');
      if (openExpanded !== 'true' || openLabel !== 'Fechar menu') {
        localFailures.push(`mobile menu open state ${openExpanded}/${openLabel}`);
      }
      await page.keyboard.press('Escape');
      const closedExpanded = await toggle.getAttribute('aria-expanded');
      const closedLabel = await toggle.getAttribute('aria-label');
      const focused = await toggle.evaluate((el) => document.activeElement === el);
      if (closedExpanded !== 'false' || closedLabel !== 'Abrir menu' || !focused) {
        localFailures.push(`mobile menu close state ${closedExpanded}/${closedLabel}/focus=${focused}`);
      }
    }

    // Internal anchor must not leave the target hidden behind the fixed header.
    if (viewport.width >= 1024) {
      await page.locator('.desktop-nav a[href="#servicos"]').click();
      await sleep(1200);
      const targetTop = await page.locator('#servicos').evaluate((el) => el.getBoundingClientRect().top);
      if (targetTop < 70) localFailures.push(`anchor target hidden by header: ${targetTop}`);
    }

    // Back-to-top control should effectively return the document to the top.
    await page.locator('[data-back-top]').click();
    await page.waitForFunction(() => window.scrollY <= 12, null, { timeout: 2500 }).catch(() => {});
    const backTopY = await page.evaluate(() => window.scrollY);
    if (backTopY > 12) localFailures.push(`back-to-top ended at scrollY=${backTopY}`);

    await page.screenshot({ path: `${outDir}/${viewport.name}.png`, fullPage: true });

    reports.push({
      viewport,
      ...staticReport,
      consoleErrors,
      pageErrors,
      failedRequests,
      failures: localFailures
    });
    for (const failure of localFailures) failures.push(`${viewport.name}: ${failure}`);
    for (const e of consoleErrors) failures.push(`${viewport.name}: console: ${e}`);
    for (const e of pageErrors) failures.push(`${viewport.name}: pageerror: ${e}`);
    for (const e of failedRequests) failures.push(`${viewport.name}: requestfailed: ${e}`);

    await context.close();
  }

  // Reduced motion: carousel must not auto-advance.
  const reduced = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  const reducedPage = await reduced.newPage();
  await reducedPage.goto(`${baseUrl}?reduced=${Date.now()}`, { waitUntil: 'networkidle', timeout: 45000 });
  const beforeTransform = await reducedPage.locator('.work-carousel__track').evaluate((el) => getComputedStyle(el).transform);
  await sleep(5300);
  const afterTransform = await reducedPage.locator('.work-carousel__track').evaluate((el) => getComputedStyle(el).transform);
  if (beforeTransform !== afterTransform) failures.push('reduced-motion: work carousel auto-advanced');
  await reduced.close();

  const result = {
    date: new Date().toISOString(),
    url: baseUrl,
    status: failures.length ? 'FAIL' : 'PASS',
    failures,
    reports
  };
  fs.writeFileSync(`${outDir}/report.json`, JSON.stringify(result, null, 2));
  fs.writeFileSync(`${outDir}/console-report.txt`, failures.length ? failures.join('\n') : 'PASS — no blocking failures.\n');
  console.log(JSON.stringify({ status: result.status, failures: result.failures }, null, 2));
  if (failures.length) process.exitCode = 1;
} finally {
  await browser.close();
}
