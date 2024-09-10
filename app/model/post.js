'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const PostSchema = new Schema({
    user_id: { type: Number },
    title: { type: String },
    cover: { type: String },
    like_num: { type: Number, default: 0 },
    like_users: { type: Array },
    sort: { type: Number, default: 0 },
    top: { type: Number, default: 0 },
    content: { type: Array },
    shop_name: { type: String },
    products: { type: Array },
    liked: { type: Boolean, default: false },
    discovery_status: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now },
  });

  PostSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform(doc, ret) { delete ret._id; },
  });

  return mongoose.model('Post', PostSchema);
};
