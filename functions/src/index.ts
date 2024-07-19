/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {Client} from '@googlemaps/google-maps-services-js';
import * as logger from 'firebase-functions/logger';
import {onRequest} from 'firebase-functions/v2/https';
import Stripe from 'stripe';
import {geocodeRequest} from './gecode';
import {payRequest} from './pay';
import {placesRequest} from './places';

const googleClient = new Client({});

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const geocode = onRequest(
  {secrets: ['GOOGLE_KEY']},
  (request, response) => {
    logger.info('Hello logs!', {structuredData: true});
    const key = `${process.env.GOOGLE_KEY}`;
    geocodeRequest(request, response, googleClient, key);
  },
);

export const placesNearBy = onRequest(
  {secrets: ['GOOGLE_KEY']},
  (request, response) => {
    const key = `${process.env.GOOGLE_KEY}`;
    placesRequest(request, response, googleClient, key);
  },
);

export const pay = onRequest(
  {secrets: ['STRIPE_TEST_KEY', 'STRIPE_TEST_PUBLIC_KEY']},
  (request, response) => {
    const stripeKey = `${process.env.STRIPE_TEST_KEY}`;
    const stripepubicKey = `${process.env.STRIPE_TEST_PUBLIC_KEY}`;
    const stripe = new Stripe(stripeKey, {apiVersion: '2024-04-10'});
    payRequest(request, response, stripe, stripepubicKey);
  },
);
