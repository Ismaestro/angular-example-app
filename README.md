# Example app with Angular 6 + Angular CLI + Angular Material + Docker + Angular Example Library

> ### Base project made with much  :heart: . Contains CRUD, patterns, generated library, etc.

![travis](https://travis-ci.org/Ismaestro/angular6-example-app.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/Ismaestro/angular6-example-app/badge.svg?branch=master)](https://coveralls.io/github/Ismaestro/angular6-example-app?branch=master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/9d190a60fc864060ac054ba17a4e92e4)](https://www.codacy.com/app/Ismaestro/angular6-example-app?utm_source=github.com&utm_medium=referral&utm_content=Ismaestro/angular6-example-app&utm_campaign=badger)
[![Known Vulnerabilities](https://snyk.io/test/github/ismaestro/angular6-example-app/badge.svg)](https://snyk.io/test/github/ismaestro/angular6-example-app)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

[![dependency Status](https://david-dm.org/ismaestro/angular6-example-app.svg)](https://david-dm.org/ismaestro/angular6-example-app#info=dependencies)
[![devDependency Status](https://david-dm.org/ismaestro/angular6-example-app/dev-status.svg)](https://david-dm.org/ismaestro/angular6-example-app#info=devDependencies)
[![peerDependencies Status](https://david-dm.org/ismaestro/angular6-example-app/peer-status.svg)](https://david-dm.org/ismaestro/angular6-example-app?type=peer)

[![npm](https://img.shields.io/badge/demo-online-brightgreen.svg)](http://angularexampleapp.com/)
[![Join the chat at https://gitter.im/angular6-example-app/Lobby](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/angular6-example-app/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![GitHub forks](https://img.shields.io/github/forks/ismaestro/angular6-example-app.svg?style=social&label=Fork)](https://github.com/ismaestro/angular6-example-app/fork)
[![GitHub stars](https://img.shields.io/github/stars/ismaestro/angular6-example-app.svg?style=social&label=Star)](https://github.com/ismaestro/angular6-example-app)

## [LIVE DEMO](http://angularexampleapp.com/)

[![angular-example-app](http://thumbsnap.com/i/aIpN07i3.png?0812)](http://angularexampleapp.com/)

## Getting started

**Warning**

> Verify that you are running at least node 8.9.x and npm 5.x.x by running node -v and npm -v in a terminal/console window. Older versions produce errors, but newer versions are fine.

1. Go to project folder and install dependencies.
 ```bash
 npm install
 ```

2. Launch development server:
 ```bash
 npm start
 ```

**Note**

> You don't need to build the library because it's published in npm and added as dependency of the project.

## Usage

Tasks                    | Description
-------------------------|---------------------------------------------------------------------------------------
npm i                    | Install dependencies
npm start                | Start the app in development mode
npm run test             | Run unit tests with karma and jasmine
npm run e2e              | Run end to end tests with protractor
npm run build            | Build the app for production
npm run build:library    | Build the library
npm run lint             | Run the linter (tslint)
npm run ci               | Execute linter and tests
npm run extract          | Generate all json files with the translations in assets folder
npm run deploy           | Build the app and deploy dist folder to Github pages (angular-cli-ghpages) (fork to do this and remove CNAME file)
npm run bundle-report    | Build and run webpack-bundle-analyzer over stats json, really cool :)
npm run release          | Create a new release using standard-version
npm run docker           | Build the docker image and run the container

## Features

* CRUD: create, update and remove heroes
* Search bar, to look for heroes
* Custom loading page
* Angular Pipes
* Interceptors and Events (Progress bar active, if a request is pending)
* Modal and toasts (snakbar)!
* Responsive layout (flex layout module)
* SASS (most common used functions and mixins) and BEM styles
* Internationalization with ng-translate and ngx-translate-extract
* Lazy loading modules
* Service Workers
* Dynamic Imports
* More logical structure directory (from [here](https://itnext.io/choosing-a-highly-scalable-folder-structure-in-angular-d987de65ec7))
* Basic example library
* Modernizr (browser features detection)
* Safari polyfill for date inputs (date-input-polyfill)
* Google Tag Manager
* Github pages deploy ready
* Unit tests with Jasmine and Karma including code coverage
* End-to-end tests with Protractor
* ES6 Promises and Observables
* Following the [best practices](https://angular.io/guide/styleguide)!

## Docker

You can build the image and run the container with Docker. The configuration is in the nginx folder if you want to change it.

`docker build -t angularexampleapp .`

`docker run -d -p 4200:80 angularexampleapp`

## Travis CI

We use Travis CI to run this tasks in order:
* Linter
* Tests
* Build for production
* Deploy in Github pages

## Contributing

- Please see the CONTRIBUTING file for guidelines.
- Create **pull requests, submit bugs, suggest new features** or documentation updates :wrench:

## Server

This repo is using [a minimal app](https://github.com/Ismaestro/nodejs-example-app) in NodeJS deployed on Heroku and using PostGreSQL, to create, modify and delete heroes.

## License

MIT

## Contributors

Thanks to all contributors and their support! 
If you have an idea or you want to do something, tell me or just do it!
I'm always happy to hear your feedback!

Enjoy :metal:
