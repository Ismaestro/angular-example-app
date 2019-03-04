require('zone.js/dist/zone-node');

const functions = require('firebase-functions');
const express = require('express');
const path = require('path');
const {enableProdMode} = require('@angular/core');
const {renderModuleFactory} = require('@angular/platform-server');

const {AppServerModuleNgFactory} = require('./dist/server/main');

enableProdMode();

const index = require('fs')
  .readFileSync(path.resolve(__dirname, './dist/browser/index.html'), 'utf8')
  .toString();

let app = express();

app.get('**', function (req, res) {
  renderModuleFactory(AppServerModuleNgFactory, {
    url: req.path,
    document: index
  }).then(html => res.status(200).send(html));
});

exports.ssr = functions.https.onRequest(app);
exports.ssr = functions.https.onRequest(app);
