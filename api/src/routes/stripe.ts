import express from 'express';
import dotenv from 'dotenv';
import Stripe from 'stripe';

const stripeRoute = express.Router();
dotenv.config();

const stripeKey: string = process.env.STRIPE_KEY as string;
const stripe = new Stripe(stripeKey, {
  apiVersion: '2020-08-27'
});

stripeRoute.post('/payment', async (req, res) => {
  try {
    const charge = await stripe.charges.create({
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: 'usd'
    });
    res.status(200).json(charge);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default stripeRoute;
