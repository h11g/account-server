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

  async createCategory() {
    const { ctx } = this;
    const { name, type } = ctx.request.body;

    if (!name || !type) {
      ctx.generateResponse({ msg: '缺少参数', status: false });
      return;
    }

    await ctx.service.category.addCategory(name, type);
    ctx.generateResponse({});
  }

  async updateCategory() {
    const { ctx } = this;
    const { name, id } = ctx.request.body;

    if (!name || !id) {
      ctx.generateResponse({ msg: '缺少参数', status: false });
      return;
    }

    await ctx.service.category.updateCategory(id, name);
  }

  async deleteCategory() {
    const { ctx } = this;
    const { id } = ctx.request.body;

    if (!id) {
      ctx.generateResponse({ msg: '缺少参数', status: false });
      return;
    }

    await ctx.service.category.deleteCategory(id);
  }
}
