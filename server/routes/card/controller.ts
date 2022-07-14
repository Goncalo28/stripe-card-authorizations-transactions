import { Request, Response } from "express";
import Stripe from "stripe";
import "dotenv/config";

const CARD_ID = process.env.CARD_ID;
const STRIPE_KEY = process.env.STRIPE_KEY;
const stripe = new Stripe(STRIPE_KEY!, {
  apiVersion: "2020-08-27",
  typescript: true,
});

export const getCardDetails = async (_req: Request, res: Response) => {
  try {
    const card: Stripe.Issuing.Card = await stripe.issuing.cards.retrieve(
      CARD_ID!
    );

    const {
      cardholder: { name },
      metadata: { total_transactions, total_spend, categories },
    } = card;

    const parsedCategories = JSON.parse(categories);
    const totalSpend = +Math.abs(+total_spend / 100).toFixed(2);
    const avgTransactionAmount = +(
      Math.round((totalSpend / +total_transactions) * 100) / 100
    ).toFixed(2);

    const cardDetails = {
      cardholderName: name,
      totalSpend,
      avgTransactionAmount,
      categories: parsedCategories,
    };

    return res.status(200).json(cardDetails);
  } catch (err: any) {
    return res.status(500).json(err);
  }
};
