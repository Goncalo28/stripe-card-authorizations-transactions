import express from "express";
import { getCardDetails } from "./controller";

const cardMetricsRouter = express.Router();

cardMetricsRouter.get("/card", getCardDetails);

export default cardMetricsRouter;
