module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['build', 'docs', 'feat', 'fix', 'perf', 'refactor', 'chore', 'test'],
    ],
    'scope-enum': [
      2,
      'always',
      [
        'repo',
        'tools',
        'styles',
        'e2e',
        'version',
        'app',
        'core',
        'auth',
        'home',
        'pokemon',
        'pokedex',
      ],
    ],
    'subject-case': [2, 'always', 'lower-case'],
    'subject-full-stop': [2, 'never'],
  },
};
