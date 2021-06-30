import { Application } from 'egg';

export default function(app: Application) {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const AccountGroupSchema = new Schema({
    name: {
      type: String,
      required: [ true, '账户分组名字不能为空' ],
      minlength: [ 2, '账户名长度不能小于2' ],
      maxlength: [ 10, '账户名长度不能大于10' ],
    },
    account_type: {
      default: [],
      type: Schema.Types.Array,
    },
  }, {
    timestamps: { createdAt: 'created', updatedAt: 'updated' },
    collection: 'account_group',
  });

  return mongoose.model('AccountGroup', AccountGroupSchema);
}
