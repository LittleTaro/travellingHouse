'use strict';

const BaseController = require('./base');

class CommonsController extends BaseController {
  async citys() {
    const { app } = this;
    try {
      const result = await app.httpclient.request('https://apis.imooc.com/?icode=B2060B086C0D78F9', {
        dataType: 'json',
      });
      if (result.status === 200) {
        this.success(result.data.data);
      } else {
        this.error('获取城市数据失败');
      }
    } catch (error) {
      this.error('获取城市数据失败');
    }
  }
}

module.exports = CommonsController;
