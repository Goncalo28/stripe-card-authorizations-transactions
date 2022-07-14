import { IAuthorizationsTransactions } from "../types";
import { API_URL } from "./constants";

export const httpGetAuthorizationTransactions = async (
  limit: number,
  authorizationId: string | undefined
): Promise<IAuthorizationsTransactions> => {
  const response = await fetch(
    `${API_URL}/authorizations-transactions?limit=${limit}&authorization_created=${authorizationId}`
  );
  const { data, nextAuthorization }: IAuthorizationsTransactions =
    await response.json();

  return { data, nextAuthorization };
};
