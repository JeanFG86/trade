import { test, expect } from '@playwright/test';

test('Deve criar uma conta', async ({ page }) => {
  await page.goto("http://localhost:5174");
  await page.locator(".input-name").fill("John Doe");
  await page.locator(".input-email").fill("johndoe@gmail.com");
  await page.locator(".input-document").fill("02131041055");
  await page.locator(".input-password").fill("passworD123");
  await page.locator(".button-signup").click();
  await expect(page.locator(".span-message")).toContainText("success");
});

test('Não deve criar uma conta com um nome inválido', async ({ page }) => {
  await page.goto("http://localhost:5174");
  await page.locator(".input-name").fill("invalid-name");
  await page.locator(".button-signup").click();
  await expect(page.locator(".span-message")).toContainText("Invalid name");
})
