const functions = require('firebase-functions');
require('zone.js/dist/zone-node');
require('reflect-metadata');

const core = require('@angular/core');
const expressengine = require('@nguniversal/express-engine');
const modulemapngfactoryloader = require('@nguniversal/module-map-ngfactory-loader');

const express = require('express');
const path = require('path');
const helmet = require('helmet');

core.enableProdMode();

const app = express();
const PORT = process.env.PORT || 4000;
const DIST_FOLDER = path.join(process.cwd(), 'dist');
const routes = [
  {path: '/es/*', view: 'es/index', bundle: require('./dist/server/es/main')},
  {path: '/*', view: 'index', bundle: require('./dist/server/en/main')}
];

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

// Load your engine
app.engine('html', (filePath, options, callback) => {
  options.engine(
    filePath,
    {req: options.req, res: options.res},
    callback
  );
});

app.set('view engine', 'html');
app.set('views', path.join(DIST_FOLDER, 'browser'));

app.get('*.*', express.static(path.join(DIST_FOLDER, 'browser')));
routes.forEach((route) => {
  app.get(route.path, (req, res) => {
    res.render(route.view, {
      req, res, engine: expressengine.ngExpressEngine({
        bootstrap: route.bundle.AppServerModuleNgFactory,
        providers: [modulemapngfactoryloader.provideModuleMap(route.bundle.LAZY_MODULE_MAP)]
      })
    });
  });
});

app.listen(PORT, () => {
  console.log(`Node Express server listening on port ${PORT}`);
});
exports.ssr = functions.https.onRequest(app);

