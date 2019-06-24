import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import {enableProdMode} from '@angular/core';
import * as express from 'express';
import * as helmet from 'helmet';
import {join} from 'path';
import {ngExpressEngine} from '@nguniversal/express-engine';
import {provideModuleMap} from '@nguniversal/module-map-ngfactory-loader';

enableProdMode();

// Because of this https://github.com/angular/angular/issues/18199#issue-243593688
(global as any).XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const app = express();

app.use(helmet());
app.use(helmet.referrerPolicy({policy: 'same-origin'}));
app.use(helmet.noCache());
app.use(helmet.featurePolicy({
  features: {
    fullscreen: ['\'self\''],
    payment: ['\'none\''],
    syncXhr: ['\'none\'']
  }
}));

const defaultList = ['\'self\'',
  'https://angularexampleapp.com',
  'http://*.google-analytics.com',
  'https://*.google.com',
  'https://*.google-analytics.com',
  'https://*.googletagmanager.com',
  'https://*.gstatic.com',
  'https://*.googleapis.com',
  'https://authedmine.com',
  'https://az743702.vo.msecnd.net',
  'https://sentry.io',
  'ws://localhost:4200',
];

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: defaultList,
    styleSrc: [
      '\'self\'', '\'unsafe-inline\'',
      'https://*.googleapis.com'
    ],
    scriptSrc: [
      '\'self\'',
      'http://*.googletagmanager.com',
      'https://*.google-analytics.com'
    ]
  }
}));

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');
const routes = [
  {path: '/es/*', view: 'es/index', bundle: require('./server/es/main')},
  {path: '/*', view: 'index', bundle: require('./server/en/main')}
];

// Load your engine
app.engine('html', (filePath, options, callback) => {
  options.engine(
    filePath,
    {req: options.req, res: options.res},
    callback
  );
});

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));
routes.forEach((route) => {
  app.get(route.path, (req, res) => {
    res.render(route.view, {
      req, res, engine: ngExpressEngine({
        bootstrap: route.bundle.AppServerModuleNgFactory,
        providers: [provideModuleMap(route.bundle.LAZY_MODULE_MAP)]
      })
    });
  });
});

app.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`);
});
