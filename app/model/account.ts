import { Application } from 'egg';

export default function(app: Application) {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  /**
   * type 账户的类型
   * other 0, cash 1, wechat 2, alipay 3, bank card 4, credit card 5 ...
   * ==================
   * group 对 type 的分组，比如资金账户，债务，信用卡，投资等
   * capital 1，credit card 2, investing 3, debts 4
   */
  const AccountSchema = new Schema({
    name: {
      type: String,
      required: [ true, '账户名字不能为空' ],
      minlength: [ 2, '账户名长度不能小于2' ],
      maxlength: [ 16, '账户名长度不能大于16' ],
    },
    type: {
      type: Number,
      required: [ true, '账户未指定类型' ],
    },
    book_id: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: 'books',
    },
    balance: {
      default: 0,
      type: Number,
    },
    group: {
      type: Number,
      required: true,
    },
  }, {
    timestamps: { createdAt: 'created', updatedAt: 'updated' },
    collection: 'accounts',
  });

  return mongoose.model('Account', AccountSchema);
}
