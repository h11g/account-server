import { Service } from 'egg';

const selectUserKey = { created: 0, updated: 0, __v: 0 };

export default class AccountGroupService extends Service {
  public async createDefaultAccountGroup() {
    const { ctx } = this;
    await ctx.model.AccountGroup.create([
      {
        name: '资金账户',
        account_type: [
          { name: '现金', id: 'cash' },
          { name: '银行卡', id: 'bank card' },
          { name: '其他', id: 'other' },
        ],
      },
      {
        name: '虚拟账户',
        account_type: [
          { name: '支付宝钱包', id: 'alipay' },
          { name: '微信钱包', id: 'wechat pay' },
          { name: '其他', id: 'other' },
        ],
      },
      {
        name: '信用账户',
        account_type: [
          { name: '信用卡', id: 'credit card' },
          { name: '花呗', id: 'huabei' },
          { name: '借入', id: 'borrowed' },
          { name: '其他信用卡', id: 'other' },
        ],
      },
      {
        name: '投资账户',
        account_type: [
          { name: '股票', id: 'stock' },
          { name: '基金', id: 'foud' },
          { name: '其他理财', id: 'other' },
        ],
      },
      {
        name: '债权账户',
        sign: 1,
        account_type: [
          { name: '借出', id: 'lend' },
        ],
      },
    ]);
  }

  public async queryAccountGroups() {
    const { ctx } = this;
    return ctx.model.AccountGroup.find({}, selectUserKey).exec();
  }
}
