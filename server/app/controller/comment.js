'use strict';

const BaseController = require('./base');

class CommentController extends BaseController {
  async add() {
    const { ctx } = this;
    const { id } = await ctx.service.user.getUser(ctx.username);
    const result = await ctx.service.comment.add({
      ...ctx.params(),
      userId: id,
    });
    this.success(result);
  }
  async lists() {
    const { ctx } = this;
    const result = await ctx.service.comment.lists(ctx.params());
    this.success(result);
  }
}

module.exports = CommentController;
