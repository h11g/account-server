import { Controller } from 'egg';
import * as _ from 'lodash';

export default class BookController extends Controller {
  async getBooks() {
    const { ctx } = this;
    const user = ctx.user;

    let books: any = await ctx.service.book.queryBooksByUserId(user._id);

    if (books.length === 0) {
      await ctx.service.book.createDefaultBook(user._id);
      books = await ctx.service.book.queryBooksByUserId(user._id);
    }

    ctx.generateResponse({ data: books });
  }

  async createBook() {
    const { ctx } = this;
    const { name, type } = ctx.request.body;

    if (!name || _.isNil(type)) {
      ctx.generateResponse({ msg: '缺少参数', status: false });
      return;
    }

    await ctx.service.book.addBook(name, type, ctx.user._id);
    const books = await ctx.service.book.queryBooksByUserId(ctx.user._id);
    ctx.generateResponse({ data: books });
  }

  async updateBook() {
    const { ctx } = this;
    const { name, id } = ctx.request.body;

    if (!name || !id) {
      ctx.generateResponse({ msg: '缺少参数', status: false });
      return;
    }
    await ctx.service.book.updateBookById(id, name);
    ctx.generateResponse({});
  }
}
