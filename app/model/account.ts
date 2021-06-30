import { Application } from 'egg';

export default function(app: Application) {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const AccountSchema = new Schema({
    name: {
      type: String,
      required: [ true, '账户名字不能为空' ],
      minlength: [ 2, '账户名长度不能小于2' ],
      maxlength: [ 16, '账户名长度不能大于16' ],
    },
    // 账户类型，指 AccountGroup 下 account_type 的某个账户类型
    type: {
      type: String,
      require: true,
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
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'account-groups',
    },
  }, {
    timestamps: { createdAt: 'created', updatedAt: 'updated' },
    collection: 'accounts',
  });

  return mongoose.model('Account', AccountSchema);
}
