import { Controller } from 'egg';
import * as _ from 'lodash';
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
    const { name, type, group, book_id } = ctx.request.body;

    if (!name || _.isNil(type) || _.isNil(group)) {
      ctx.generateResponse({ msg: '缺少参数', status: false });
      return;
    }

    await ctx.service.account.addAccount(name, type, group, book_id);
    const accounts = await ctx.service.account.queryAccountsByBookId(book_id);
    ctx.generateResponse({ data: accounts });
  }

  async updateAccount() {
    const { ctx } = this;
    const { name, id } = ctx;
    if (!name) {
      ctx.generateResponse({ msg: '缺少参数', status: false });
      return;
    }

    await ctx.service.account.updateAccount(id, name);
    ctx.generateResponse({});
  }
}
