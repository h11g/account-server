import { Service } from 'egg';

// const selectUserKey = { password: 0 };

export default class User extends Service {
  public async getUsersByName(username: string) {
    if (username.length === 0) {
      return null;
    }
    const { ctx } = this;
    const query = { username: { $in: username } };
    return ctx.model.User.findOne(query).exec();
  }

  /**
   * 根据用户名获取密码
   * @param username 用户名
   * @return {Promise[user]}
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
   * @return {Promise[users]}
   */
  public async getUsersByQuery(query: any) {
    const { ctx } = this;
    return ctx.model.User.find(query).exec();
  }

  public async createUser(username: string, password: string, email: string) {
    const { ctx } = this;
    await ctx.model.User.create({
      username,
      password,
      email,
    });

    return this.getUsersByName(username);
  }
}
