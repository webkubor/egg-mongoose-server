'use strict';
const Controller = require('egg').Controller;

class TestController extends Controller {

  constructor(ctx) {
    super(ctx);
    this.indexRule = {
      page: { type: 'int?' },
      page_size: { type: 'int?' },
    };
  }

  async index() {
    const { ctx } = this;
    ctx.body = 'test resful 接口风格测试';
  }

  // 增加
  async create() {
    const { ctx } = this;
    const res = ctx.request.body;
    ctx.body = { status: 200, data: res, msg: '增加' };
  }
  // 改
  async update() {
    const { ctx } = this;
    const res = ctx.params;
    ctx.body = { status: 200, data: res, msg: '改' };
  }

  //  查
  async show() {
    const { ctx } = this;
    const res = ctx.query;
    ctx.body = { status: 200, data: res, msg: '查' };

  }

  // 删
  async destroy() {
    const { ctx } = this;
    const res = ctx.params;
    ctx.body = { status: 200, data: res, msg: '删' };
  }

}

module.exports = TestController;
