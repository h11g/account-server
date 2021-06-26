import { Service } from 'egg';

enum BookType {
  DAILY = 1,
  TRAVEL = 2
}

const selectUserKey = { name: 1, type: 1, _id: 1 };

export default class BookService extends Service {
  public async createDefaultBook(_id: string) {
    const { ctx } = this;
    await ctx.model.Book.create({
      name: '默认账本',
      type: BookType.DAILY,
      user_id: _id,
    });
  }

  /**
   * 根据用户 id 获取用户所有账本
   * @param id 用户 id
   * @return {Promise[books]} 账本
   */
  public async queryBooksByUserId(id: string) {
    const { ctx } = this;
    const query = { user_id: { $in: id } };
    return ctx.model.Book.find(query, selectUserKey).exec();
  }
}
