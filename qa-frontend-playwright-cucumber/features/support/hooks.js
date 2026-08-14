import { Before, After, BeforeAll, AfterAll, setDefaultTimeout, Status } from '@cucumber/cucumber';
import * as playwright from 'playwright';
import path from 'node:path';
import { config } from './config.js';

setDefaultTimeout(config.timeout);

let browser;

const slugify = (text) =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
    .slice(0, 80);

BeforeAll(async () => {
  const launcher = playwright[config.browserName];
  if (!launcher) {
    throw new Error(
      `Navegador no soportado: "${config.browserName}". Usa chromium, firefox o webkit.`
    );
  }

  browser = await launcher.launch({
    headless: config.headless,
    slowMo: config.slowMo,
    ...(config.executablePath ? { executablePath: config.executablePath } : {}),
    // Los flags de sandbox solo aplican a navegadores basados en Chromium
    // (necesarios al ejecutar dentro de contenedores como los runners de CI).
    ...(config.browserName === 'chromium'
      ? { args: ['--no-sandbox', '--disable-setuid-sandbox'] }
      : {})
  });
});

AfterAll(async () => {
  if (browser) {
    await browser.close();
  }
});

Before(async function () {
  // Un contexto nuevo por escenario garantiza aislamiento total:
  // cookies, sesión y almacenamiento local no se comparten entre pruebas.
  this.context = await browser.newContext();

  if (config.trace !== 'off') {
    await this.context.tracing.start({ screenshots: true, snapshots: true, sources: true });
  }

  this.page = await this.context.newPage();
});

After(async function (scenario) {
  const failed = scenario.result?.status === Status.FAILED;

  if (this.page && failed) {
    const screenshot = await this.page.screenshot({ fullPage: true });
    this.attach(screenshot, 'image/png');
    this.attach(`URL al momento del fallo: ${this.page.url()}`, 'text/plain');
  }

  if (this.context && config.trace !== 'off') {
    const keepTrace = config.trace === 'on' || failed;
    await this.context.tracing.stop(
      keepTrace
        ? {
            path: path.join(
              config.reportsDir,
              'traces',
              `${slugify(scenario.pickle.name)}.zip`
            )
          }
        : {}
    );
  }

  if (this.page) {
    await this.page.close();
  }
  if (this.context) {
    await this.context.close();
  }
});
