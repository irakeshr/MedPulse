import { test, expect } from '@playwright/test';

const PATIENT_EMAIL = 'patient@test.com';
const PATIENT_PASSWORD = 'password123';
const API_BASE = 'http://localhost:5000/api';

async function loginAndSetToken(page) {
  const loginRes = await page.request.post(`${API_BASE}/auth/login`, {
    data: { email: PATIENT_EMAIL, password: PATIENT_PASSWORD },
  });
  expect(loginRes.status()).toBe(200);
  const loginData = await loginRes.json();
  expect(loginData.token).toBeTruthy();
  await page.goto('/');
  await page.evaluate((token) => localStorage.setItem('token', token), loginData.token);
  return loginData;
}

test.describe('Patient E2E Flow', () => {
  test('login API returns token with valid credentials', async ({ page }) => {
    const data = await loginAndSetToken(page);
    expect(data.role).toBe('patient');
    expect(data.success).toBe(true);
  });

  test('should access feed page when authenticated', async ({ page }) => {
    await loginAndSetToken(page);
    await page.goto('/me');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    expect(page.url()).toContain('/me');
  });

  test('should display patient profile page content', async ({ page }) => {
    await loginAndSetToken(page);
    await page.goto('/profile');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    await expect(page.locator('body')).toContainText(/Test Patient|Health enthusiast|Kerala/i);
  });

  test('should display doctors list on find doctors page', async ({ page }) => {
    await loginAndSetToken(page);
    await page.goto('/doctors');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    await expect(page.locator('body')).toContainText(/Dr\. Sarah Smith|Cardiology/i);
  });

  test('should show 401 on API without token', async ({ page }) => {
    const response = await page.request.get(`${API_BASE}/user/get-profile`);
    expect(response.status()).toBe(401);
  });

  test('should reject invalid login credentials', async ({ page }) => {
    const response = await page.request.post(`${API_BASE}/auth/login`, {
      data: { email: 'wrong@test.com', password: 'wrongpassword' },
    });
    expect(response.status()).toBe(404);
    const data = await response.json();
    expect(data.success).toBe(false);
    expect(data.message).toBe('User not found');
  });
});
