import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('Contatti renders complete Page 06 structure', async ({ page }) => {
  const response = await page.goto('/contatti.html', { waitUntil:'networkidle' });
  expect(response?.ok()).toBeTruthy();

  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('main > section')).toHaveCount(5);
  await expect(page.locator('.contact-route')).toHaveCount(2);
  await expect(page.locator('.contact-slot-list article')).toHaveCount(3);
  await expect(page.locator('.contact-before-grid a')).toHaveCount(3);
  await expect(page.locator('a[aria-current="page"]')).toHaveCount(2);
  await expect(page.locator('form')).toHaveCount(0);
  await expect(page.locator('main img')).toHaveCount(0);

  const overflow = await page.evaluate(() =>
    document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
  expect(overflow).toBeLessThanOrEqual(1);
});

test('Contatti has no serious or critical accessibility violations', async ({ page }) => {
  await page.goto('/contatti.html');
  const results = await new AxeBuilder({ page }).analyze();
  const blocking = results.violations.filter(v => ['serious','critical'].includes(v.impact));
  expect(blocking, JSON.stringify(blocking,null,2)).toEqual([]);
});

test('Contatti contains no fake direct-contact protocols', async ({ page }) => {
  await page.goto('/contatti.html');
  await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0);
  await expect(page.locator('a[href^="tel:"]')).toHaveCount(0);
  await expect(page.locator('form')).toHaveCount(0);
});

test('Contatti mobile navigation opens with keyboard', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile-chromium');
  await page.goto('/contatti.html');
  const details = page.locator('.mobile-nav');
  const summary = details.locator('summary');
  await summary.focus();
  await page.keyboard.press('Enter');
  await expect(details).toHaveAttribute('open','');
});
