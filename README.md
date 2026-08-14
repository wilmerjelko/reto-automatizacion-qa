# Reto de Automatización QA (Frontend & Backend)

Este repositorio contiene la solución completa a los retos técnicos de automatización de pruebas para la postulación al puesto de **QA Automation Engineer**.

La solución está dividida de forma modular en dos carpetas dentro del repositorio:
1. **Frontend**: Automatización de interfaz de usuario utilizando **Playwright + Cucumber (Gherkin)**.
2. **Backend**: Automatización de pruebas API utilizando **Karate DSL + JUnit 5**.

Ambas suites se ejecutan automáticamente en cada `push` mediante GitHub Actions (`.github/workflows/ci.yml`), publicando los reportes como artefactos descargables.

---

## Requisitos Previos

Antes de ejecutar los proyectos, asegúrate de tener instalados los siguientes componentes en tu máquina local:

* [Node.js](https://nodejs.org/) (Versión 18 o superior)
* [Java JDK](https://www.oracle.com/java/technologies/downloads/) (Versión 11 o superior)
* [Apache Maven](https://maven.apache.org/) (Versión 3 o superior, configurado en las variables de entorno `PATH`)

---

## 1. Reto Frontend: Playwright + Cucumber JS

El proyecto frontend automatiza el flujo de compras de la web de pruebas [Sauce Demo](https://www.saucedemo.com/) utilizando el patrón de diseño **Page Object Model (POM)**.

### Estructura de Archivos
* **`features/`**: Definición de los escenarios de negocio escritos en lenguaje Gherkin (Español).
* **`pages/`**: Clases del Page Object Model (POM) con localizadores e interacciones encapsuladas por pantalla.
* **`features/step-definitions/`**: Conectores (Glue code) que enlazan los pasos Gherkin con los métodos de los Page Objects.
* **`features/support/hooks.js`**: Ciclo de vida del navegador con Playwright (inicialización, aislamiento de contextos, trazas y captura automática de capturas de pantalla en caso de fallos).
* **`features/support/config.js`**: Configuración parametrizable por variables de entorno (URL, navegador, credenciales, timeouts).
* **`cucumber.mjs`**: Configuración de Cucumber (rutas, formatos de reporte, reintentos y paralelismo).

### Instrucciones de Configuración y Ejecución

1. Abre tu terminal y navega al directorio del proyecto frontend:
   ```bash
   cd qa-frontend-playwright-cucumber
   ```

2. Instala las dependencias necesarias:
   ```bash
   npm install
   ```

3. Instala los navegadores necesarios de Playwright:
   ```bash
   npx playwright install
   ```

4. Ejecuta las pruebas automatizadas:
   ```bash
   npm run test
   ```

5. Genera y visualiza el reporte HTML avanzado:
   ```bash
   npm run report
   ```
   *El reporte interactivo se generará en la carpeta `reports/html/index.html`.*

### Scripts Disponibles

| Comando                  | Descripción                                                       |
|--------------------------|-------------------------------------------------------------------|
| `npm run test`           | Ejecuta la suite completa en modo headless.                       |
| `npm run test:smoke`     | Ejecuta únicamente los escenarios etiquetados con `@smoke`.       |
| `npm run test:login`     | Ejecuta solo los escenarios de inicio de sesión (`@login`).       |
| `npm run test:checkout`  | Ejecuta solo los escenarios de compra (`@checkout`).              |
| `npm run test:headed`    | Ejecuta con el navegador visible y ralentizado (útil para depurar).|
| `npm run test:firefox`   | Ejecuta la suite sobre Firefox.                                   |
| `npm run report`         | Construye el reporte HTML a partir del JSON generado.             |

### Variables de Entorno

Todas son opcionales; los valores por defecto permiten ejecutar la suite sin configuración adicional.

| Variable           | Por defecto                  | Descripción                                          |
|--------------------|------------------------------|------------------------------------------------------|
| `BASE_URL`         | `https://www.saucedemo.com/` | URL del sitio bajo prueba.                           |
| `BROWSER`          | `chromium`                   | Navegador: `chromium`, `firefox` o `webkit`.         |
| `BROWSER_PATH`     | *(vacío)*                    | Ruta a un binario de navegador ya instalado.         |
| `HEADLESS`         | `true`                       | `false` para ver el navegador durante la ejecución.  |
| `SLOW_MO`          | `0`                          | Milisegundos de retardo entre acciones (depuración). |
| `TIMEOUT`          | `30000`                      | Timeout por paso, en milisegundos.                   |
| `TRACE`            | `on-failure`                 | Trazas de Playwright: `off`, `on-failure` u `on`.    |
| `RETRY`            | `0`                          | Reintentos por escenario fallido.                    |
| `PARALLEL`         | `0`                          | Número de workers en paralelo.                       |
| `STANDARD_USER`    | `standard_user`              | Usuario válido utilizado en el flujo de compra.      |
| `STANDARD_PASSWORD`| `secret_sauce`               | Contraseña del usuario válido.                       |

### Evidencia de Fallos

Cuando un escenario falla se adjunta automáticamente al reporte una captura de pantalla completa y la URL en la que ocurrió el error. Además, se guarda una traza de Playwright en `reports/traces/`, que puede inspeccionarse paso a paso con:

```bash
npx playwright show-trace reports/traces/<nombre-del-escenario>.zip
```

---

## 2. Reto Backend: Karate DSL + JUnit 5

El proyecto backend automatiza las pruebas de integración de los recursos `/usuarios` y `/login` en la API pública de pruebas [ServeRest](https://serverest.dev/).

### Estructura de Archivos
* **`users/users-crud.feature`**: Pruebas en formato Gherkin (Karate DSL) que ejecutan el flujo CRUD completo (`POST`, `GET`, `PUT`, `DELETE`), escenarios de correo duplicado, campos obligatorios y validaciones de esquemas de respuesta.
* **`auth/auth-login.feature`**: Pruebas de autenticación (obtención de token, credenciales inválidas y usuario no registrado).
* **`users/schemas/`**: Archivos `.json` que definen la estructura esperada de las respuestas de la API para las validaciones estrictas de tipo de dato.
* **`UsersRunner.java` / `AuthRunner.java`**: Runners de JUnit 5 que se encargan de ejecutar y compilar las pruebas.
* **`karate-config.js`**: Configuración global de Karate (Base URL, timeouts) y funciones reutilizables compartidas por todos los features (generación de datos dinámicos y traducción de mensajes).

### Instrucciones de Configuración y Ejecución

1. Abre tu terminal y navega al directorio del proyecto backend:
   ```bash
   cd qa-backend-karate
   ```

2. Ejecuta las pruebas de la API utilizando Maven:
   ```bash
   mvn clean test
   ```

3. Visualiza los resultados de las pruebas:
   Al finalizar, Karate genera un reporte detallado en formato HTML. Puedes abrirlo directamente en tu navegador desde la siguiente ruta relativa:
   `target/karate-reports/karate-summary.html`

### Ejecución Parametrizada

La URL base puede sobrescribirse sin modificar el código, por ejemplo para apuntar a una instancia local de ServeRest:

```bash
mvn clean test -DbaseUrl=http://localhost:3000
mvn clean test -Dkarate.env=local
```

---

## Buenas Prácticas Aplicadas

* **Page Object Model (POM)**: Separación estricta de selectores y lógica de negocio en el frontend para evitar duplicidad y facilitar el mantenimiento.
* **Configuración externalizada**: URL, navegador, credenciales y timeouts se resuelven desde variables de entorno, sin datos quemados en los Page Objects ni en los steps.
* **Etiquetas (Tags)**: Los escenarios están etiquetados (`@smoke`, `@login`, `@checkout`) para permitir ejecuciones selectivas según la necesidad (regresión completa vs. verificación rápida).
* **Fuzzy Matching en Karate**: Validación precisa de contratos de la API mediante tipos de datos dinámicos (`#string`, `#number`) en lugar de datos quemados en código.
* **Generación Dinámica de Datos**: Los correos electrónicos de los usuarios se generan dinámicamente en cada ejecución para asegurar que los casos de prueba de inserción (`POST`) sean idempotentes y no colisionen.
* **Limpieza de datos**: Cada escenario del backend elimina los usuarios que crea, dejando el entorno de pruebas en su estado original.
* **Captura de Evidencia**: Captura automática de pantalla, URL y traza de Playwright adjuntadas al reporte cuando un paso del frontend falla.
* **Integración Continua**: Ambas suites se ejecutan en GitHub Actions en cada `push`, con los reportes disponibles como artefactos.
