# Example app with Angular 5 + Angular CLI + Angular Material + Docker + Angular Example Library

> ### Base project made with much  :heart: . Contains CRUD, official style guide, patterns, custom library, etc.

![travis](https://travis-ci.org/Ismaestro/angular5-example-app.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/Ismaestro/angular5-example-app/badge.svg?branch=master)](https://coveralls.io/github/Ismaestro/angular5-example-app?branch=master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/9d190a60fc864060ac054ba17a4e92e4)](https://www.codacy.com/app/Ismaestro/angular5-example-app?utm_source=github.com&utm_medium=referral&utm_content=Ismaestro/angular5-example-app&utm_campaign=badger)
[![Known Vulnerabilities](https://snyk.io/test/github/ismaestro/angular5-example-app/badge.svg)](https://snyk.io/test/github/ismaestro/angular5-example-app)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

[![dependency Status](https://david-dm.org/ismaestro/angular5-example-app.svg)](https://david-dm.org/ismaestro/angular5-example-app#info=dependencies)
[![devDependency Status](https://david-dm.org/ismaestro/angular5-example-app/dev-status.svg)](https://david-dm.org/ismaestro/angular5-example-app#info=devDependencies)
[![peerDependencies Status](https://david-dm.org/ismaestro/angular5-example-app/peer-status.svg)](https://david-dm.org/ismaestro/angular5-example-app?type=peer)

[![npm](https://img.shields.io/badge/demo-online-brightgreen.svg)](http://angularexampleapp.com/)
[![Join the chat at https://gitter.im/angular5-example-app/Lobby](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/angular5-example-app/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![GitHub forks](https://img.shields.io/github/forks/ismaestro/angular5-example-app.svg?style=social&label=Fork)](https://github.com/ismaestro/angular5-example-app/fork)
[![GitHub stars](https://img.shields.io/github/stars/ismaestro/angular5-example-app.svg?style=social&label=Star)](https://github.com/ismaestro/angular5-example-app)

### DEMO

Live DEMO [here](http://angularexampleapp.com/)!

[![angular-example-app](http://thumbsnap.com/i/aIpN07i3.png?0812)](http://angularexampleapp.com/)

## Usage

**Warning: we strongly recommend node >=v6.9.0 and npm >=3.0.0**

`npm i` - Installs everything needed

`npm start` - Starts the app. Then, go to `localhost:4200`

`npm run test` - Runs unit tests with karma and jasmine

`npm run e2e` - Runs end to end tests

`npm run e2e:home` - Runs end to end tests only for the home directory. There are more commands like this one, for development purposes

`npm run build` - Builds the app for production

`npm run lint` - Runs the linter (tslint)

`npm run ci` - Executes linter and tests

`npm run deploy` - Builds the app and deploy it to Github pages (angular-cli-ghpages) (fork to do this and remove CNAME file)

`npm run sme` - Builds and runs source map explorer, really cool :)

`npm run release` - Creates a new release using standard-version

`npm run docker` - Builds the docker image and run the container

**Windows: use precompilation to speed up**

`tsc --project tsconfig.json`
`npm start`

## Features
* Responsive layout (flex layout module)
* Internationalization
* Lazy loading modules
* Interceptors and Events (Progress bar active, if a request is pending)
* CRUD: create, update and remove heroes
* Custom example library
* Search bar, to look for heroes
* Custom loading page
* Modal and toasts (snakbar)!
* Unit tests with Jasmine and Karma including code coverage
* End-to-end tests with Protractor
* ES6 Promises
* Github pages deploy ready
* Google Tag Manager
* Modernizr (browser features detection)
* Following the [best practices](https://angular.io/guide/styleguide)!

## Docker

You can build the image and run the container with Docker. The configuration is in the nginx folder if you want to change it.

`docker build -t angularexampleapp .`

`docker run -d -p 4200:80 angularexampleapp`

## Do you want to create your own library with Angular?

This project is using an example library in angular, which you can check it [here](https://github.com/Ismaestro/angular-example-library).

This library contains a sample module, component, pipe, directive, all with tests, AOT compilation and an Angular-CLI playground too.

You can see how to use it, or develop a new one in the repository. Any doubts, please submit an issue or make a pull request.

## Travis CI
We use Travis CI to run this tasks in order:
* Linter
* Tests
* Build for production
* Deploy in Github pages
:)

## Contributing
- Please see the CONTRIBUTING file for guidelines.
- Create **pull requests, submit bugs, suggest new features** or documentation updates :wrench:

## Server

This repo is using an API which is [a minimal app](https://github.com/Ismaestro/nodejs-example-app) in NodeJS deployed on Heroku and using PostGreSQL, to create, modify and delete heroes.

## Contributors

Thanks to all contributors and their support!

## License

MIT

Enjoy :metal:

We are always happy to hear your feedback!
