import { Request, Response } from "express";
import Stripe from "stripe";
import "dotenv/config";

import {
  formatAuthorizationsData,
  formatTransactionsData,
} from "../../helpers";

const CARD_ID = process.env.CARD_ID;
const STRIPE_KEY = process.env.STRIPE_KEY;
const stripe = new Stripe(STRIPE_KEY!, {
  apiVersion: "2020-08-27",
  typescript: true,
});

export const getAuthorizationsAndTransactions = async (
  req: Request,
  res: Response
) => {
  const limit = Number(req.query.limit);
  const authorizationCreated = String(req.query.authorization_created);

  const stripeAuthorizationsParams: Stripe.Issuing.AuthorizationListParams = {
    card: CARD_ID!,
    limit: limit || 5,
    starting_after:
      authorizationCreated === "undefined" ? undefined : authorizationCreated,
  };

  try {
    const authorizations = await stripe.issuing.authorizations.list(
      stripeAuthorizationsParams
    );

    const transactionsFromAuthorizations = (await Promise.all(
      authorizations.data.map(async (authorization) => {
        const { transactions } = authorization;
        if (transactions.length > 0) {
          try {
            const { id } = transactions[0];
            const transaction = await stripe.issuing.transactions.retrieve(id);
            if (transaction !== null) {
              return transaction;
            }
          } catch (error) {
            res.status(500).json(error);
          }
        }
      })
    )) as Stripe.Issuing.Transaction[];

    const transactions = transactionsFromAuthorizations.filter(
      (item) => item !== undefined
    );
    const declinedAuthorizations = authorizations.data.filter(
      (item) => !item.approved
    );

    //format data
    const authorizationsData = formatAuthorizationsData(declinedAuthorizations);
    const transactionsData = formatTransactionsData(transactions);

    //sort by descending date and combine data
    const combined = [...transactionsData, ...authorizationsData].sort(
      (itemA, itemB) => +new Date(itemB.date) - +new Date(itemA.date)
    );

    //next authorization created for next call
    const lastAuthorization = [...authorizations.data].pop();

    res.status(200).json({
      data: combined,
      nextAuthorization: lastAuthorization?.id,
    });
  } catch (error: any) {
    res.status(500).json(error);
  }
};
