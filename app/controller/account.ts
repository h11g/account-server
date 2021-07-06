import { Controller } from 'egg';

export default class AccountController extends Controller {
  async getAccounts() {
    const { ctx } = this;
    const body = ctx.request.body;
    const { book_id } = body;

    if (!book_id) {
      ctx.generateResponse({ msg: '缺少参数', status: false });
      return;
    }

    let accounts = await ctx.service.account.queryAccountsByBookId(book_id);

    if (accounts.length === 0) {
      await ctx.service.account.createDefaultAccounts(book_id);
      accounts = await ctx.service.account.queryAccountsByBookId(book_id);
    }

    ctx.generateResponse({ data: accounts });
  }

  async createAccount() {
    const { ctx } = this;
    const { name, type, group, book_id, balance } = ctx.request.body;

    if (!name || !type || !group || !book_id) {
      ctx.generateResponse({ msg: '缺少参数', status: false });
      return;
    }

    await ctx.service.account.addAccount(name, type, group, book_id, balance);
    const accounts = await ctx.service.account.queryAccountsByBookId(book_id);
    ctx.generateResponse({ data: accounts });
  }

  async updateAccount() {
    const { ctx } = this;
    const { name, id, type, balance } = ctx.request.body;
    if (!name) {
      ctx.generateResponse({ msg: '账户名不能为空', status: false });
      return;
    }

    await ctx.service.account.updateAccount(id, name, type, balance);
    ctx.generateResponse({});
  }

  async deleteAccount() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    if (!id) {
      ctx.generateResponse({ msg: '缺少参数', status: false });
      return;
    }

    await ctx.service.account.deleteAccountById(id);
    ctx.generateResponse({});
  }

  async getAccountGroups() {
    const { ctx } = this;
    let accountGroups = await ctx.service.accountGroup.queryAccountGroups();

    if (accountGroups.length === 0) {
      await ctx.service.accountGroup.createDefaultAccountGroup();
      accountGroups = await ctx.service.accountGroup.queryAccountGroups();
    }

    ctx.generateResponse({ data: accountGroups });
  }
}
