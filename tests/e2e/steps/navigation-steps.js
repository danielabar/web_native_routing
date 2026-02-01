import { expect } from '@playwright/test';
import { Given, When, Then } from './fixtures.js';

Given('I visit the home page', async function ({ page }) {
  await page.goto('/');
});

When('I visit the {string} page directly', async function ({ page }, pageName) {
  // Map page names to URLs
  const pageUrls = {
    'home': '/',
    'about': '/about',
    'contact': '/contact'
  };

  const url = pageUrls[pageName];
  if (!url) {
    throw new Error(`Unknown page: ${pageName}`);
  }

  // Direct URL access might trigger 404.html -> index.html redirect, so wait for network to settle
  await page.goto(url);
  await page.waitForLoadState('networkidle');
});

When('I click the {string} navigation link', async function ({ page }, linkText) {
  await page.click(`nav .nav-links a:has-text("${linkText}")`);
});

Then('I should see {string}', async function ({ page }, text) {
  await expect(page.getByText(text)).toBeVisible();
});

Then('the URL should be {string}', async function ({ page }, expectedUrl) {
  await expect(page).toHaveURL(expectedUrl);
});

When('I interact with the contact form', async function ({ page }) {
  // Fill out the contact form
  await page.fill('#name', 'Test User');
  await page.fill('#email', 'test@example.com');
  await page.fill('#subject', 'Test Subject');
  await page.fill('#message', 'This is a test message to verify the form works.');

  // Submit the form
  await page.click('button[type="submit"]');
});

Then('the contact form should be functional', async function ({ page }) {
  // Wait for the form submission to process (simulated delay)
  // Check that the submit button shows loading state
  await expect(page.locator('button[type="submit"]')).toHaveText('Sending...', { timeout: 1000 });

  // Wait for success message to appear
  await expect(page.locator('.success')).toBeVisible({ timeout: 3000 });
});

When('I use browser back', async function ({ page }) {
  await page.goBack();
  // Wait for the router to process the popstate event and load content
  await page.waitForLoadState('networkidle');
  // Small buffer for router processing
  await page.waitForTimeout(100);
});

When('I use browser forward', async function ({ page }) {
  await page.goForward();
  // Wait for the router to process the popstate event and load content
  await page.waitForLoadState('networkidle');
  // Small buffer for router processing
  await page.waitForTimeout(100);
});

When("I check the router debug information", async function ({ page }) {
  const debugInfo = await page.evaluate(() => {
    return window.app.router.debug();
  });

  console.log("Router debug info:", debugInfo);
  // You could also store this in test context for assertions
  this.debugInfo = debugInfo;
});

When('I visit an invalid path {string}', async function ({ page }, invalidPath) {
  await page.goto(invalidPath);
  await page.waitForLoadState('networkidle');
});

Then('I should see a 404 error page', async function ({ page }) {
  await expect(page.getByText('404 - Page Not Found')).toBeVisible();
  await expect(page.getByText("The page you're looking for doesn't exist.")).toBeVisible();
});

Then('I should see a {string} button', async function ({ page }, buttonText) {
  await expect(page.getByText(buttonText)).toBeVisible();
});
