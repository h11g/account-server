export default function(app) {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    username: {
      type: String,
      required: [ true, '用户名不能为空' ],
      minlength: [ 2, '用户名长度不能小于2' ],
      maxlength: [ 16, '用户名长度不能大于16' ],
    },
    password: {
      type: String,
      required: [ true, '密码不能为空' ],
    },
    email: {
      type: String,
      default: '',
      required: [ true, 'email不能为空' ],
      match: [ /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, '邮箱格式错误，请输入正确邮箱地址' ],
    },
  }, {
    timestamps: { createdAt: 'created', updatedAt: 'updated' },
  });

  return mongoose.model('User', UserSchema);
}
