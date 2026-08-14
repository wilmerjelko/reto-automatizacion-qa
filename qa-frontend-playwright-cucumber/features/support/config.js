/**
 * Configuración de la ejecución basada en variables de entorno.
 *
 * Evita datos quemados en el código: la URL, el navegador, el modo headless y
 * las credenciales pueden cambiarse sin tocar los Page Objects ni los steps.
 */
const TRUTHY = ['1', 'true', 'yes', 'si', 'sí'];

const boolean = (value, fallback) =>
  value === undefined ? fallback : TRUTHY.includes(String(value).toLowerCase());

const number = (value, fallback) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const config = {
  baseUrl: process.env.BASE_URL || 'https://www.saucedemo.com/',
  browserName: (process.env.BROWSER || 'chromium').toLowerCase(),
  // Permite usar un binario ya instalado en la máquina (por ejemplo, el Chrome
  // del sistema o un navegador provisto por la imagen de CI).
  executablePath: process.env.BROWSER_PATH || undefined,
  headless: boolean(process.env.HEADLESS, true),
  slowMo: number(process.env.SLOW_MO, 0),
  timeout: number(process.env.TIMEOUT, 30000),
  // Traza de Playwright para depurar fallos: 'off' | 'on-failure' | 'on'
  trace: (process.env.TRACE || 'on-failure').toLowerCase(),
  reportsDir: 'reports',
  users: {
    standard: {
      username: process.env.STANDARD_USER || 'standard_user',
      password: process.env.STANDARD_PASSWORD || 'secret_sauce'
    }
  }
};
