'use strict';
const Controller = require('egg').Controller;

class PostController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.indexRule = {
      page: { type: 'int?' },
      page_size: { type: 'int?' },
    };
    this.shopPostListRule = {
      shop_name: { type: 'string' },
    };
    this.createRule = {
      title: { type: 'string' },
      product_ids: { type: 'array?' },
      content: { type: 'array', min: 1 },
      sort: { type: 'int?' },
    };
  }

  async index() {
    const { ctx } = this;
    ctx.validate(this.indexRule);
    const page = parseInt(ctx.query.page || 1);
    const page_size = parseInt(ctx.query.page_size || 15);
    const query = ctx.model.Post.find().sort({ sort: -1 });
    if (ctx.query.title) {
      query.where('title', new RegExp(ctx.query.title, 'i'));
    }

    if (ctx.query.discovery_status) {
      query.where('discovery_status', ctx.query.discovery_status);
    }
    const total = await ctx.model.Post.find(query.getQuery()).countDocuments();
    const data = await query.skip((page - 1) * page_size).limit(page_size).exec();
    const meta = { total, page, page_size };
    ctx.body = { data, meta };
  }

  async create() {
    const { ctx, service } = this;
    ctx.validate(this.createRule);
    const user = await service.user.getUserById(this.meId);
    if (!user) {
      this.error(404, '找不到该用户');
      return;
    }
    if (!user.invite_code) {
      this.error(1001, '该用户无此权限');
      return;
    }
    const product_ids = ctx.request.body.product_ids;
    const params = {};
    params.title = ctx.request.body.title;
    params.cover = ctx.request.body.content[0].image;
    params.content = ctx.request.body.content;
    params.user_id = this.meId;
    params.shop_name = user.invite_code;
    if (product_ids && product_ids.length > 0) {
      const products = await ctx.service.product.getByIds(product_ids);
      if (products && products.length > 0) {
        params.products = products.map(p => {
          return {
            id: p.id,
            title: p.title,
            image: p.images[0],
            desc: p.desc,
            price: p.price,
            max_price: p.max_price,
          };
        });
      }
    }
    const res = await ctx.model.Post.create(params);
    this.success(res);
  }

  async update() {
    const { ctx } = this;
    ctx.validate(this.createRule);
    let res = await ctx.model.Post.findById(ctx.params.id);
    if (!res) ctx.throw(404);
    if (this.meId !== res.user_id) if (!res) ctx.throw(1001);
    const product_ids = ctx.request.body.product_ids;
    const params = {};
    params.title = ctx.request.body.title;
    params.cover = ctx.request.body.content[0].image;
    params.content = ctx.request.body.content;
    if (product_ids && product_ids.length > 0) {
      const products = await ctx.service.product.getByIds(product_ids);
      if (products && products.length > 0) {
        params.products = products.map(p => {
          return {
            id: p.id,
            title: p.title,
            image: p.images[0],
            desc: p.desc,
            price: p.price,
            max_price: p.max_price,
          };
        });
      }
    }
    res = await ctx.model.Post.findOneAndUpdate({ _id: ctx.params.id }, params, { new: true });
    if (!res) ctx.throw(404);
    this.success(res);
  }

  async show() {
    const { ctx, service } = this;
    let res = await ctx.model.Post.findById(ctx.params.id);
    if (!res) ctx.throw(404);
    const user = await service.user.getUserById(res.user_id);
    res = res.toJSON();
    res.user = {};
    res.user.nickname = user.nickname;
    res.user.avatar = user.avatar;
    if (res.like_users.indexOf(this.meId) > -1) {
      res.liked = true;
    }
    this.success(res);
  }

  async destroy() {
    const { ctx } = this;
    let res = await ctx.model.Post.findById(ctx.params.id);
    if (!res) ctx.throw(404);
    if (this.meId !== res.user_id) if (!res) ctx.throw(1001);
    res = await ctx.model.Post.findByIdAndRemove(ctx.params.id);
    if (!res) ctx.throw(404);
    this.success(res);
  }

}

module.exports = PostController;
