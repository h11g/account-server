import { Controller } from 'egg';

export default class UserController extends Controller {
  async getUserInfo() {
    const { ctx } = this;
    let user = await ctx.getUser();
    user = user.toObject();
    ctx.generateResponse({ data: user });
  }
}
