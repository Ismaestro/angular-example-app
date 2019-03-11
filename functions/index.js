const functions = require('firebase-functions');
require('zone.js/dist/zone-node');
require('reflect-metadata');

const core = require('@angular/core');
const expressengine = require('@nguniversal/express-engine');
const modulemapngfactoryloader = require('@nguniversal/module-map-ngfactory-loader');

const express = require('express');
const path = require('path');

// Faster server renders w/ Prod mode (dev mode never needed)
core.enableProdMode();

// Express server
const app = express();

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = path.join(process.cwd(), 'dist');

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('./dist/server/main');

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', expressengine.ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    modulemapngfactoryloader.provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', path.join(DIST_FOLDER, 'browser'));

// Server static files from /browser
app.get('.', express.static(path.join(DIST_FOLDER, 'browser'), {
  maxAge: '1y'
}));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', {req});
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on port ${PORT}`);
});
exports.ssr = functions.https.onRequest(app);

