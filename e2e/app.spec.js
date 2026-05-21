import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('core portal flows', () => {
  test('app opens correctly on the home page', async ({ page }) => {
    await page.goto('/');

    await expect(
      page.getByRole('heading', {
        name: /premium mern learning console/i,
      }),
    ).toBeVisible();
    await expect(page.getByRole('link', { name: /start the roadmap/i })).toBeVisible();
  });

  test('search flow opens relevant results', async ({ page }) => {
    await page.goto('/');
    await page.getByLabel(/search courses and topics/i).fill('jsonwebtoken');
    await page.keyboard.press('Enter');

    await expect(page).toHaveURL(/\/search\?q=jsonwebtoken/);
    await expect(page.getByRole('heading', { name: /matches for/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'jsonwebtoken', exact: true })).toBeVisible();
  });

  test('assistant flow returns a retrieved answer and lesson links', async ({ page }) => {
    await page.goto('/assistant');
    await page.getByLabel(/ask the mern ai guide a question/i).fill('Redux Toolkit vs Zustand');
    await page.getByRole('button', { name: /ask assistant/i }).click();

    await expect(page.getByText(/you asked/i)).toBeVisible();
    await expect(page.getByRole('heading', { name: /redux toolkit vs zustand/i })).toBeVisible();
    await expect(page.getByText(/best lesson links/i)).toBeVisible();
  });

  test('404 page works', async ({ page }) => {
    await page.goto('/does-not-exist');

    await expect(
      page.getByRole('heading', { name: /this lesson path does not exist/i }),
    ).toBeVisible();
    await expect(page.getByRole('link', { name: /back to tutorials/i })).toBeVisible();
  });
});

test.describe('responsive layouts', () => {
  const viewports = [
    { name: 'mobile', size: { width: 390, height: 844 } },
    { name: 'tablet', size: { width: 768, height: 1024 } },
    { name: 'laptop', size: { width: 1280, height: 800 } },
    { name: 'desktop', size: { width: 1536, height: 960 } },
  ];

  for (const viewport of viewports) {
    test(`home layout remains usable on ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize(viewport.size);
      await page.goto('/');

      await expect(
        page.getByRole('heading', {
          name: /premium mern learning console/i,
        }),
      ).toBeVisible();
      await expect(page.getByRole('link', { name: /start the roadmap/i })).toBeVisible();
    });
  }
});

test.describe('accessibility', () => {
  test('home page has no serious or critical axe violations', async ({ page, browserName }) => {
    test.skip(browserName !== 'chromium', 'Axe smoke run is limited to Chromium for audit speed.');

    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    const highImpactViolations = accessibilityScanResults.violations.filter((violation) =>
      ['serious', 'critical'].includes(violation.impact ?? ''),
    );

    expect(highImpactViolations).toEqual([]);
  });
});

test.describe('requested product flows not implemented in current app', () => {
  test.skip('login, dashboard, and logout flows', async () => {
    // This project is a static learning portal and does not implement authentication or dashboards.
  });

  test.skip('protected routes and role-based access', async () => {
    // No protected route or RBAC layer exists in the current frontend codebase.
  });

  test.skip('CRUD integration flow', async () => {
    // The app does not contain live API-backed CRUD pages in its current scope.
  });
});
