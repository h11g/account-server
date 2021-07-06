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
}
