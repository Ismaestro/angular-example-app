# Example app with Angular 4 + Angular CLI + Angular Material + Travis CI

> ### Base project made with much  :heart: . Contains CRUD, official style guide, patterns, etc.

![travis](https://travis-ci.org/Ismaestro/angular4-example-app.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/Ismaestro/angular4-example-app/badge.svg?branch=master)](https://coveralls.io/github/Ismaestro/angular4-example-app?branch=master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/9d190a60fc864060ac054ba17a4e92e4)](https://www.codacy.com/app/Ismaestro/angular4-example-app?utm_source=github.com&utm_medium=referral&utm_content=Ismaestro/angular4-example-app&utm_campaign=badger)
[![Known Vulnerabilities](https://snyk.io/test/github/ismaestro/angular4-example-app/badge.svg)](https://snyk.io/test/github/ismaestro/angular4-example-app)
[![dependency Status](https://david-dm.org/ismaestro/angular4-example-app.svg)](https://david-dm.org/ismaestro/angular4-example-app#info=dependencies)
[![devDependency Status](https://david-dm.org/ismaestro/angular4-example-app/dev-status.svg)](https://david-dm.org/ismaestro/angular4-example-app#info=devDependencies)
[![peerDependencies Status](https://david-dm.org/ismaestro/angular4-example-app/peer-status.svg)](https://david-dm.org/ismaestro/angular4-example-app?type=peer)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![Join the chat at https://gitter.im/angular4-example-app/Lobby](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/angular4-example-app/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

### DEMO

Live DEMO [here](http://angularexampleapp.com/)!

[![angular-example-app](http://i67.tinypic.com/4llshz.jpg)](http://angularexampleapp.com/)

## Usage

**Warning: we strongly recommend node >=v6.9.0 and npm >=3.0.0**

`npm i` - Installs everything needed

`npm start` - Starts the app. Then go to `localhost:4200`

`npm run test` - Runs unit tests with karma and jasmine

`npm run e2e` - Runs end to end tests with protractor

`npm run build` - Builds the app for production

`npm run lint` - Runs the linter (tslint)

`npm run ci` - Executes linter and e2e tests

`npm run deploy` - Builds the app and deploy to Github pages (fork to do this)

`npm run sme` - Builds and runs source map explorer, really cool :)

`npm run release` - Builds and runs source map explorer, really cool :)

**Windows: use precompilation to speed up**
`tsc --project tsconfig.json`
`npm start`

## Features
* Angular 4
* TypeScript
* Angular CLI
* Responsive layout
* Angular Material
* Internationalization
* Sample unit tests with Jasmine and Karma including code coverage
* End-to-end tests with Protractor
* Github pages deploy ready
* Following the [best practices](https://angular.io/guide/styleguide)!

## Travis CI
We use Travis CI to run this tasks in order:
* Linter
* Tests e2e
* Build for production
* Deploy in Github pages
:)

## Contributing
- Please see the CONTRIBUTING file for guidelines.
- Create **pull requests, submit bugs, suggest new features** or documentation updates :wrench:

## Folder Structure

```
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── e2e <- e2e tests
│   ├── app.e2e-spec.ts
│   ├── app.po.ts
│   └── tsconfig.e2e.json
├── karma.conf.js
├── LICENSE
├── package.json
├── package-lock.json <- npm 5
├── protractor.conf.js
├── README.md
├── src
│   ├── app
│   │   ├── app.component.html
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   ├── app.module.ts
│   │   ├── app-routing.module.ts
│   │   ├── app.translate.factory.ts
│   │   ├── config <- app configuration (constants)
│   │   │   ├── app.config.ts
│   │   │   └── iapp.config.ts
│   │   ├── core <- core module imported just once
│   │   │   ├── core.module.ts
│   │   │   ├── footer
│   │   │   │   ├── footer.component.html
│   │   │   │   ├── footer.component.scss
│   │   │   │   ├── footer.component.spec.ts
│   │   │   │   └── footer.component.ts
│   │   │   ├── logger.service.spec.ts
│   │   │   ├── logger.service.ts
│   │   │   ├── module-import-guard.ts
│   │   │   └── nav
│   │   │       ├── nav.component.html
│   │   │       ├── nav.component.scss
│   │   │       ├── nav.component.spec.ts
│   │   │       └── nav.component.ts
│   │   ├── heroes
│   │   │   ├── hero-detail
│   │   │   │   ├── hero-detail.component.html
│   │   │   │   ├── hero-detail.component.scss
│   │   │   │   ├── hero-detail.component.spec.ts
│   │   │   │   └── hero-detail.component.ts
│   │   │   ├── heroes.module.ts
│   │   │   ├── heroes-routing.module.ts
│   │   │   ├── hero-list
│   │   │   │   ├── hero-list.component.html
│   │   │   │   ├── hero-list.component.scss
│   │   │   │   ├── hero-list.component.spec.ts
│   │   │   │   ├── hero-list.component.ts
│   │   │   │   └── remove-hero.dialog.html
│   │   │   ├── hero-search
│   │   │   │   ├── hero-search.component.html
│   │   │   │   ├── hero-search.component.scss
│   │   │   │   ├── hero-search.component.spec.ts
│   │   │   │   └── hero-search.component.ts
│   │   │   ├── hero-top
│   │   │   │   ├── hero-top.component.html
│   │   │   │   ├── hero-top.component.scss
│   │   │   │   ├── hero-top.component.spec.ts
│   │   │   │   └── hero-top.component.ts
│   │   │   └── shared
│   │   │       ├── hero.model.ts
│   │   │       ├── hero.service.spec.ts
│   │   │       └── hero.service.ts
│   │   └── shared
│   │       ├── modules
│   │       │   ├── material.module.ts
│   │       │   └── shared.module.ts
│   │       └── services
│   │           └── progress-bar.service.ts
│   ├── assets
│   │   ├── css
│   │   │   ├── loading.css
│   │   │   ├── reset.css
│   │   │   └── styles.scss
│   │   ├── i18n <- internationalization files
│   │   │   ├── en.json
│   │   │   └── es.json
│   │   └── images
│   │       ├── angular.svg
│   │       └── heroes
│   │           ├── 1.jpg
│   │           ├── ...
│   │           └── 1-mini.jpg

│   ├── CNAME
│   ├── environments
│   │   ├── environment.prod.ts
│   │   └── environment.ts
│   ├── favicon.ico
│   ├── index.html
│   ├── main.ts
│   ├── polyfills.ts
│   ├── test.ts
│   ├── tsconfig.app.json
│   └── tsconfig.spec.json
├── tsconfig.json
└── tslint.json
```

## Server

This repo is using an API which is [a minimal app](https://github.com/Ismaestro/nodejs-example-app) in NodeJS deployed on Heroku and using PostGreSQL, to create, modify and delete heroes.

## Contributors

Thanks to all contributors and they support!

## License

MIT

Enjoy :metal:

We are always happy to hear your feedback!
