'use strict';

const BaseService = require('./base');

class HouseService extends BaseService {
  commonAttr(app) {
    return {
      order: [
        [ 'showCount', 'DESC' ],
      ],
      attributes: {
        exclude: [ 'startTime', 'endTime', 'publishTime' ],
      },
      include: [
        {
          model: app.model.Imgs,
          limit: 1,
          attributes: [ 'url' ],
        },
      ],
    };
  }

  async hot() {
    return this.run(async (ctx, app) => {
      const result = await ctx.model.House.findAll({
        limit: 4,
        ...this.commonAttr(app),
      });
      return result;
    });
  }

  async search(params) {
    return this.run(async (ctx, app) => {
      const { lte, gte, like } = app.Sequelize.Op;
      const where = {
        cityCode: Array.isArray(params.code) ? params.code[0] : params.code,
        startTime: {
          [gte]: params.startTime,
        },
        endTime: {
          [lte]: params.endTime,
        },
        name: {
          [like]: '%' + params.houseSubmitName + '%',
        },
      };
      if (!params.houseSubmitName) {
        delete where.name;
      }
      if (!params.code) {
        delete where.cityCode;
      }
      const result = await ctx.model.House.findAll({
        where,
        limit: 8,
        offset: (params.pageNum - 1) * params.pageSize,
        ...this.commonAttr(app),
      });
      return result;
    });
  }

  async detail(params) {
    return this.run(async (ctx, app) => {
      const result = await ctx.model.House.findOne({
        where: {
          id: params.id,
        },
        include: [
          {
            model: app.model.Imgs,
            attributes: [ 'url' ],
          },
        ],
      });
      await ctx.model.House.update({
        showCount: result.showCount + 1,
      }, {
        where: {
          id: params.id,
        },
      });
      return result;
    });
  }
}

module.exports = HouseService;
