'use strict';
const Controller = require('egg').Controller;

class HomeController extends Controller {

  constructor(ctx) {
    super(ctx);
    this.indexRule = {
      page: { type: 'int?' },
      page_size: { type: 'int?' },
    };
  }

  async index() {
    const { ctx } = this;
    ctx.body = '欢迎来到webkubor开发的本地mock系统';
  }

  // post
  async list() {
    const { ctx } = this;
    const list = ctx.request.body;
    this.success(list);

  }

  //  get
  async show() {
    const { ctx } = this;
    const list = ctx.query;
    this.success(list);
  }

}

module.exports = HomeController;
