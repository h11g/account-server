import { Application } from 'egg';

export default function(app: Application) {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const BookSchema = new Schema({
    name: {
      type: String,
      required: [ true, '账本名字不能为空' ],
      minlength: [ 2, '账本名长度不能小于2' ],
      maxlength: [ 16, '账本名长度不能大于16' ],
    },
    type: {
      type: Number,
      required: [ true, '账本未指定类型' ],
    },
    user_id: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: 'users',
    },
  }, {
    timestamps: { createdAt: 'created', updatedAt: 'updated' },
    collection: 'books',
  });

  return mongoose.model('Book', BookSchema);
}
