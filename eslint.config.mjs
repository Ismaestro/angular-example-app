import eslint from '@eslint/js';
import tsEslint from 'typescript-eslint';
import angular from 'angular-eslint';
import eslintComments from 'eslint-plugin-eslint-comments';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier';
import pluginPromise from 'eslint-plugin-promise';

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
      eslint.configs.recommended,
      ...tsEslint.configs.recommended,
      ...angular.configs.tsRecommended,
      pluginPromise.configs['flat/recommended'],
    ],
    plugins: {
      typescriptEslint,
      'eslint-comments': eslintComments,
    },
    processor: angular.processInlineTemplates,
    rules: {
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-restricted-types': 'error',
      '@typescript-eslint/no-empty-object-type': 'error',
      '@typescript-eslint/no-unsafe-function-type': 'error',
      '@typescript-eslint/no-wrapper-object-types': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/dot-notation': 'off',
      '@typescript-eslint/explicit-member-accessibility': [
        'off',
        {
          accessibility: 'explicit',
        },
      ],
      '@typescript-eslint/no-for-in-array': 'error',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/require-array-sort-compare': [
        'error',
        {
          ignoreStringArrays: true,
        },
      ],
      '@typescript-eslint/quotes': 'off',
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/member-ordering': 'off',
      '@typescript-eslint/no-shadow': ['error'],
      '@typescript-eslint/no-unused-expressions': 'off',
      '@angular-eslint/use-injectable-provided-in': 'error',
      '@angular-eslint/use-lifecycle-interface': 'error',
      '@angular-eslint/no-pipe-impure': 'error',
      '@angular-eslint/prefer-on-push-component-change-detection': 'error',
      '@angular-eslint/no-conflicting-lifecycle': 'error',
      '@angular-eslint/no-forward-ref': 'error',
      '@angular-eslint/no-input-prefix': 'error',
      '@angular-eslint/no-input-rename': 'error',
      '@angular-eslint/no-output-on-prefix': 'error',
      '@angular-eslint/no-output-rename': 'error',
      '@angular-eslint/prefer-output-readonly': 'error',
      '@angular-eslint/relative-url-prefix': 'error',
      '@angular-eslint/use-component-selector': 'error',
      '@angular-eslint/use-component-view-encapsulation': 'error',
      '@angular-eslint/use-pipe-transform-interface': 'error',
      '@angular-eslint/component-class-suffix': 'error',
      '@angular-eslint/directive-class-suffix': 'error',
      '@angular-eslint/pipe-prefix': 'error',
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      'eslint-comments/no-use': 'error',
      'brace-style': [
        'error',
        '1tbs',
        {
          allowSingleLine: true,
        },
      ],
      'default-case-last': 'error',
      'dot-notation': 'off',
      'id-denylist': 'off',
      'id-match': 'off',
      complexity: [
        'error',
        {
          max: 8,
        },
      ],
      'max-len': [
        'error',
        {
          code: 400,
        },
      ],
      'max-lines-per-function': [
        'error',
        {
          max: 30,
        },
      ],
      'max-params': [
        'error',
        {
          max: 3,
        },
      ],
      'promise/always-return': 'error',
      'promise/no-return-wrap': 'error',
      'promise/param-names': 'error',
      'promise/catch-or-return': 'error',
      'promise/no-native': 'off',
      'promise/no-nesting': 'error',
      'promise/no-promise-in-callback': 'error',
      'promise/no-callback-in-promise': 'error',
      'promise/no-new-statics': 'error',
      'promise/no-return-in-finally': 'error',
      'promise/valid-params': 'error',
      'promise/no-multiple-resolved': 'error',
    },
  },
  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
    rules: {
      '@angular-eslint/template/no-call-expression': 'error',
      '@angular-eslint/template/no-any': 'error',
      '@angular-eslint/template/no-autofocus': 'error',
      '@angular-eslint/template/no-distracting-elements': 'error',
      '@angular-eslint/template/no-positive-tabindex': 'error',
      '@angular-eslint/template/no-negated-async': 'error',
      '@angular-eslint/template/click-events-have-key-events': 'error',
      '@angular-eslint/template/mouse-events-have-key-events': 'error',
      '@angular-eslint/template/conditional-complexity': 'error',
      '@angular-eslint/template/use-track-by-function': 'error',
      '@angular-eslint/template/i18n': 'off',
      '@angular-eslint/template/alt-text': 'error',
      '@angular-eslint/template/valid-aria': 'error',
      '@angular-eslint/template/elements-content': 'error',
      '@angular-eslint/template/table-scope': 'error',
    },
  },
  eslintConfigPrettier,
);
