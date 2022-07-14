import express from "express";
import { getAuthorizationsAndTransactions } from "./controller";

const authorizationsTransactionsRouter = express.Router();

authorizationsTransactionsRouter.get(
  "/authorizations-transactions",
  getAuthorizationsAndTransactions
);

export default authorizationsTransactionsRouter;
