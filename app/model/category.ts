import { Application } from 'egg';

export default function(app: Application) {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const Category_2Schema = new Schema({
    name: {
      type: 'string',
      required: true,
      maxLength: 10,
      minlength: 2,
    },
  });

  const CategorySchema = new Schema({
    name: {
      type: 'string',
      required: true,
      maxLength: 10,
      minlength: 2,
    },
    // 分类的类型，0 支出，1 收入
    type: {
      default: 0,
      type: Schema.Types.Number,
    },
    category_2: {
      default: [],
      type: [ Category_2Schema ],
    },
    user_id: {
      require: true,
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
  }, {
    timestamps: { createdAt: 'created', updatedAt: 'updated' },
    collection: 'category',
  });

  return mongoose.model('Category', CategorySchema);
}
