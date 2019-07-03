<p align="center">
  <a href="https://angular.io/">
    <img src="https://www.angularexampleapp.com/assets/images/angular.svg" alt="Logo" width=72 height=72>
  </a>

  <h3 align="center">Angular Example App</h3>

  <p align="center">
    Example app with Angular 8 + Angular CLI + Angular Universal + i18n + Firebase
    <br>
    <br>
    :clap::clap::tada::tada::tada::tada::clap::clap:
    <br>
    <br>
    Base project made with much :heart:. Contains CRUD, patterns, generated library, and much more!
    <br>
    <br>
    <a href="https://www.angularexampleapp.com/">LIVE DEMO</a>
    <br>
    <a href="https://www.angularexampleapp.com/">
      <img src="https://media.giphy.com/media/ce28l1P13CVK56OyCN/giphy.gif" alt="Demo example"/>
    </a>
    <br>
    <br>
    <a href="https://github.com/Ismaestro/angular8-example-app/issues/new">Report bug</a>
    ·
    <a href="https://github.com/Ismaestro/angular8-example-app/issues/new">Request feature</a>
  </p>
</p>

## Table of contents

- [Status](#status)
- [What's included](#whats-included)
- [Quick start](#quick-start)
- [Bugs and feature requests](#bugs-and-feature-requests)
- [Apply this to your project](#apply-this-to-your-project)
- [Contributing](#contributing)
- [Creators](#creators)
- [Thanks](#thanks)
- [Copyright and license](#copyright-and-license)

## Status

![travis](https://travis-ci.org/Ismaestro/angular8-example-app.svg?branch=master)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Ismaestro_angular8-example-app&metric=alert_status)](https://sonarcloud.io/dashboard?id=Ismaestro_angular8-example-app)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=Ismaestro_angular8-example-app&metric=coverage)](https://sonarcloud.io/dashboard?id=Ismaestro_angular8-example-app)
[![dependency Status](https://david-dm.org/ismaestro/angular8-example-app.svg)](https://david-dm.org/ismaestro/angular8-example-app#info=dependencies)
[![devDependency Status](https://david-dm.org/ismaestro/angular8-example-app/dev-status.svg)](https://david-dm.org/ismaestro/angular8-example-app#info=devDependencies)
[![peerDependencies Status](https://david-dm.org/ismaestro/angular8-example-app/peer-status.svg)](https://david-dm.org/ismaestro/angular8-example-app?type=peer)
[![npm](https://img.shields.io/badge/demo-online-brightgreen.svg)](http://angularexampleapp.com/)

[![GitHub stars](https://img.shields.io/github/stars/ismaestro/angular8-example-app.svg?style=social&label=Star)](https://github.com/ismaestro/angular8-example-app)
[![GitHub forks](https://img.shields.io/github/forks/ismaestro/angular8-example-app.svg?style=social&label=Fork)](https://github.com/ismaestro/angular8-example-app/fork)

## What's included

- [x] CRUD: create, update and remove heroes with Firebase
- [x] Angular Universal (SSR)
- [x] Use of [preboot](https://github.com/angular/preboot) module to share state between browser and server
- [x] Security Headers using [helmet](https://helmetjs.github.io). Report [here](https://securityheaders.com/?q=https%3A%2F%2Fwww.angularexampleapp.com).
- [x] Internationalization with the official i18n. Separated builds for english and spanish.
- [x] Lazy loading modules
- [x] Service Workers enabled!
- [x] Example of Angular Resolver for Hero Detail
- [x] More logical directory structure (from [here](https://itnext.io/choosing-a-highly-scalable-folder-structure-in-angular-d987de65ec7))
- [x] Basic example library
- [x] Following the [best practices](https://angular.io/guide/styleguide)!
- [x] Search bar, to look for heroes
- [x] Custom loading page
- [x] Lazy loading images with [ng-lazyload-image](https://github.com/tjoskar/ng-lazyload-image)
- [x] Modal and toasts (snakbar)!
- [x] Scroll restoration and anchor examples
- [x] Responsive layout (flex layout module)
- [x] SASS (most common used functions and mixins) and BEM styles
- [x] Animations with [ng-animate](https://jiayihu.github.io/ng-animate/)
- [x] Angular Pipes
- [x] Interceptors and Events (Progress bar active, if a request is pending)
- [x] Scroll to first invalid input in forms. ([ngx-scroll-to-first-invalid](https://github.com/Ismaestro/ngx-scroll-to-first-invalid))
- [x] Modernizr (browser features detection)
- [x] Browser filter (Bowser) because of IE ^^
- [x] [Sentry](https://sentry.io)! (logs every error in the app)
- [x] Google Tag Manager
- [x] ES6 Promises and Observables
- [x] Unit tests with Jasmine and Karma including code coverage. Use of [ng-bullet](https://www.npmjs.com/package/ng-bullet), [karma-mocha-reporter](https://github.com/litixsoft/karma-mocha-reporter) and [ng-mocks](https://github.com/ike18t/ng-mocks)
- [x] End-to-end tests with Protractor

### Angular Ivy

This project is using version 8 of angular but Ivy is not enabled. I'm trying to do it, but some errors appear during this process. I would accept any pull request about this because no one till now knows what to do...

### Angular Universal and i18n

This project is deployed in firebase using Angular Universal and the official i18n. You can navigate through every language and reload (and share) every page in the application without losing context. This is very useful for SEO purposes and you almost have a ready for production app.
If you want to translate the messages you can use this awesome tool, [Tiny Translator](https://martinroob.github.io/tiny-translator/en/#/translate) or follow [this tutorial](https://github.com/martinroob/ngx-i18nsupport/wiki/Tutorial-for-using-xliffmerge-with-angular-cli).

I've created a medium post where you can find a tutorial to apply this concepts to your own project. [Check it here](https://medium.com/@ismaestro/angular-7-example-app-with-angularcli-angular-universal-i18n-official-firebase-66deac2dc31e), and let me know what do you think.

### Firebase

This repo is using Firebase. We use Cloud Firestore and Cloud Storage to handle CRUD operations over the heroes and to store their images. Also Hosting and Functions to deploy the app with Universal.

## Travis CI

We use Travis CI to run this tasks in order:
* Linter
* Unit tests
* End to end tests
* Build for production of browser and server
* Validate that server generated using curl
* Sonar
* Deploy to Firebase

## Quick start

**WARNING**

> Verify that you are running node 10.16.0 by running node -v in a terminal/console window. Older versions produce errors, but newer versions are fine.

 ```bash
 npm i
 npm start
 ```

Tasks                       | Description
----------------------------|---------------------------------------------------------------------------------------
npm start                   | Start the app in development mode with the english language only
npm start:es                | Start the app in development mode with the spanish language only
start:ssr                   | Start the server like SSR
extract-i18n                | Extract all messages from templates and ts files and update the language files with new translations
npm run lint                | Run the linter (tslint)
npm run test                | Run all unit tests with karma and jasmine
npm run test:app:watch      | Run app unit tests and wait for changes
npm run test:library:watch  | Run library unit tests and wait for changes
npm run e2e                 | Run end to end tests with protractor
npm run build:prod:en       | Build the app for production with english translations
npm run build:prod:es       | Build the app for production with spanish translations
npm run build:server:prod   | Build the server version for production
npm run compile:server      | Compiles the server with webpack
npm run build:ssr           | Complete task with all the build subtasks for SSR
npm run build:library       | Build the library
npm run serve:ssr           | Start the node server for angular universal
npm run validate:server     | Script that validate if server generated previously starts without error
npm run bundle-report       | Build and run webpack-bundle-analyzer over stats json
npm run release:minor       | Create a new minor release using standard-version
npm run release:major       | Create a new major release using standard-version
npm run ci                  | Execute linter, tests and production builds
npm run deploy              | Build the app and deploy it to firebase hosting

## Bugs and feature requests

Have a bug or a feature request? Please first read the [issue guidelines](https://github.com/Ismaestro/angular8-example-app/blob/master/CONTRIBUTING.md) and search for existing and closed issues. If your problem or idea is not addressed yet, [please open a new issue](https://github.com/Ismaestro/angular8-example-app/issues/new).

## Contributing

Please read through our [contributing guidelines](https://github.com/Ismaestro/angular8-example-app/blob/master/CONTRIBUTING.md). Included are directions for opening issues, coding standards, and notes on development.

Moreover, all HTML and CSS should conform to the [Code Guide](https://github.com/mdo/code-guide), maintained by [Ismael Ramos](https://github.com/ismaestro).

Editor preferences are available in the [editor config](https://github.com/Ismaestro/angular8-example-app/blob/master/.editorconfig) for easy use in common text editors. Read more and download plugins at <https://editorconfig.org/>.

## Creators

**Ismael Ramos**

- <https://github.com/ismaestro>

<a href="https://www.buymeacoffee.com/ismaestro" target="_blank"><img src="http://i65.tinypic.com/2rx8kn8.jpg" border="0" alt="Buy Me A Coffee"></a>

## Thanks

Thanks to all contributors and their support.

If you have an idea or you want to do something, tell me or just do it!
I'm always happy to hear your feedback!

## Copyright and license

Code and documentation copyright 2018 the authors. Code released under the [MIT License](https://github.com/Ismaestro/angular8-example-app/blob/master/LICENSE).

Enjoy :metal:
