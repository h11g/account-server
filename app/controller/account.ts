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
}
