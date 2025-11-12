### Angular Example App — Project Guidelines (Angular 20)

These notes capture project-specific conventions and commands so advanced contributors can be productive quickly. This app uses Angular v20 with standalone components, signals-first patterns, Vitest for unit tests (via the experimental Angular unit-test builder), and Playwright for E2E.

---

### Build and Configuration

- Angular CLI/build
  - Builder: `@angular/build:application` with `outputMode: "static"` and SSR disabled (`ssr: false`). See `angular.json > projects.angularexampleapp.architect.build.options`.
  - Index/browser/server entries:
    - `index`: `src/index.html`
    - `browser`: `src/main.ts`
    - `server`: `src/main.server.ts` (not used for SSR in this project)
  - Polyfills: `@angular/localize/init` is included for i18n.
  - Styles: global SCSS at `src/styles/global.scss` with Sass `@use` modules and `stylePreprocessorOptions.includePaths: ["src/styles"]` so imports like `@use 'base/reset'` resolve without relative paths.
  - Third-party CSS: Shoelace theme included globally: `@shoelace-style/shoelace/dist/themes/light.css`.
  - i18n: Build is localized for `en` and `es` with strict missing-translation errors. Local serve configs for a single locale:
    - `localhost-en` and `localhost-es` disable output hashing/optimization and set `localize` to the given locale.
  - Budgets: initial bundle warnings at 500 kB, errors at 1 MB; per-component styles warnings at 2 kB, errors at 4 kB.

- Commands (package.json)
  - Dev server (English): `npm start` → `ng serve --configuration=localhost-en --open`
  - Dev server (Spanish): `npm run start:es` → `ng serve --configuration=localhost-es --open`
  - Production build: `npm run build`
  - Build with stats (source maps and `--stats-json`): `npm run build:stats`
  - i18n extraction/merge: `npm run extract` outputs to `src/locale`
  - Formatting and linting: `npm run format:check`, `npm run format:fix`, `npm run lint` (Angular ESLint) and `npm run stylelint`
  - Full CI-style verification: `npm run verify` (format → unit tests → e2e → build → lighthouse)

- TypeScript/Angular versions
  - Angular packages pinned to 20.3.x, TypeScript `5.9.3`.
  - The repo uses ESLint 9 with `@angular-eslint` 20 and Stylelint 16.

- Environment/DI notes
  - DI token `ENVIRONMENT` is used (see unit tests) for environment-specific values like `domain`.
  - Zoneless change detection is used in tests via `provideZonelessChangeDetection()` when appropriate.

---

### Unit Testing (Vitest via Angular experimental unit-test builder)

- Runner: Vitest, executed through Angular’s experimental `@angular/build:unit-test` builder. See `angular.json > architect.test.options.runner: "vitest"`.
- Default commands:
  - Run once (CI-friendly): `npm test` → `ng test --no-code-coverage --no-watch`
  - Watch mode: `npm run test:watch`
- Specs are discovered from `tsconfig.spec.json` includes: `src/**/*.spec.ts` and `src/**/*.d.ts`.
- Example patterns used in existing tests:
  - Angular TestBed with standalone components and zoneless CD:
    ```ts
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ENVIRONMENT, useValue: { domain: 'localhost' } },
        HeaderService,
      ],
    })
      .overrideComponent(AppComponent, {
        remove: { imports: [HeaderComponent] },
        add: { imports: [HeaderStubComponent] },
      })
      .compileComponents();
    ```
  - Accessibility checks use `axe-core` directly inside Vitest.

- Adding a new test (unit)
  - Create a file under `src/**/your-feature.spec.ts`. Example minimal spec that we validated locally:

    ```ts
    import { describe, it, expect } from 'vitest';

    describe('math', () => {
      it('adds numbers', () => {
        const add = (a: number, b: number) => a + b;
        expect(add(2, 3)).toBe(5);
      });
    });
    ```

  - Run `npm test` or `npm run test:watch` to execute it.

- Notes
  - The Angular unit-test builder is marked EXPERIMENTAL; treat large-scale configuration changes with care.
  - Some DOM APIs (e.g., `HTMLCanvasElement.getContext`) are not implemented in the default JSDOM environment; mock or install the relevant polyfills when needed.

---

### End-to-End Testing (Playwright)

- Config: `playwright.config.ts`
  - Test directory: `e2e/tests`
  - Project: Chromium desktop, fully parallel, HTML report (saved under `playwright-report`)
  - Base URL is read from `process.env.BASE_URL` and defaults to the deployed demo (`https://angular-example-app.netlify.app`).

- Commands
  - Local against already running dev server: `npm run e2e:local`
    - Sets `BASE_URL=http://localhost:4200` and runs Chromium tests.
  - Programmatic local flow (start server → wait → run E2E → stop): `npm run script:e2e:local`
    - Script: `scripts/e2e.mjs` spawns `ng serve --configuration=localhost-en`, waits for `http://localhost:4200` (30s timeout), runs tests, then stops the server.
  - CI/prod-like against default base URL: `npm run e2e:pro`

- Tips
  - When adding E2E specs, prefer test IDs over brittle selectors.
  - Keep tests parallel-safe; avoid test order dependencies.

---

### Development Practices (Angular v20)

- Standalone-first architecture
  - Components/pipes/directives are standalone; imports/exports are at component level. The schematics are configured for standalone with `changeDetection: OnPush` by default.

- Signals and new control flow
  - Prefer `signal()`/`computed()` for local state; avoid `mutate()`, use `set`/`update`.
  - Use template control flow blocks `@if`, `@for`, `@switch` instead of structural directives.
  - Prefer `input()` and `output()` functions for component inputs/outputs.

- Change detection
  - OnPush everywhere; for host bindings/listeners, use the `host` metadata instead of decorators per the project’s style preferences.
  - In tests, consider `provideZonelessChangeDetection()` to keep execution predictable and fast.

- Templates & styles
  - Avoid `ngClass`/`ngStyle`; use property/class/style bindings.
  - Import pipes explicitly if used in templates.
  - Global SCSS is composed via Sass modules in `src/styles` and included from `src/styles/global.scss`.

- Images & performance
  - Use `NgOptimizedImage` for static images.
  - Watch bundle budgets in `angular.json`; use the `build:stats` variant with source maps and `--stats-json` when investigating size spikes.

- Linting/formatting & commits
  - Run `npm run lint` and `npm run stylelint` locally before pushing.
  - Use `npm run format:fix` to apply Prettier.
  - Conventional commits are enforced via Commitlint + Husky; run `npm run prepare` after `npm i` if hooks are not active.

---

### Quick Start Recipes

- Fresh clone setup
  1. `npm ci`
  2. `npm run playwright:install` (first time only; installs browsers and OS deps)

- Local dev (English)
  - `npm start` → open http://localhost:4200

- Run unit tests
  - `npm test` (single run) or `npm run test:watch`

- Run E2E end-to-end locally
  - `npm run script:e2e:local` (server managed automatically)

- Full verification
  - `npm run verify`

---

### Verified Test Example

- We validated a minimal Vitest spec that asserts `add(2, 3) === 5` and confirmed it runs with `npm test`. Remove demonstration specs after using them to keep the suite clean.

---

### Troubleshooting

- Unit tests complain about missing DOM APIs (e.g., `HTMLCanvasElement.getContext`)
  - Install and configure appropriate polyfills or mock the API in the spec.
- Playwright tests fail locally
  - Ensure `BASE_URL` points to the correct server and that the dev server is up (use `script:e2e:local` to manage this automatically).
