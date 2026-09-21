import { test, expect } from '@playwright/test';

const pages = [
  ['/', 'HOME / 01'],
  ['/servizi.html', 'SERVIZI / 02'],
  ['/lavori.html', 'LAVORI / 03'],
  ['/studio.html', 'STUDIO / 04'],
  ['/prima-visita.html', 'PRIMA VISITA / 05'],
  ['/contatti.html', 'CONTATTI / 06']
];

for (const [path, footerLabel] of pages) {
  test(`final consistency: ${path}`, async ({ page }) => {
    const response = await page.goto(path, { waitUntil:'networkidle' });
    expect(response?.ok()).toBeTruthy();

    await expect(page.locator('.site-header .brand')).toHaveAttribute('href','index.html');
    await expect(page.locator('.desktop-nav a[href="contatti.html"]')).toContainText('PRENOTA');
    await expect(page.locator('.mobile-nav a[href="contatti.html"]')).toContainText('PRENOTA');
    await expect(page.locator('footer')).toContainText(footerLabel);
    await expect(page.locator('footer')).toContainText('DEMO / PUNTO DUE STUDIO');

    const overflow = await page.evaluate(() =>
      document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    expect(overflow).toBeLessThanOrEqual(1);
  });
}

test('shared focus treatment is visible', async ({ page }) => {
  await page.goto('/contatti.html');
  const target=page.locator('.desktop-nav a[href="servizi.html"]');
  await target.focus();
  const outline=await target.evaluate(el => getComputedStyle(el).outlineStyle);
  expect(outline).not.toBe('none');
});
