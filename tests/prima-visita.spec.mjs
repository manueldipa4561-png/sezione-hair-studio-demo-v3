import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('Prima Visita renders complete Page 05 structure', async ({ page }) => {
  const response = await page.goto('/prima-visita.html', { waitUntil:'networkidle' });
  expect(response?.ok()).toBeTruthy();

  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('main > section')).toHaveCount(6);
  await expect(page.locator('.visit-path')).toHaveCount(2);
  await expect(page.locator('.visit-factor')).toHaveCount(4);
  await expect(page.locator('.visit-step')).toHaveCount(3);
  await expect(page.locator('a[aria-current="page"]')).toHaveCount(0);
  await expect(page.locator('form')).toHaveCount(0);
  await expect(page.locator('main img')).toHaveCount(0);

  const overflow = await page.evaluate(() =>
    document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
  expect(overflow).toBeLessThanOrEqual(1);
});

test('Prima Visita has no serious or critical accessibility violations', async ({ page }) => {
  await page.goto('/prima-visita.html');
  const results = await new AxeBuilder({ page }).analyze();
  const blocking = results.violations.filter(v => ['serious','critical'].includes(v.impact));
  expect(blocking, JSON.stringify(blocking,null,2)).toEqual([]);
});

test('Prima Visita routes to Services and Lavori', async ({ page }) => {
  await page.goto('/prima-visita.html');
  await expect(page.locator('a[href="servizi.html"]')).toHaveCount(3);
  await expect(page.locator('a[href="lavori.html"]')).toHaveCount(3);
});

test('Prima Visita mobile navigation opens with keyboard', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile-chromium');
  await page.goto('/prima-visita.html');
  const details = page.locator('.mobile-nav');
  const summary = details.locator('summary');
  await summary.focus();
  await page.keyboard.press('Enter');
  await expect(details).toHaveAttribute('open','');
});
