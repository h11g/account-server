import { Controller } from 'egg';


export default class BookController extends Controller {
  async getBooks() {
    const { ctx } = this;
    const user = await ctx.getUser();
    let books: any = await ctx.service.book.queryBooksByUserId(user._id);

    if (books.length === 0) {
      await ctx.service.book.createDefaultBook(user._id);
      books = await ctx.service.book.queryBooksByUserId(user._id);
    }

    ctx.generateResponse({ data: books });
  }
}
