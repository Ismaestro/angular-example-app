import * as functions from 'firebase-functions';
import 'firebase/firestore';

import app from '../../src/server';

export const ssr = functions.https.onRequest(app);
