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
  DEBTS = 4
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

  public async addAccount(name: string, type: number, group: number, book_id: string) {
    const { ctx } = this;
    await ctx.model.Account.create({
      name,
      type,
      book_id,
      group,
    });
  }

  public async updateAccount(account_id: string, name: string) {
    const { ctx } = this;
    await ctx.model.Account.findByIdAndUpdate(account_id, {
      $set: {
        name,
      },
    });
  }

  public async deleteAccountById(account_id: string) {
    const { ctx } = this;
    await ctx.model.Account.findByIdAndRemove(account_id);
  }
}
