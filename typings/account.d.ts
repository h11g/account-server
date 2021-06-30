declare interface Account {
  name: string;
  book_id: string;
  balance: number;
  group: string;
  _id: string;
}

declare interface AccountGroup {
  name: string;
  _id: string;
  account_type: AccountType[];
}

declare interface AccountType {
  name: string;
  id: string;
}
