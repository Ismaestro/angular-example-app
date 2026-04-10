# Project Guidelines: Angular Example App

This document outlines the architecture, technology stack, and coding standards for the **Angular Example App**, a modern application built with Angular 21 that implements web development best practices.

## 1. Project Overview

**Project Name:** Angular Example App
**Type:** Angular Web Application (Educational/Reference Implementation)
**Core Goal:** A robust application demonstrating advanced Angular patterns, including state management with Signals, standalone component architecture, optimized rendering (SSG), and comprehensive automated testing.

## 2. Technology Stack

### Core Technologies

- **Angular:** 21.1.5 (Zoneless change detection, OnPush strategy, Standalone components)
- **TypeScript:** 5.9.3 (Strict mode, ES2023 target)
- **RxJS:** 7.8.2
- **Node.js/npm:** >=22.19 (Engine requirement)

### SSG & Hydration

- **@angular/ssr:** 21.1.4
- **Hydration:** Configured with `provideClientHydration(withEventReplay(), withI18nSupport(), withIncrementalHydration())`
- **Output:** Static mode (`static` in `angular.json`)
- **Safety:** Mandatory use of `isPlatformBrowser(PLATFORM_ID)` to access browser APIs (window, localStorage, etc.).

### Styling & UI

- **SCSS/Sass:** Primary styling language. `src/styles` directory included in `includePaths`.
- **Shoelace:** 2.20.1 (Design system based on Web Components).
- **Stylelint:** 17.3.0 (Strict SCSS linting with `recess-order` sorting).

### Testing & Quality

- **Vitest:** 4.1.4 (Unit testing with jsdom environment).
- **Playwright:** 1.59.1 (E2E testing, Chromium-focused).
- **ESLint:** 9.39.2 (Flat configuration, strict Angular and TypeScript rules).
- **Prettier:** 3.8.1 (Mandatory code formatting).
- **Lighthouse:** 13.1.0 (Performance and accessibility metrics).
- **Knip:** 6.3.1 (Unused file and dependency analysis).

## 3. Architecture & Patterns

### Directory Structure

- `src/app/core/`: Singleton services, HTTP interceptors, global tokens, and cross-cutting configurations.
- `src/app/features/`: Domain modules (e.g., `authentication`, `pokemon`, `user`). Lazy-loaded via `loadChildren`.
- `src/app/shared/`: Reusable components, pipes, and directives across the application.
- `src/environments/`: Environment-specific configurations.
- `src/locale/`: Internationalization files (XLF).
- `scripts/`: Automation scripts for build, E2E, and Lighthouse.

### Critical Patterns

- **Standalone Components:** Exclusive use of standalone components, directives, and pipes (no `NgModules`).
- **OnPush Strategy:** Mandatory in all components for performance optimization.
- **Signals:** Preferred use of Angular Signals for local and shared state management. Use `linkedSignal` for derived states.
- **Path Aliases:** Use of prefixes `~core/*`, `~shared/*`, `~features/*`, etc., for absolute imports.
- **Dependency Injection:** Preference for the `inject()` function over constructor injection.
- **Platform Awareness:** Always verify the platform before using global browser objects.

### State Management

- **Local State:** Signals within the component.
- **Shared State:** Services with Signals or RxJS `BehaviorSubject` for advanced reactivity.
- **Persistence:** Use of the `LOCAL_STORAGE` provider (safe wrapper for `localStorage`).

## 4. Shared Components Reference

The application uses a variety of shared components located in `src/app/shared/components/`. Below are their detailed descriptions:

### 1. Card (`app-card`)

- **Purpose:** A versatile container for content.
- **Key Features:** Supports an optional `href` input to make the card clickable (navigation). Uses `NgTemplateOutlet` for flexible content injection.
- **Location:** `src/app/shared/components/card/`

### 2. Cookie Popup (`app-cookie-popup`)

- **Purpose:** Displays a consent banner for cookies.
- **Key Features:** Uses `CookieConsentService` to manage and persist the user's choice in local storage. Built with Shoelace buttons.
- **Location:** `src/app/shared/components/cookie-popup/`

### 3. Decorative Header (`app-decorative-header`)

- **Purpose:** A header component that dynamically loads and renders SVG files.
- **Key Features:** Uses `rxResource` to fetch SVG files as text and `DomSanitizer` to safely render the HTML content.
- **Location:** `src/app/shared/components/decorative-header/`

### 4. Footer (`app-footer`)

- **Purpose:** The main application footer.
- **Key Features:** Contains links to the GitHub repository, documentation, and the contributing guide.
- **Location:** `src/app/shared/components/footer/`

### 5. Header (`app-header`)

- **Purpose:** The main navigation bar.
- **Key Features:** Includes the logo, main navigation links, `PokemonSearchInputComponent`, `LanguageSelectorComponent`, and `ThemeButtonComponent`. It also handles user authentication state (login/logout).
- **Location:** `src/app/shared/components/header/`

### 6. Language Selector (`app-language-selector`)

- **Purpose:** Allows users to switch between different languages (e.g., English and Spanish).
- **Key Features:** Uses `LanguageService` to manage the application's locale. Implemented as a Shoelace dropdown.
- **Location:** `src/app/shared/components/language-selector/`

### 7. Pokemon Search Input (`app-pokemon-search-input`)

- **Purpose:** A search bar specifically for finding Pokémon by name.
- **Key Features:** Integrates with `PokemonService` for data fetching, uses `AlertService` for error handling, and features a custom directive (`SlInputIconFocusDirective`) for UI enhancements.
- **Location:** `src/app/shared/components/pokemon-search-input/`

### 8. Theme Button (`app-theme-button`)

- **Purpose:** A toggle button to switch between Light and Dark themes.
- **Key Features:** Uses `ThemeManagerService` to manage and persist the theme selection. Icons change dynamically based on the current theme.
- **Location:** `src/app/shared/components/theme-button/`

### 9. Toast Stack (`app-toast-stack`)

- **Purpose:** A container for displaying notification toasts.
- **Key Features:** Manages the visibility and positioning of multiple toast alerts.
- **Location:** `src/app/shared/components/toast-stack/`

## 5. Development Tools & Workflow

### Code Quality Tools

- **ESLint:** Execution via `npm run lint`. Configured with `eslint.config.js` (Flat Config). Includes strict rules for Angular, TypeScript, SonarJS, and Unicorn.
- **Prettier:** Execution via `npm run prettier:write`. Enforces a consistent code style across the project.
- **Stylelint:** Execution via `npm run stylelint:check` or `npm run stylelint:fix`. Uses `postcss-scss` and `recess-order` for strict SCSS linting.
- **Knip:** Execution via `npm run knip`. Identifies unused files, dependencies, and exports to keep the codebase clean.
- **Lighthouse:** Execution via `npm run lighthouse`. Runs automated performance, accessibility, best practices, and SEO audits on the production build.

### Git Hooks (Husky)

The project uses Husky to automate checks during the Git workflow:

- **commit-msg:** Validates that commit messages follow the [Conventional Commits](https://www.conventionalcommits.org/) specification using `@commitlint`.
- **pre-commit:** Runs `lint-staged` to execute ESLint, Prettier, and Stylelint only on the files being committed.
- **pre-push:** (Planned/Implicit) Developers are encouraged to run `npm run verify:test` before pushing.

### Verification Pipelines

- **`npm run verify:test`:** A comprehensive local check that runs linting, coverage tests, accessibility tests, E2E tests, and a production build.
- **`npm run verify:all`:** The most rigorous check, combining `verify:test` with a full Lighthouse audit.

## 6. Testing Strategy

### Unit Testing (Vitest)

- Naming convention: `*.spec.ts`.
- Focus on business logic, services, and component interaction.
- Mandatory coverage thresholds:
  - Statements: 97%
  - Branches: 93%
  - Functions: 96%
  - Lines: 97%

### E2E Testing (Playwright)

- Location: `e2e/*.spec.ts`.
- Coverage of critical flows: Login, registration, Pokémon search.
- Local execution with `npm run test:e2e:local:serve`.

## 7. Internationalization (i18n)

- **Extraction:** `npm run extract` to generate/update XLF files.
- **Locales:** English (`en`) as base, Spanish (`es`) as primary translation.
- **Build:** Missing translation errors fail the production build (`i18nMissingTranslation: error`).

## 8. Build & Deployment

- **Production Build:** `npm run build` (generates localized versions in `dist/pro`).
- **Configurations:** `development`, `preproduction`, `production`, `lighthouse`, `localhost-en`, `localhost-es`.
- **Verification:** Mandatory execution of `npm run verify:all` to validate total quality before release.
