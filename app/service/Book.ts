import { Service } from 'egg';

const selectUserKey = { created: 0, updated: 0 };

export default class BookService extends Service {
  public async createDefaultBook(user: any) {
    const { ctx } = this;
    await ctx.model.Book.create({
      name: '日常生活',
      type: BookType.daily,
      user_id: user._id,
    });
  }

  /**
   * 根据用户 id 获取用户所有账本
   * @param id 用户 id
   * @return {Promise[books]} 账本
   */
  public async queryBooksByUserId(id: string) {
    const { ctx } = this;
    const query = { _id: { $in: id } };
    return ctx.model.Book.find(query, selectUserKey);
  }
}
