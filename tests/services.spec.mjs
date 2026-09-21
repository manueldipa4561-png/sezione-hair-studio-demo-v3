import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('Services renders complete Page 02 structure', async ({ page }) => {
  const response = await page.goto('/servizi.html', { waitUntil:'networkidle' });
  expect(response?.ok()).toBeTruthy();

  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('main > section')).toHaveCount(8);
  await expect(page.locator('.service-family')).toHaveCount(4);
  await expect(page.locator('#prima-visita')).toBeVisible();
  await expect(page.locator('.service-decision')).toBeVisible();

  const overflow = await page.evaluate(() =>
    document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
  expect(overflow).toBeLessThanOrEqual(1);
});

test('Services has no serious or critical accessibility violations', async ({ page }) => {
  await page.goto('/servizi.html');
  const results = await new AxeBuilder({ page }).analyze();
  const blocking = results.violations.filter(v => ['serious','critical'].includes(v.impact));
  expect(blocking, JSON.stringify(blocking,null,2)).toEqual([]);
});

test('Services approved real image loads', async ({ page }) => {
  await page.goto('/servizi.html');
  const image = page.locator('.first-service-media img');
  await expect(image).toHaveCount(1);
  await image.scrollIntoViewIfNeeded();
  await expect.poll(
    () => image.evaluate(img => img.complete && img.naturalWidth > 0),
    { timeout:30000 }
  ).toBe(true);
});

test('Services mobile navigation opens with keyboard', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile-chromium');
  await page.goto('/servizi.html');
  const details = page.locator('.mobile-nav');
  const summary = details.locator('summary');
  await summary.focus();
  await page.keyboard.press('Enter');
  await expect(details).toHaveAttribute('open','');
});
