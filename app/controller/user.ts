import { Controller } from 'egg';

export default class UserController extends Controller {
  async getUserInfo() {
    const { ctx } = this;
    const user = await ctx.getUser();
    ctx.generateResponse({ data: user });
  }
}
