import * as functions from 'firebase-functions';
import app from '../../server';

export const ssr = functions.https.onRequest(app);
