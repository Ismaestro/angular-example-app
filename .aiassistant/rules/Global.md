---
apply: always
---

# Global Rules

## Code Style & Architecture Rules

### TypeScript

- Avoid `any`.
- Explicitly type **parameters** and relevant data structures.
- Return types are NOT required, but add them when they improve clarity.
- **Dependency Injection:** Use the `inject()` function exclusively. Constructor-based injection is forbidden.
- **Modern Angular Patterns:**
  - Use **Signals** for local and shared state management.
  - Use `linkedSignal` for derived state when necessary.
  - **Effects** (`effect`) must be declared as class properties (`readonly myEffect = effect(...)`) to ensure proper lifecycle management. Avoid calling `effect()` inside constructors.
  - Mandatory use of `ChangeDetectionStrategy.OnPush` in all components.
  - Follow **Zoneless** principles; avoid `NgZone` and rely on Signals for change detection.

### General Code Quality

- **Single Responsibility:** Each file, class, and function should do one thing and do it well.
- **DRY (Don't Repeat Yourself):** Extract repeated code into shared utilities, services, or helper functions.
- **Error handling:** Always handle errors in async operations (HTTP calls, promises). Never swallow errors silently — at minimum, log them.
- **Naming conventions:** Use descriptive names without ambiguous abbreviations (avoid `req`, `res`, `err`). Verbs for functions (`getUser`, `handleClick`), nouns for variables (`userList`, `isVisible`).
- **File Naming & Structure:**
  - Types: `*.types.ts`
  - Enums: `*.enums.ts`
  - Constantes: `*.constants.ts`
  - Fixtures de test: `*.fixtures.ts`
  - Desacoplamiento: Extraer definiciones de interfaces y constantes de los archivos de servicios y componentes hacia sus archivos específicos.
- **Immutability:** Prefer `const` over `let`. Avoid mutating state directly — use spread, `map`, `filter` instead of `push`, `splice`, or direct property assignment.
- **Early returns:** Use guard clauses to reduce nesting and improve readability.
- **Pure functions:** Prefer functions without side effects when possible. Isolate side effects at the edges (services, lifecycle hooks).
- **Avoid magic strings/numbers:** Extract literal values into named constants with descriptive names. Improves maintainability and searchability.
- **Fail fast:** Validate inputs at the beginning of functions. Do not let invalid data propagate deep into the execution flow.
- **Small, atomic commits:** Each commit should be self-contained and represent a single responsibility or logical change.
- **No complex logic in templates:** Move complex expressions (multiple operators, calculations, chained conditions) out of HTML templates into computed signals or component methods.
- **Consistent return types:** A function should not return `null` sometimes, `undefined` other times, and the actual value in other cases. Be consistent with absence representation.
- **Avoid nested subscriptions/callbacks:** Use RxJS composition operators (`switchMap`, `mergeMap`, `concatMap`) instead of nested `subscribe()` calls. Same applies to nested `.then()` chains — prefer `async/await`.
- **Limit side effect scope:** If a function has side effects, they should only affect what is strictly necessary. Do not use a function to silently modify unrelated state.
- **Prefer composition over inheritance:** Use composition (service injection, utility functions) over deep inheritance chains. Favor small, focused, reusable pieces.
- **Keep conditionals positive:** Prefer positive conditions (`if (isVisible)`) over double negations or inverted logic (`if (!isNotHidden)`). Improves readability.
- **One abstraction level per function:** Each function should operate at a single level of abstraction. Do not mix high-level orchestration with low-level details (parsing, formatting) in the same function.
- **Avoid boolean parameters:** Functions with a `boolean` parameter often do two things. Prefer two descriptive named functions, or use a literal/enum type parameter.
- **Explicit over implicit:** Prefer explicit, readable code over "clever" code. When choosing between brevity and clarity, choose clarity.
- **Dependency direction:** Dependencies must flow inward: `features → shared → core`. Never the reverse. Core must not import from features or shared.
- **Encapsulate conditionals:** Extract complex conditions into descriptive named variables or functions (`const isEligible = age >= 18 && hasConsent`) instead of inlining them in `if` statements.
- **Prefer typed objects over long parameter lists:** When passing complex data to a function, use a typed object parameter instead of multiple positional parameters.
- **Observables: always unsubscribe:** Every manual Observable subscription in components must be cleaned up in `ngOnDestroy` or via `takeUntilDestroyed()` / `DestroyRef`. Prefer `toSignal()` or the `async` pipe to avoid manual subscriptions altogether.
- **Defensive data access:** Use optional chaining (`?.`) and nullish coalescing (`??`) when accessing properties that may not exist. Never assume API data is always complete.
- No empty functions. If a function must exist without implementation, add: `// Empty`

### Components

- Components must contain **only the logic strictly necessary for the view**.
- Keep components: simple, predictable, and easy to test.
- Extract cross-cutting logic into **independent services** (scroll, state management, complex calculations, date formatting, etc.).
- **`protected` for template-only members:** Use `protected` on class members that are only accessed from the component's template. Public members define a public API accessible via DI and queries — do not expose template-only members as public.
- **`readonly` for Angular-initialized properties:** Mark `input()`, `output()`, `model()`, `viewChild()`, `viewChildren()`, `contentChild()`, and `contentChildren()` as `readonly`.
- **Group Angular properties first:** In components/directives, group Angular-specific properties (injected dependencies, inputs, outputs, queries) at the top of the class, before any methods.
- **Event handler naming:** Name event handlers for the action they perform (`saveUserData()`), not for the triggering event (`handleClick()`, `onSubmit()`).

### HTML & Accessibility

- Use **semantically correct** HTML.
- Respect accessibility: proper use of tags, correct heading hierarchy, accessible attributes when needed.
- Animations, transitions, and auto-scroll must respect `prefers-reduced-motion`.
- **Prefer `[class]`/`[style]` bindings over `ngClass`/`ngStyle`:** Built-in class and style bindings are more performant and align with standard HTML. Avoid `NgClass` and `NgStyle` directives.

### SCSS / Styling

- Use **SASS (SCSS)** — no plain CSS if SASS can solve it.
- Use **BEM** naming methodology.
- **Mobile first:** default styles are mobile; use breakpoint mixins for desktop adaptations.
- Never hardcode colors, typography, spacing, or z-index if a design system variable exists.
- Transitions/animations must respect `prefers-reduced-motion` and provide a no-motion alternative.
- Keep styles: readable, predictable, grouped by BEM block.
- Avoid deep selectors or selectors dependent on HTML structure.

## Unit Test Guidelines

- **Behavior over implementation:** Tests should primarily verify observable behavior (DOM changes, emitted values, CSS classes, visible state). Implementation assertions (e.g., `expect(service.method).toHaveBeenCalledWith(...)`) are acceptable when they add real value, but the default approach should always be behavior-first.
- **Coverage Thresholds:** Mandatory minimum coverage:
  - Statements: 97%
  - Branches: 93%
  - Functions: 96%
  - Lines: 97%
- **Branch coverage:** All branches of the file or new functionality under test must be covered (if/else, switch cases, early returns, error paths, edge cases).
- **Mock external dependencies:** Components and services that are NOT the subject of the test must be mocked/stubbed. Only test the unit in isolation.
- **Environment & Mocks:**
  - Use **Vitest** as the test runner.
  - Implement global mocks for `ResizeObserver` and `IntersectionObserver` when needed.
  - Tests must fail on unexpected `console.error` or `console.warn` (using spies in setup).
- **Cleanup:** Reset mocks, spies, and any shared state before and after each test (`beforeEach`/`afterEach`) to ensure test isolation and prevent side effects between tests.

## Infrastructure & Quality

- **ESLint:** Strict adherence to rules. No `any`, no forbidden abbreviations, and strict void return types. Do not disable rules; fix the code.
- **Husky Hooks:**
  - `commit-msg`: Validates conventional commits.
  - `pre-commit`: Runs `lint-staged` (ESLint, Prettier, Stylelint).
  - `pre-push`: Runs full lint and tests with coverage.
- **Path Aliases:** Use `~core/*`, `~shared/*`, and `~features/*` for imports.

## Communication

- Always respond in **Spanish** (español).
- Be cordial and give encouragement when it makes sense, naturally and not forced.

## Analytics

- When working on a new feature, proactively suggest which analytics events should be added (page views, CTA clicks, user interactions, conversions, relevant errors, scroll depth, time on page, etc.).
- When creating analytics events, do NOT include `page_url` or the logged-in user ID in the payload — the analytics library injects those automatically.

## Commits

- Use **Conventional Commits** format: `type(scope): subject`
- Subject always lower-case, no trailing period.
- Body and footer must be empty.
- Check the project's commitlint config for allowed types and scopes.

## Testing

- Run tests with `npm test` (no additional flags).

## Project Documentation

- After each modification, evaluate if the change affects the project's `AGENTS.md` file. If so, suggest or apply the corresponding update. Examples: new features, new services/components/directives/pipes, dependency version changes, folder structure changes, new routes, ESLint/commitlint config changes, npm script changes, etc.
