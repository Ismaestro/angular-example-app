<p align="center">
  <a href="https://angular.io/">
    <img src="https://www.angularexampleapp.com/assets/images/angular.svg" alt="Logo" width=72 height=72>
  </a>

  <h3 align="center">Angular Example App</h3>

  <p align="center">
    Example app with Angular 7 + Angular CLI + Angular Material + Firebase
    <br>
    Base project made with much  :heart: . Contains CRUD, patterns, generated library, and much more!
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

- [Quick start](#quick-start)
- [Status](#status)
- [What's included](#whats-included)
- [Bugs and feature requests](#bugs-and-feature-requests)
- [Contributing](#contributing)
- [Creators](#creators)
- [Thanks](#thanks)
- [Copyright and license](#copyright-and-license)

## Quick start

**Warning**

> Verify that you are running at least node 8.9.x and npm 5.x.x by running node -v and npm -v in a terminal/console window. Older versions produce errors, but newer versions are fine.

1. Go to project folder and install dependencies.
 ```bash
 npm i
 ```

2. Launch development server:
 ```bash
 npm start
 ```

**Note**

> You don't need to build the example library because it's published in npm and added as dependency of the project.

## Status

![travis](https://travis-ci.org/Ismaestro/angular7-example-app.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/Ismaestro/angular7-example-app/badge.svg?branch=master)](https://coveralls.io/github/Ismaestro/angular7-example-app?branch=master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/9d190a60fc864060ac054ba17a4e92e4)](https://www.codacy.com/app/Ismaestro/angular7-example-app?utm_source=github.com&utm_medium=referral&utm_content=Ismaestro/angular7-example-app&utm_campaign=badger)
[![Known Vulnerabilities](https://snyk.io/test/github/ismaestro/angular7-example-app/badge.svg)](https://snyk.io/test/github/ismaestro/angular7-example-app)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![dependency Status](https://david-dm.org/ismaestro/angular7-example-app.svg)](https://david-dm.org/ismaestro/angular7-example-app#info=dependencies)
[![devDependency Status](https://david-dm.org/ismaestro/angular7-example-app/dev-status.svg)](https://david-dm.org/ismaestro/angular7-example-app#info=devDependencies)
[![peerDependencies Status](https://david-dm.org/ismaestro/angular7-example-app/peer-status.svg)](https://david-dm.org/ismaestro/angular7-example-app?type=peer)
[![npm](https://img.shields.io/badge/demo-online-brightgreen.svg)](http://angularexampleapp.com/)

[![GitHub stars](https://img.shields.io/github/stars/ismaestro/angular7-example-app.svg?style=social&label=Star)](https://github.com/ismaestro/angular7-example-app)
[![GitHub forks](https://img.shields.io/github/forks/ismaestro/angular7-example-app.svg?style=social&label=Fork)](https://github.com/ismaestro/angular7-example-app/fork)

## What's included

* CRUD: create, update and remove heroes with Firebase!
* Search bar, to look for heroes
* Custom loading page
* Modal and toasts (snakbar)!
* Internationalization with ng-translate and ngx-translate-extract. Also use cache busting for translation files with [webpack translate loader](https://github.com/ngx-translate/http-loader#angular-cliwebpack-translateloader-example)
* Automatic translate script with Google Translate oO
* Lazy loading modules
* Service Workers
* Dynamic Imports
* Storage module (ngx-store)
* More logical structure directory (from [here](https://itnext.io/choosing-a-highly-scalable-folder-structure-in-angular-d987de65ec7))
* Basic example library
* Scroll restoration and anchor examples
* Responsive layout (flex layout module)
* SASS (most common used functions and mixins) and BEM styles
* Animations!
* Angular Pipes
* Interceptors and Events (Progress bar active, if a request is pending)
* Scroll to first invalid input in forms. ([ngx-scroll-to-first-invalid](https://github.com/Ismaestro/ngx-scroll-to-first-invalid))
* Autocomplete enabled in forms
* Modernizr (browser features detection)
* Browser filter (Bowser) for IE ^^
* [Sentry](https://sentry.io)! (logs any error in the app)
* Google Tag Manager
* Unit tests with Jasmine and Karma including code coverage (Use of [ng-bullet](https://www.npmjs.com/package/ng-bullet) and [karma-mocha-reporter](https://github.com/litixsoft/karma-mocha-reporter))
* End-to-end tests with Protractor
* ES6 Promises and Observables
* Following the [best practices](https://angular.io/guide/styleguide)!

Tasks                      | Description
---------------------------|---------------------------------------------------------------------------------------
npm i                      | Install dependencies
npm start                  | Start the app in development mode
npm run test               | Run all unit tests with karma and jasmine
npm run test:app:watch     | Run app unit tests and wait for changes
npm run test:library:watch | Run app unit tests and wait for changes
npm run e2e                | Run end to end tests with protractor
npm run build              | Build the app for production
npm run build:library      | Build the library
npm run lint               | Run the linter (tslint)
npm run ci                 | Execute linter and tests
npm run extract            | Generate all json files with the translations in assets folder
npm run translate          | Translate all keys remaining using Google Translate and using English language as the origin
npm run deploy             | Build the app and deploy it to firebase hosting
npm run bundle-report      | Build and run webpack-bundle-analyzer over stats json
npm run release            | Create a new release using standard-version
npm run docker             | Build the docker image and run the container
npm run update             | Update the project dependencies with ng update

### Firebase

This repo is using Firebase. We use Cloud Firestore and Cloud Storage to handle CRUD operations over the heroes and to store their images.


### Docker

You can build the image and run the container with Docker. The configuration is in the nginx folder if you want to change it.

`docker build -t angularexampleapp .`

`docker run -d -p 4200:80 angularexampleapp`

### Travis CI

We use Travis CI to run this tasks in order:
* Linter
* Tests
* Build for production

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

Thanks to all contributors and their support:

[mansya](https://github.com/mansya) - App logo!

If you have an idea or you want to do something, tell me or just do it!
I'm always happy to hear your feedback!

## Copyright and license

Code and documentation copyright 2018 the authors. Code released under the [MIT License](https://github.com/Ismaestro/angular7-example-app/blob/master/LICENSE).

Enjoy :metal:
