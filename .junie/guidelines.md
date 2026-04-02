# Project Guidelines: Angular Example App

Este documento detalla la arquitectura, el stack tecnológico y los estándares de codificación para la **Angular Example App**, una aplicación moderna construida con Angular 21 que implementa las mejores prácticas de desarrollo web.

## 1. Project Overview

**Project Name:** Angular Example App
**Type:** Angular Web Application (Educational/Reference Implementation)
**Core Goal:** Una aplicación robusta que demuestra patrones avanzados en Angular, incluyendo gestión de estado con Signals, arquitectura de componentes standalone, renderizado optimizado (SSG) y pruebas automatizadas integrales.

## 2. Technology Stack

### Core Technologies

- **Angular:** 21.1.5 (Zoneless change detection, OnPush strategy, Standalone components)
- **TypeScript:** 5.9.3 (Strict mode, ES2023 target)
- **RxJS:** 7.8.2
- **Node.js/npm:** >=22.19 (Engine requirement)

### SSG & Hydration

- **@angular/ssr:** 21.1.4
- **Hydration:** Configurada con `provideClientHydration(withEventReplay(), withI18nSupport(), withIncrementalHydration())`
- **Output:** Modo estático (`static` en `angular.json`)
- **Safety:** Uso obligatorio de `isPlatformBrowser(PLATFORM_ID)` para acceder a APIs del navegador (window, localStorage, etc.).

### Styling & UI

- **SCSS/Sass:** Lenguaje principal de estilos. Directorio `src/styles` incluido en `includePaths`.
- **Shoelace:** 2.20.1 (Sistema de diseño basado en Web Components).
- **Stylelint:** 17.3.0 (Linting estricto de SCSS con ordenación `recess-order`).

### Testing & Quality

- **Vitest:** 4.0.18 (Pruebas unitarias con entorno jsdom).
- **Playwright:** 1.58.2 (Pruebas E2E, enfocado en Chromium).
- **ESLint:** 9.39.2 (Configuración Flat, reglas estrictas para Angular y TypeScript).
- **Prettier:** 3.8.1 (Formateo de código obligatorio).
- **Lighthouse:** 13.0.3 (Métricas de rendimiento y accesibilidad).

## 3. Architecture & Patterns

### Directory Structure

- `src/app/core/`: Servicios singleton, interceptores HTTP, tokens globales y configuraciones transversales.
- `src/app/features/`: Módulos de dominio (p. ej., `authentication`, `pokemon`, `user`). Carga perezosa (lazy-loading) mediante `loadChildren`.
- `src/app/shared/`: Componentes, pipes y directivas reutilizables en toda la aplicación.
- `src/environments/`: Configuraciones específicas por entorno.
- `src/locale/`: Archivos de internacionalización (XLF).
- `scripts/`: Scripts de automatización para build, E2E y Lighthouse.

### Critical Patterns

- **Standalone Components:** Uso exclusivo de componentes, directivas y pipes standalone (sin `NgModules`).
- **OnPush Strategy:** Obligatorio en todos los componentes para mejorar el rendimiento.
- **Signals:** Uso preferente de Angular Signals para la gestión de estado local y compartido. Uso de `linkedSignal` para estados derivados.
- **Path Aliases:** Uso de prefijos `~core/*`, `~shared/*`, `~features/*`, etc., para importaciones absolutas.
- **Dependency Injection:** Preferencia por la función `inject()` sobre la inyección vía constructor.
- **Platform Awareness:** Siempre verificar la plataforma antes de usar objetos globales del navegador.

### State Management

- **Local State:** Signals dentro del componente.
- **Shared State:** Servicios con Signals o `BehaviorSubject` de RxJS para reactividad avanzada.
- **Persistence:** Uso del provider `LOCAL_STORAGE` (wrapper seguro de `localStorage`).

## 4. Coding Standards

### Linting & Formatting

- **ESLint:** Ejecución vía `npm run lint`. Reglas estrictas de complejidad (máx. 8), longitud de línea y patrones de Angular.
- **Prettier:** Formateo automático obligatorio. Ejecución vía `npm run prettier:write`.
- **Stylelint:** Verificación de estilos SCSS. Ejecución vía `npm run stylelint:check` o `npm run stylelint:fix`.

### Commit Workflow (Husky)

- **commit-msg:** Validación de mensajes de commit convencionales.
- **pre-commit:** Ejecución de `lint-staged` (ESLint, Prettier, Stylelint) sobre archivos modificados.
- **pre-push:** Ejecución de `npm run lint` y `npm run test:coverage`.

## 5. Testing Strategy

### Unit Testing (Vitest)

- Convención de nombres: `*.spec.ts`.
- Enfoque en lógica de negocio, servicios e interacción de componentes.
- Umbrales de cobertura obligatorios:
  - Statements: 97%
  - Branches: 93%
  - Functions: 96%
  - Lines: 97%

### E2E Testing (Playwright)

- Ubicación: `e2e/*.spec.ts`.
- Cobertura de flujos críticos: Login, registro, búsqueda de Pokémon.
- Ejecución local con `npm run test:e2e:local:serve`.

## 6. Internationalization (i18n)

- **Extraction:** `npm run extract` para generar/actualizar archivos XLF.
- **Locales:** Inglés (`en`) como base, Español (`es`) como traducción principal.
- **Build:** Los errores de traducción faltante fallan la compilación de producción (`i18nMissingTranslation: error`).

## 7. Build & Deployment

- **Production Build:** `npm run build` (genera versiones localizadas en `dist/pro`).
- **Configurations:** `development`, `preproduction`, `production`, `lighthouse`, `localhost-en`, `localhost-es`.
- **Verification:** Ejecución obligatoria de `npm run verify:all` para validar calidad total antes de liberar.
