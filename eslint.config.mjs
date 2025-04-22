import eslint from '@eslint/js';
import tsEslint from 'typescript-eslint';
import angular from 'angular-eslint';
import eslintComments from 'eslint-plugin-eslint-comments';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier';
import pluginPromise from 'eslint-plugin-promise';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';

const APP_PREFIX = 'app';

export default tsEslint.config(
  {
    files: ['**/*.ts'],
    languageOptions: {
      ecmaVersion: 5,
      sourceType: 'script',
      parserOptions: {
        project: ['tsconfig.eslint.json'],
        createDefaultProgram: false,
      },
    },
    extends: [
      eslint.configs.all,
      ...tsEslint.configs.all,
      ...angular.configs.tsAll,
      eslintPluginUnicorn.configs['flat/all'],
      pluginPromise.configs['flat/recommended'],
    ],
    plugins: {
      typescriptEslint,
      'eslint-comments': eslintComments,
    },
    processor: angular.processInlineTemplates,
    rules: {
      complexity: [
        'error',
        {
          max: 5,
        },
      ],
      'max-len': [
        'error',
        {
          code: 300,
        },
      ],
      'max-lines-per-function': [
        'error',
        {
          max: 30,
        },
      ],
      'no-plusplus': ['error', { 'allowForLoopAfterthoughts': true }],
      '@typescript-eslint/max-params': [
        'error',
        {
          max: 2,
        },
      ],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'no-public',
        },
      ],
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: APP_PREFIX,
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: APP_PREFIX,
          style: 'kebab-case',
        },
      ],
      'promise/no-multiple-resolved': 'error',
      'promise/spec-only': 'error',
      'eslint-comments/no-use': [
        'error',
        { 'allow': ['eslint-disable-next-line', 'eslint-disable', 'eslint-enable'] },
      ],
      'no-warning-comments': ['error', { 'terms': ['warn'] }],
      'capitalized-comments': ['error', 'always', { 'ignoreConsecutiveComments': true }],

      // Off
      'max-params': 'off',
      'sort-keys': 'off',
      'no-underscore-dangle': 'off',
      'sort-imports': 'off',
      'new-cap': 'off',
      'strict': 'off',
      'one-var': 'off',
      'no-undefined': 'off',
      'no-inline-comments': 'off',
      'no-void': 'off',
      'func-style': 'off',
      'no-duplicate-imports': 'off',
      'no-implicit-coercion': 'off',
      'no-ternary': 'off',
      'no-implicit-globals': 'off',
      '@angular-eslint/prefer-standalone': 'off',
      '@angular-eslint/prefer-standalone-component': 'off',
      '@angular-eslint/runtime-localize': 'off',
      '@angular-eslint/no-host-metadata-property': 'off',
      '@typescript-eslint/no-unsafe-type-assertion': 'off',
      '@typescript-eslint/switch-exhaustiveness-check': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/prefer-readonly-parameter-types': 'off',
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-magic-numbers': 'off',
      '@typescript-eslint/use-unknown-in-catch-callback-variable': 'off',
      '@typescript-eslint/no-extraneous-class': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/init-declarations': 'off',
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/member-ordering': 'off',
      '@typescript-eslint/class-methods-use-this': 'off',
      'unicorn/prefer-top-level-await': 'off',
      'unicorn/no-null': 'off',
      'unicorn/prefer-global-this': 'off',
      'unicorn/consistent-function-scoping': 'off',
      'unicorn/prefer-dom-node-dataset': 'off',
    },
  },
  {
    files: ['**/*.spec.ts'],
    rules: {
      'max-lines-per-function': 'off',
    },
  },
  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateAll],
    rules: {
      '@angular-eslint/template/no-call-expression': 'off',
      '@angular-eslint/template/i18n': [
        'error',
        {
          'checkId': false,
          'checkAttributes': false,
        },
      ],
    },
  },
  eslintConfigPrettier,
);
