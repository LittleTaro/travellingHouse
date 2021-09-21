'use strict';


const BaseController = require('./base');

class OrdersController extends BaseController {
  async hasOrder() {
    const { ctx } = this;
    const result = await ctx.service.orders.hasOrder({
      houseId: ctx.params('id'),
      userId: ctx.userId,
    });
    this.success(result);
  }

  async addOrder() {
    const { ctx } = this;
    const result = await ctx.service.orders.addOrder({
      houseId: ctx.params('id'),
      userId: ctx.userId,
      isPaid: 0,
    });
    this.success(result);
  }

  async delOrder() {
    const { ctx } = this;
    const result = await ctx.service.orders.delOrder({
      houseId: ctx.params('id'),
      userId: ctx.userId,
    });
    this.success(result);
  }

  async lists() {
    const { ctx } = this;
    const result = await ctx.service.orders.lists({
      ...ctx.params(),
      userId: ctx.userId,
    });
    this.success(result);
  }

  async invokePay(params) {
    return { // 模拟第三方支付返回一个支付订单号
      orderNumber: params.id + new Date().getTime(),
    };
  }

  async pay() {
    const { ctx } = this;
    const { id } = ctx.params();
    const order = await ctx.model.Orders.findByPk(id);

    if (order) {
      try {
        const beforePay = await this.invokePay({ id });
        const result = await ctx.service.orders.pay({
          id,
          orderNumber: beforePay.orderNumber,
        });
        this.success(result);
      } catch (error) {
        this.error('订单支付失败');
      }
    } else {
      this.error('订单不存在');
    }
  }
}

module.exports = OrdersController;
