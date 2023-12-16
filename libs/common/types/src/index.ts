export type User = {
  id: number;
  name: string;
  email: string;
};

export type Currency = {
  id: number;
  name: string;
  symbol: string;
  code: string;
}

export type Wallet = {
  id: number;
  userId: number;
  name: string;
  currency: Currency;
  createdAt: Date;
  updatedAt: Date;
}

export type Category = {
  id: number;
  userId: number;
  name: string;
  type: CategoryTypes;
  createdAt: Date;
  updatedAt: Date;
}

export enum CategoryTypes {
  Expense = 'expense',
  Income = 'income',
}
