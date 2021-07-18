import { Service } from 'egg';
import * as _ from 'lodash';
import categoryDatas from '../db-init/category';

const selectUserKey = { created: 0, updated: 0, __v: 0 };

export default class CategoryService extends Service {
  public async createDefaultCategory(user_id: string) {
    const { ctx } = this;
    const categories = _.map(categoryDatas, cate => {
      return {
        ...cate,
        user_id,
      };
    });

    await ctx.model.Category.create(categories);
  }

  public async queryCategoryByUserId(user_id: string) {
    const { ctx } = this;
    const query = { user_id: { $in: user_id } };
    return ctx.model.Category.find(query, selectUserKey).exec();
  }

  public async addCategory(name: string, type: number) {
    const { ctx } = this;
    await ctx.model.Category.create({
      name,
      type,
    });
  }

  public async updateCategory(cate_id: string, name: string) {
    const { ctx } = this;
    await ctx.model.Category.findByIdAndUpdate(cate_id, {
      $set: {
        name,
      },
    }, { omitUndefined: true });
  }

  public async deleteCategory(cate_id: string) {
    const { ctx } = this;
    await ctx.model.Category.findByIdAndRemove(cate_id);
  }
}
