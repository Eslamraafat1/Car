// Regenerates public/evay-company-profile-{ar,en}.pdf from the /profile page.
// Usage: start the site (npm run build && npm start), then: node scripts/generate-profile-pdf.mjs
// Needs Playwright:  npm i -D playwright  (and `npx playwright install chromium` once).
import { chromium } from "playwright";

const base = process.env.SITE_URL ?? "http://localhost:3000";
const browser = await chromium.launch();
for (const lang of ["ar", "en"]) {
  const ctx = await browser.newContext({ viewport: { width: 900, height: 1200 } });
  await ctx.addInitScript((l) => {
    localStorage.setItem("evay-lang", l);
    localStorage.setItem("evay-theme", "light");
    sessionStorage.setItem("evay-loaded", "1");
  }, lang);
  const page = await ctx.newPage();
  await page.goto(`${base}/profile`, { waitUntil: "networkidle" });
  await page.waitForTimeout(2500);
  await page.emulateMedia({ media: "print" });
  await page.pdf({ path: `public/evay-company-profile-${lang}.pdf`, format: "A4", printBackground: true, preferCSSPageSize: true });
  await ctx.close();
}
await browser.close();
