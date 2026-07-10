import { Before, After, BeforeAll, AfterAll, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium } from 'playwright';

setDefaultTimeout(30000);

let browser;

BeforeAll(async () => {
  browser = await chromium.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'] 
  });
});

AfterAll(async () => {
  if (browser) {
    await browser.close();
  }
});

Before(async function () {
  this.context = await browser.newContext();
  this.page = await this.context.newPage();
});

After(async function (scenario) {
  if (this.page) {
    if (scenario.result?.status === 'FAILED') {
      const screenshot = await this.page.screenshot();
      this.attach(screenshot, 'image/png');
    }
    await this.page.close();
  }
  if (this.context) {
    await this.context.close();
  }
});
