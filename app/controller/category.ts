import { Controller } from 'egg';

export default class CategoryController extends Controller {
  async getCategory() {
    const { ctx } = this;
    const user = ctx.user;

    let categories = await ctx.service.category.queryCategoryByUserId(user._id);

    if (categories.length === 0) {
      await ctx.service.category.createDefaultCategory(user._id);
      categories = await ctx.service.category.queryCategoryByUserId(user._id);
    }

    ctx.generateResponse({ data: categories });
  }
}
