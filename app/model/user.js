'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const UserSchema = new Schema({
    sax: { type: String },
    avator: { type: String },
    username: { type: String },
    created_at: { type: Date, default: Date.now },
  });

  UserSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform(doc, ret) { delete ret._id; },
  });
  return mongoose.model('Recommend', UserSchema);
};
