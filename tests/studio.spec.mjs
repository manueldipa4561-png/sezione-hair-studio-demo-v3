import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('Studio renders complete Page 04 structure', async ({ page }) => {
  const response = await page.goto('/studio.html', { waitUntil:'networkidle' });
  expect(response?.ok()).toBeTruthy();

  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('main > section')).toHaveCount(5);
  await expect(page.locator('.studio-principles-grid article')).toHaveCount(4);
  await expect(page.locator('a[aria-current="page"]')).toHaveCount(2);

  const overflow = await page.evaluate(() =>
    document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
  expect(overflow).toBeLessThanOrEqual(1);
});

test('Studio has no serious or critical accessibility violations', async ({ page }) => {
  await page.goto('/studio.html');
  const results = await new AxeBuilder({ page }).analyze();
  const blocking = results.violations.filter(v => ['serious','critical'].includes(v.impact));
  expect(blocking, JSON.stringify(blocking,null,2)).toEqual([]);
});

test('Studio licensed interior images load', async ({ page }) => {
  await page.goto('/studio.html');
  const images = page.locator('main img');
  await expect(images).toHaveCount(2);

  for (let i=0;i<2;i++) {
    const image = images.nth(i);
    await image.scrollIntoViewIfNeeded();
    await expect.poll(
      () => image.evaluate(img => img.complete && img.naturalWidth > 0),
      { timeout:30000 }
    ).toBe(true);
  }
});

test('Studio mobile navigation opens with keyboard', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile-chromium');
  await page.goto('/studio.html');
  const details = page.locator('.mobile-nav');
  const summary = details.locator('summary');
  await summary.focus();
  await page.keyboard.press('Enter');
  await expect(details).toHaveAttribute('open','');
});
