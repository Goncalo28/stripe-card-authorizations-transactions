import express from "express";
import Stripe from "stripe";
import "dotenv/config";

const STRIPE_KEY = process.env.STRIPE_KEY;
const stripe = new Stripe(STRIPE_KEY!, {
  apiVersion: "2020-08-27",
  typescript: true,
});

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET!;

const stripeWebhookRouter = express.Router();

stripeWebhookRouter.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (req: express.Request, res: express.Response): void => {
    const sig: any = req.headers["stripe-signature"];

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, WEBHOOK_SECRET);
    } catch (err: any) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    if (event.type === "issuing_transaction.created") {
      const stripeObject = event.data as Stripe.Issuing.Transaction;
      console.log(`issuing_transaction status: ${stripeObject}`);
    } else if (event.type === "issuing_authorization.created") {
      const stripeObject = event.data.object as Stripe.Issuing.Authorization;
      console.log(`issuing_authorization.created: ${stripeObject}`);
    } else if (event.type === "issuing_card.updated") {
      const stripeObject = event.data.object as Stripe.Issuing.Card;
      console.log(`issuing_card.updated: ${stripeObject}`);
    } else {
      console.warn(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  }
);

export default stripeWebhookRouter;
