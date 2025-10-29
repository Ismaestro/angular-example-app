import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import path from 'node:path';

const { resolve } = path;

const serverDistributionFolder = import.meta.dirname;
const browserDistributionFolder = resolve(serverDistributionFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/**', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistributionFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
// eslint-disable-next-line @typescript-eslint/max-params
app.use('/**', (request, response_, next) => {
  angularApp
    .handle(request)
    .then(async (response) =>
      // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression,promise/no-callback-in-promise
      response ? writeResponseToNodeResponse(response, response_) : next(),
    )
    // eslint-disable-next-line promise/no-callback-in-promise
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] ?? 4000;
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
// eslint-disable-next-line unicorn/prevent-abbreviations
export const reqHandler = createNodeRequestHandler(app);
