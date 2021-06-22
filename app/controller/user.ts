import { Controller } from 'egg';

export default class UserController extends Controller {
  async getUserInfo() {
    const { ctx } = this;
    const user = await ctx.getUser();
    console.log('%c [ user ]', 'font-size:13px; background:pink; color:#bf2c9f;', user);
    ctx.generateResponse({ data: { userInfo: user || {} } });
  }
}
