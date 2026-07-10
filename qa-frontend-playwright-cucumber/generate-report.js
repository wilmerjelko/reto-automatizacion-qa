import report from 'multiple-cucumber-html-reporter';

report.generate({
  jsonDir: './reports/',
  reportPath: './reports/html/',
  metadata: {
    browser: {
      name: 'chromium',
      version: 'latest'
    },
    device: 'Local Test Machine',
    platform: {
      name: 'windows',
      version: '10'
    }
  },
  customData: {
    title: 'Información de Ejecución',
    data: [
      { label: 'Proyecto', value: 'Reto de Automatización - Frontend' },
      { label: 'Entorno', value: 'Sauce Demo - Producción' },
      { label: 'Automatización', value: 'Playwright + Cucumber' }
    ]
  }
});
