import { Service } from 'egg';

const selectUserKey = { created: 0, updated: 0, __v: 0 };

enum AccountType {
  OTHER = 0,
  CASH = 1,
  WECHAT = 2,
  ALIPAY = 3,
  BANK_CARD = 4,
  CREDIT_CARD = 5
}

enum AccountGroup {
  CAPITAL = 1,
  CREDIT_CARD = 2,
  INVESTING = 3,
  DEBTS = 3
}

export default class AccountService extends Service {
  public async createDefaultAccounts(_id: string) {
    const { ctx } = this;
    await ctx.model.Account.create([
      {
        name: '现金',
        type: AccountType.CASH,
        book_id: _id,
        group: AccountGroup.CAPITAL,
      },
      {
        name: '支付宝',
        type: AccountType.ALIPAY,
        book_id: _id,
        group: AccountGroup.CAPITAL,
      },
    ]);
  }

  public async queryAccountsByBookId(id: string) {
    const { ctx } = this;
    const query = { book_id: { $in: id } };
    return ctx.model.Account.find(query, selectUserKey).exec();
  }
}
