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

test('shared focus treatment is visible', async ({ page }, testInfo) => {
  await page.goto('/contatti.html');

  let target;
  if (testInfo.project.name === 'mobile-chromium') {
    const mobileNav = page.locator('.mobile-nav');
    await mobileNav.locator('summary').click();
    target = mobileNav.locator('a[href="servizi.html"]');
  } else {
    target = page.locator('.desktop-nav a[href="servizi.html"]');
  }

  await expect(target).toBeVisible();
  await target.focus();
  const outline = await target.evaluate(el => getComputedStyle(el).outlineStyle);
  expect(outline).not.toBe('none');
});
