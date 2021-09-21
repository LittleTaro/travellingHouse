'use strict';


const BaseService = require('./base');

class CommentService extends BaseService {
  async add(params) {
    return this.run(async ctx => {
      const result = await ctx.model.Comment.create({
        userId: params.userId,
        houseId: params.houseId,
        msg: params.comment,
        createTime: ctx.helper.time(),
      });
      return result;
    });
  }

  async lists(params) {
    return this.run(async (ctx, app) => {
      const result = await ctx.model.Comment.findAll({
        where: {
          houseId: params.id,
        },
        offset: (params.pageNum - 1) * params.pageSize,
        limit: params.pageSize,
        include: [
          {
            model: app.model.User,
            attributes: [ 'avatar', 'username' ],
          },
        ],
      });
      return result;
    });
  }
}

module.exports = CommentService;
