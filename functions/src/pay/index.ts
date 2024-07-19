import {Response} from 'express';
import * as logger from 'firebase-functions/logger';
import {Request} from 'firebase-functions/v2/https';
import Stripe from 'stripe';
export const payRequest = async (
  request: Request,
  response: Response,
  client: Stripe,
  publishablekey: string,
) => {
  logger.info('payRequest function logs', {structuredData: true});
  try {
    // Getting data from client
    const {total} = request.body;
    // Simple validation
    if (!total) {
      return response.status(400).json({message: 'Invalid data'});
    }

    // Initiate payment
    const paymentIntent = await client.paymentIntents.create({
      amount: total,
      currency: 'USD',
      payment_method_types: ['card'],
    });
    // Extracting the client secret
    const clientSecret = paymentIntent.client_secret;
    // Sending the client secret as response
    response.json({message: 'Payment initiated', clientSecret});
  } catch (err) {
    // Catch any error and send error 500 to client
    console.error(err);
    response.status(500).json({message: 'Internal Server Error'});
  }
};
