export interface ICard {
  cardholderName: string;
  totalSpend: number;
  avgTransactionAmount: number;
  categories: any;
}

export interface ITransaction {
  id: string;
  date: string;
  time: string;
  amount: number;
  created: number;
  category: string;
  merchantName: string | null;
  type: string;
}

export interface IAuthorization {
  id: string;
  date: string;
  time: string;
  amount: number;
  created: number;
  approved: boolean;
  category: string;
  merchantName: string | null;
  type: string;
}

export type NextAuthorization = string | undefined;

export interface IAuthorizationsTransactions {
  data: IAuthorization[] | ITransaction[];
  nextAuthorization: NextAuthorization;
}

export interface IParams {
  limit: number;
  authorizationCreated?: string;
}
