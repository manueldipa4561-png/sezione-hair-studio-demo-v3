import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('Home renders the complete Page 01 structure', async ({ page }) => {
  const response = await page.goto('/', { waitUntil:'networkidle' });
  expect(response?.ok()).toBeTruthy();

  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('main > section')).toHaveCount(7);
  await expect(page.locator('.hero')).toBeVisible();
  await expect(page.locator('#servizi')).toBeVisible();
  await expect(page.locator('#studio')).toBeVisible();
  await expect(page.locator('#contatto')).toBeVisible();

  const overflow = await page.evaluate(() =>
    document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
  expect(overflow).toBeLessThanOrEqual(1);
});

test('Home has no serious or critical accessibility violations', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page }).analyze();
  const blocking = results.violations.filter(v => ['serious','critical'].includes(v.impact));
  expect(blocking, JSON.stringify(blocking,null,2)).toEqual([]);
});

test('approved real images load', async ({ page }) => {
  await page.goto('/');
  const images = page.locator('img');
  await expect(images).toHaveCount(2);

  for (let i=0;i<2;i++) {
    const image = images.nth(i);
    await image.scrollIntoViewIfNeeded();
    await expect.poll(
      () => image.evaluate(img => img.complete && img.naturalWidth > 500),
      { timeout:15000 }
    ).toBe(true);
  }
});

test('mobile navigation opens with keyboard', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile-chromium');
  await page.goto('/');
  const details = page.locator('.mobile-nav');
  const summary = details.locator('summary');
  await summary.focus();
  await page.keyboard.press('Enter');
  await expect(details).toHaveAttribute('open','');
});
