import express, { Express } from "express";
import cors from "cors";
import morgan from "morgan";

import {
  cardMetricsRouter,
  stripeWebhookRouter,
  authorizationsTransactionsRouter,
} from "./routes";

const app: Express = express();

const allowedOrigins = ["*"];
const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(corsOptions));
app.use(morgan("combined"));
app.use(stripeWebhookRouter);
app.use(express.json());
app.use(authorizationsTransactionsRouter);
app.use(cardMetricsRouter);

export default app;
