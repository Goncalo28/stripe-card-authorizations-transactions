import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../constants";
import { IAuthorizationsTransactions, ICard, IParams } from "../../types";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getCardDetails: builder.query<ICard, void>({
      query: () => "/card",
    }),
    getAuthorizationsTransactions: builder.query<
      IAuthorizationsTransactions,
      IParams
    >({
      query: ({ limit, authorizationCreated }) =>
        `/authorizations-transactions?limit=${limit}&authorization_created=${authorizationCreated}`,
    }),
  }),
});

export const { useGetCardDetailsQuery, useGetAuthorizationsTransactionsQuery } =
  api;
