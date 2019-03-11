<p align="center">
  <a href="https://angular.io/">
    <img src="https://www.angularexampleapp.com/assets/images/angular.svg" alt="Logo" width=72 height=72>
  </a>

  <h3 align="center">Angular Example App</h3>

  <p align="center">
    Example app with Angular 7 + Angular CLI + Angular Universal + i18n + Firebase
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
    <a href="https://github.com/Ismaestro/angular7-example-app/issues/new">Report bug</a>
    ·
    <a href="https://github.com/Ismaestro/angular7-example-app/issues/new">Request feature</a>
  </p>
</p>

## Table of contents

- [Status](#status)
- [What's included](#whats-included)
- [Quick start](#quick-start)
- [Bugs and feature requests](#bugs-and-feature-requests)
- [Contributing](#contributing)
- [Creators](#creators)
- [Thanks](#thanks)
- [Copyright and license](#copyright-and-license)

## Status

![travis](https://travis-ci.org/Ismaestro/angular7-example-app.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/Ismaestro/angular7-example-app/badge.svg?branch=master)](https://coveralls.io/github/Ismaestro/angular7-example-app?branch=master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/9d190a60fc864060ac054ba17a4e92e4)](https://www.codacy.com/app/Ismaestro/angular7-example-app?utm_source=github.com&utm_medium=referral&utm_content=Ismaestro/angular7-example-app&utm_campaign=badger)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![dependency Status](https://david-dm.org/ismaestro/angular7-example-app.svg)](https://david-dm.org/ismaestro/angular7-example-app#info=dependencies)
[![devDependency Status](https://david-dm.org/ismaestro/angular7-example-app/dev-status.svg)](https://david-dm.org/ismaestro/angular7-example-app#info=devDependencies)
[![peerDependencies Status](https://david-dm.org/ismaestro/angular7-example-app/peer-status.svg)](https://david-dm.org/ismaestro/angular7-example-app?type=peer)
[![npm](https://img.shields.io/badge/demo-online-brightgreen.svg)](http://angularexampleapp.com/)

[![GitHub stars](https://img.shields.io/github/stars/ismaestro/angular7-example-app.svg?style=social&label=Star)](https://github.com/ismaestro/angular7-example-app)
[![GitHub forks](https://img.shields.io/github/forks/ismaestro/angular7-example-app.svg?style=social&label=Fork)](https://github.com/ismaestro/angular7-example-app/fork)

## What's included

* CRUD: create, update and remove heroes with Firebase
* Angular Universal (SSR)
* Internationalization with the official i18n. Separated builds for english and spanish.
* Lazy loading modules
* More logical directory structure (from [here](https://itnext.io/choosing-a-highly-scalable-folder-structure-in-angular-d987de65ec7))
* Basic example library
* Following the [best practices](https://angular.io/guide/styleguide)!
* Search bar, to look for heroes
* Custom loading page
* Modal and toasts (snakbar)!
* Scroll restoration and anchor examples
* Responsive layout (flex layout module)
* SASS (most common used functions and mixins) and BEM styles
* Animations!
* Angular Pipes
* Interceptors and Events (Progress bar active, if a request is pending)
* Scroll to first invalid input in forms. ([ngx-scroll-to-first-invalid](https://github.com/Ismaestro/ngx-scroll-to-first-invalid))
* Modernizr (browser features detection)
* Browser filter (Bowser) because of IE ^^
* [Sentry](https://sentry.io)! (logs every error in the app)
* Google Tag Manager
* ES6 Promises and Observables
* Unit tests with Jasmine and Karma including code coverage (Use of [ng-bullet](https://www.npmjs.com/package/ng-bullet) and [karma-mocha-reporter](https://github.com/litixsoft/karma-mocha-reporter))
* End-to-end tests with Protractor


### Angular Universal and i18n

This project is deployed in firebase using Angular Universal and the official i18n. You can navigate through every language and reload (and share) every page in the application without losing context. This is very useful for SEO purposes and you almost have a ready for production app.
If you want to translate the messages you can use this awesome tool, [Tiny Translator](https://martinroob.github.io/tiny-translator/en/#/translate) or follow [this tutorial](https://github.com/martinroob/ngx-i18nsupport/wiki/Tutorial-for-using-xliffmerge-with-angular-cli).

### Firebase

This repo is using Firebase. We use Cloud Firestore and Cloud Storage to handle CRUD operations over the heroes and to store their images. Also Hosting and Functions to deploy the app with Universal.

## Quick start

**Warning**

> Verify that you are running at least node 8.9.x and npm 5.x.x by running node -v and npm -v in a terminal/console window. Older versions produce errors, but newer versions are fine.

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
npm run bundle-report       | Build and run webpack-bundle-analyzer over stats json
npm run release:minor       | Create a new minor release using standard-version
npm run release:major       | Create a new major release using standard-version
npm run ci                  | Execute linter, tests and production builds
npm run deploy              | Build the app and deploy it to firebase hosting

## Bugs and feature requests

Have a bug or a feature request? Please first read the [issue guidelines](https://github.com/Ismaestro/angular7-example-app/blob/master/CONTRIBUTING.md) and search for existing and closed issues. If your problem or idea is not addressed yet, [please open a new issue](https://github.com/Ismaestro/angular7-example-app/issues/new).

## Contributing

Please read through our [contributing guidelines](https://github.com/Ismaestro/angular7-example-app/blob/master/CONTRIBUTING.md). Included are directions for opening issues, coding standards, and notes on development.

Moreover, all HTML and CSS should conform to the [Code Guide](https://github.com/mdo/code-guide), maintained by [Ismael Ramos](https://github.com/ismaestro).

Editor preferences are available in the [editor config](https://github.com/Ismaestro/angular7-example-app/blob/master/.editorconfig) for easy use in common text editors. Read more and download plugins at <https://editorconfig.org/>.

## Creators

**Ismael Ramos**

- <https://github.com/ismaestro>

<a href='https://ko-fi.com/S6S5LMVR' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://az743702.vo.msecnd.net/cdn/kofi4.png?v=0' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>

## Thanks

Thanks to all contributors and their support.

If you have an idea or you want to do something, tell me or just do it!
I'm always happy to hear your feedback!

## Copyright and license

Code and documentation copyright 2018 the authors. Code released under the [MIT License](https://github.com/Ismaestro/angular7-example-app/blob/master/LICENSE).

Enjoy :metal:
