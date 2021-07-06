import { Service } from 'egg';
import * as _ from 'lodash';

const selectUserKey = { created: 0, updated: 0, __v: 0 };

export default class AccountService extends Service {
  public async createDefaultAccounts(_id: string) {
    const { ctx } = this;
    let groups: AccountGroup[] = await ctx.service.accountGroup.queryAccountGroups();
    if (groups.length === 0) {
      await ctx.service.accountGroup.createDefaultAccountGroup();
      groups = await ctx.service.accountGroup.queryAccountGroups();
    }

    const accounts = _.map(groups, group => {
      if (group.name === '资金账户') {
        return {
          name: '现金',
          type: 'cash',
          book_id: _id,
          group: group._id,
        };
      } else if (group.name === '虚拟账户') {
        return {
          name: '支付宝',
          type: 'alipay',
          book_id: _id,
          group: group._id,
        };
      }
      return null;
    }).filter(Boolean);

    await ctx.model.Account.create(accounts);
  }

  public async queryAccountsByBookId(id: string) {
    const { ctx } = this;
    const query = { book_id: { $in: id } };
    return ctx.model.Account.find(query, selectUserKey).exec();
  }

  public async addAccount(name: string, type: number, group: number, book_id: string, balance = 0) {
    const { ctx } = this;
    await ctx.model.Account.create({
      name,
      type,
      book_id,
      group,
      balance,
    });
  }

  public async updateAccount(account_id: string, name: string, type: string, balance: number) {
    const { ctx } = this;
    await ctx.model.Account.findByIdAndUpdate(account_id, {
      $set: {
        name,
        type,
        balance,
      },
    }, { omitUndefined: true });
  }

  public async deleteAccountById(account_id: string) {
    const { ctx } = this;
    await ctx.model.Account.findByIdAndRemove(account_id);
  }
}
