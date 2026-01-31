import { expect } from '@playwright/test';
import { Given, When, Then } from './fixtures.js';

Given('I visit the home page', async function ({ page }) {
  await page.goto('/');
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
