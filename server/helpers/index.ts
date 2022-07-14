import Stripe from "stripe";

export const formatTransactionsData = (data: Stripe.Issuing.Transaction[]) => {
  const newData = data?.map((transaction) => {
    const { id, amount, created, merchant_data, object } = transaction;

    const formattedDate = new Date(created * 1000).toLocaleString();
    const date = formattedDate.split(", ")[0];
    const time = formattedDate.split(", ")[1];

    return {
      id,
      date,
      time,
      created,
      amount: +Math.abs(+amount / 100).toFixed(2),
      category: merchant_data.category,
      merchantName: merchant_data.name,
      type: object,
    };
  });

  return newData;
};

export const formatAuthorizationsData = (
  data: Stripe.Issuing.Authorization[]
) => {
  const newData = data?.map((authorization) => {
    const { id, amount, approved, created, merchant_data, object } =
      authorization;

    const formattedDate = new Date(created * 1000).toLocaleString();
    const date = formattedDate.split(", ")[0];
    const time = formattedDate.split(", ")[1];

    return {
      id,
      date,
      created,
      time,
      amount: +(amount / 100).toFixed(2),
      approved,
      category: merchant_data.category,
      merchantName: merchant_data.name,
      type: object,
    };
  });

  return newData;
};
