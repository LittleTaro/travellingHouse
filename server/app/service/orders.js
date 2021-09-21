'use strict';

const BaseService = require('./base');

class OrdersService extends BaseService {
  async hasOrder(params) {
    return this.run(async ctx => {
      const result = await ctx.model.Orders.findOne({
        where: {
          userId: params.userId,
          houseId: params.houseId,
        },
      });
      return result;
    });
  }

  async addOrder(params) {
    return this.run(async ctx => {
      const result = await ctx.model.Orders.create({
        userId: params.userId,
        houseId: params.houseId,
        createTime: ctx.helper.time(),
      });
      return result;
    });
  }

  async delOrder(params) {
    return this.run(async ctx => {
      await ctx.model.Orders.destroy({
        where: {
          userId: params.userId,
          houseId: params.houseId,
        },
      });
      return null;
    });
  }

  async lists(params) {
    return this.run(async (ctx, app) => {
      const result = await ctx.model.Orders.findAll({
        where: {
          isPaid: params.isPaid,
          userId: params.userId,
        },
        limit: params.pageSize,
        offset: (params.pageNum - 1) * params.pageSize,
        include: [
          {
            model: app.model.House,
            as: 'house',
            include: [
              {
                model: app.model.Imgs,
                attributes: [ 'url' ],
                limit: 1,
              },
            ],
          },
        ],
      });
      return result;
    });
  }

  async pay(params) {
    return this.run(async ctx => {
      console.log('-----', params);
      const result = await ctx.model.Orders.update({
        isPaid: 1,
        orderNumber: params.orderNumber,
      }, {
        where: {
          id: params.id,
        },
      });
      return result;
    });
  }
}

module.exports = OrdersService;
