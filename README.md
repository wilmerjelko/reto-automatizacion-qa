# Reto de Automatización QA (Frontend & Backend)

Este repositorio contiene la solución completa a los retos técnicos de automatización de pruebas para la postulación al puesto de **QA Automation Engineer**.

La solución está dividida de forma modular en dos carpetas dentro del repositorio:
1. **Frontend**: Automatización de interfaz de usuario utilizando **Playwright + Cucumber (Gherkin)**.
2. **Backend**: Automatización de pruebas API utilizando **Karate DSL + JUnit 5**.

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
* **`step-definitions/`**: Conectores (Glue code) que enlazan los pasos Gherkin con los métodos de los Page Objects.
* **`support/hooks.js`**: Configuración del ciclo de vida del navegador con Playwright (inicialización, aislamiento de contextos y captura automática de capturas de pantalla en caso de fallos).

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

---

## 2. Reto Backend: Karate DSL + JUnit 5

El proyecto backend automatiza las pruebas de integración del recurso `/usuarios` en la API pública de pruebas [ServeRest](https://serverest.dev/).

### Estructura de Archivos
* **`users-crud.feature`**: Pruebas en formato Gherkin (Karate DSL) que ejecutan el flujo CRUD completo (`POST`, `GET`, `PUT`, `DELETE`), escenarios de correo duplicado y validaciones de esquemas de respuesta.
* **`schemas/`**: Archivos `.json` que definen la estructura esperada de las respuestas de la API para las validaciones estrictas de tipo de dato.
* **`UsersRunner.java`**: Runner de JUnit 5 que se encarga de ejecutar y compilar las pruebas.
* **`karate-config.js`**: Archivo de configuración global de Karate (Base URL, Timeouts, etc.).

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

---

## Buenas Prácticas Aplicadas

* **Page Object Model (POM)**: Separación estricta de selectores y lógica de negocio en el frontend para evitar duplicidad y facilitar el mantenimiento.
* **Fuzzy Matching en Karate**: Validación precisa de contratos de la API mediante tipos de datos dinámicos (`#string`, `#number`) en lugar de datos quemados en código.
* **Generación Dinámica de Datos**: Los correos electrónicos de los usuarios se generan dinámicamente en cada ejecución mediante JavaScript para asegurar que los casos de prueba de inserción (`POST`) sean idempotentes y no colisionen.
* **Captura de Evidencia (Screenshots)**: Captura automática y adjuntado de capturas de pantalla a los reportes de Cucumber cuando un paso del frontend falla.
