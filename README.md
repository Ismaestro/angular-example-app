<p align="center">
  <h3 align="center">Angular Example App</h3>

  <p align="center">
    Example app with Angular + Angular CLI + Angular Universal + i18n + Graphql
    <br>
    <br>
    :clap::clap::tada::tada::tada::tada::clap::clap:
    <br>
    <br>
    Base project made with much :heart:. Contains CRUD, advanced patterns, generated library, and much more!
    I'm rebuilding the project to add some new cool features like GraphQL. Also, I've been a father a few days ago so please be patient if something doesn't work properly, and feel free to contribute to the project. I will accept MR if they make sense.
    <br>
    <br>
    <img src="https://media.giphy.com/media/BIql9p3KQWYdjq4Sxe/giphy.gif" alt="Demo example"/>
    <br>
    <br>
    <a href="https://github.com/Ismaestro/angular-example-app/issues/new">Report bug</a>
    ·
    <a href="https://github.com/Ismaestro/angular-example-app/issues/new">Request feature</a>
  </p>
</p>

**WARNING: VERY IMPORTANT**
> You will need to install node 14 and docker before trying to run this example app.

## Status

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Ismaestro_angular8-example-app&metric=alert_status)](https://sonarcloud.io/dashboard?id=Ismaestro_angular8-example-app)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=Ismaestro_angular8-example-app&metric=coverage)](https://sonarcloud.io/dashboard?id=Ismaestro_angular8-example-app)
[![GitHub stars](https://img.shields.io/github/stars/ismaestro/angular8-example-app.svg?style=social&label=Star)](https://github.com/ismaestro/angular8-example-app)
[![GitHub forks](https://img.shields.io/github/forks/ismaestro/angular8-example-app.svg?style=social&label=Fork)](https://github.com/ismaestro/angular8-example-app/fork)

## Setup

```bash
npm i
npm start
```

## Backend

This project is using a real app deployed in heroku, which is maintained in [here](https://github.com/Ismaestro/nestjs-example-app).
The server is using NesjJS, Prisma, Postgres and GraphQL. Please check it out and feel free also to contribute or give me your thoughts.

## What's included

- [x] CRUD: create, update and remove heroes with this project!
- [x] Angular Universal (SSR)
- [x] Use of StateTransferModule to share state between browser and server
- [x] Security Headers using [helmet](https://helmetjs.github.io).
- [x] Internationalization with the official i18n. Separated builds for english and spanish.
- [x] Lazy loading modules
- [x] Service Workers enabled!
- [x] More logical directory structure
- [x] Basic example library
- [x] Following the [best practices](https://angular.io/guide/styleguide)!
- [x] Search bar, to look for heroes
- [x] Custom loading page
- [x] Example of Angular Resolver for Hero Detail
- [x] Lazy loading images with [ng-lazyload-image](https://github.com/tjoskar/ng-lazyload-image)
- [x] Modal and toasts (snakbar)!
- [x] Scroll restoration and anchor examples
- [x] Responsive layout (flex layout module)
- [x] SASS (most common used functions and mixins) and BEM styles
- [x] Animations with [ng-animate](https://jiayihu.github.io/ng-animate/)
- [x] Angular Pipes
- [x] Interceptors and Events
- [x] Auth guard for some routes
- [x] Scroll to first invalid input in forms.
  ([ngx-scroll-to-first-invalid](https://github.com/Ismaestro/ngx-scroll-to-first-invalid))
- [x] Modernizr (browser features detection)
- [x] Browser filter (Bowser) because of IE ^^
- [x] [Sentry](https://sentry.io)! (logs every error in the app)
- [x] Google Tag Manager
- [x] ES6 Promises and Observables
- [x] End-to-end tests with Protractor, (moving to Cypress)

### Angular Universal and i18n

This project is using Angular Universal with the official internationalization. You can navigate
through every language and reload (and share) every page in the application without losing context.
This is very useful for SEO purposes and you almost have a ready for production app. If you want to
translate the messages you can use this awesome tool,
[Tiny Translator](https://martinroob.github.io/tiny-translator/en/#/translate) or follow
[this tutorial](https://github.com/martinroob/ngx-i18nsupport/wiki/Tutorial-for-using-xliffmerge-with-angular-cli).

I've created a medium post where you can find a tutorial to apply this concepts to your own project.
[Check it here](https://medium.com/@ismaestro/angular-7-example-app-with-angularcli-angular-universal-i18n-official-firebase-66deac2dc31e),
and let me know what do you think.

## Bugs and feature requests

Have a bug or a feature request? Please first read the
[issue guidelines](https://github.com/Ismaestro/angular-example-app/blob/master/CONTRIBUTING.md)
and search for existing and closed issues. If your problem or idea is not addressed yet,
[please open a new issue](https://github.com/Ismaestro/angular-example-app/issues/new).

## Creators

**Ismael Ramos**

- <https://github.com/ismaestro>

## Thanks

Thanks to all contributors and their support.

If you have an idea or you want to do something, tell me or just do it! I'm always happy to hear
your feedback!

## Copyright and license

Code and documentation copyright 2021 the authors. Code released under the
[MIT License](https://github.com/Ismaestro/angular-example-app/blob/master/LICENSE).

Enjoy :metal:
