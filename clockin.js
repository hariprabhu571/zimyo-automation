
const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();

  await page.goto("https://app.zimyo.com", { waitUntil: "networkidle2" });

  await page.type("#email", process.env.ZIMYO_EMAIL);
  await page.type("#password", process.env.ZIMYO_PASSWORD);
  await page.click("#loginButton");

  await page.waitForNavigation({ waitUntil: "networkidle2" });

  await page.goto("https://app.zimyo.com/attendance", { waitUntil: "networkidle2" });

  await page.click("#clockInButton");

  await page.waitForTimeout(2000);
  await browser.close();
})();
