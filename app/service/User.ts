import { Service } from 'egg';

const selectUserKey = { username: 1, email: 1, _id: 1 };

export default class User extends Service {
  public async getUserByName(username: string) {
    if (username.length === 0) {
      return null;
    }
    const { ctx } = this;
    const query = { username: { $in: username } };
    return ctx.model.User.findOne(query, selectUserKey).exec();
  }

  public async getUserByUserId(id: string) {
    const { ctx } = this;
    const query = { _id: { $in: id } };
    return ctx.model.User.findOne(query, selectUserKey).exec();
  }

  /**
   * 根据用户名获取密码
   * @param username 用户名
   * @return {Promise[user]} 返回用户
   */
  public async getPasswordByUsername(username: string) {
    const { ctx } = this;
    if (username.length === 0) {
      return null;
    }
    const query = { username: { $in: username } };
    return ctx.model.User.findOne(query).select('password').exec();
  }

  /**
   * 根据关键字获取用户列表
   * @param {Object} query 关键字
   * @return {Promise[users]} 用户列表
   */
  public async getUsersByQuery(query: any) {
    const { ctx } = this;
    return ctx.model.User.find(query, selectUserKey).exec();
  }

  public async createUser(username: string, password: string, email: string) {
    const { ctx } = this;
    await ctx.model.User.create({
      username,
      password,
      email,
    });

    return await this.getUserByName(username);
  }
}
