import report from 'multiple-cucumber-html-reporter';
import fs from 'node:fs';
import os from 'node:os';
import { config } from './features/support/config.js';

const jsonDir = './reports/';
const reportPath = './reports/html/';

const hasJsonResults =
  fs.existsSync(jsonDir) &&
  fs.readdirSync(jsonDir).some((file) => file.endsWith('.json'));

if (!hasJsonResults) {
  console.error(
    `No se encontraron resultados JSON en "${jsonDir}".\n` +
      'Ejecuta primero las pruebas con "npm run test" y vuelve a intentarlo.'
  );
  process.exit(1);
}

// El sistema operativo y la plataforma se detectan en tiempo de ejecución para
// que el reporte refleje la máquina real donde se ejecutaron las pruebas.
const PLATFORM_NAMES = {
  win32: 'windows',
  darwin: 'osx',
  linux: 'linux'
};

report.generate({
  jsonDir,
  reportPath,
  displayDuration: true,
  openReportInBrowser: false,
  metadata: {
    browser: {
      name: config.browserName,
      version: 'latest'
    },
    device: os.hostname(),
    platform: {
      name: PLATFORM_NAMES[process.platform] || process.platform,
      version: os.release()
    }
  },
  customData: {
    title: 'Información de Ejecución',
    data: [
      { label: 'Proyecto', value: 'Reto de Automatización - Frontend' },
      { label: 'Entorno', value: config.baseUrl },
      { label: 'Automatización', value: 'Playwright + Cucumber' },
      { label: 'Modo', value: config.headless ? 'Headless' : 'Headed' },
      { label: 'Node.js', value: process.version }
    ]
  }
});
