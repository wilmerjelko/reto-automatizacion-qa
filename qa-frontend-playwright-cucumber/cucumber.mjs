/**
 * Configuración central de Cucumber JS.
 *
 * Genera siempre el reporte JSON en `reports/`, que es el insumo que consume
 * `generate-report.js` (multiple-cucumber-html-reporter) para construir el
 * reporte HTML enriquecido.
 */
const number = (value, fallback) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export default {
  paths: ['features/**/*.feature'],
  import: ['features/support/**/*.js', 'features/step-definitions/**/*.js'],
  format: [
    'summary',
    'progress-bar',
    'json:reports/cucumber-report.json',
    'html:reports/cucumber-report.html'
  ],
  formatOptions: {
    snippetInterface: 'async-await'
  },
  // Reintentos y paralelismo configurables por entorno (útiles en CI, donde la
  // red hacia el sitio bajo prueba puede ser intermitente).
  retry: number(process.env.RETRY, 0),
  parallel: number(process.env.PARALLEL, 0),
  strict: true
};
