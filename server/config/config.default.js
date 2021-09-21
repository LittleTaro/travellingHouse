/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1631426148586_5809';

  // add your middleware config here
  config.middleware = [];

  config.allowHosts = [ 'localhost:8000', '127.0.0.1:8000' ];

  config.security = {
    csrf: {
      enable: false,
    },
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    salt: 'wenyu',
    redisExpire: 60 * 60 * 24,
  };

  config.session = {
    key: 'WY_SESS',
    httpOnly: true,
    maxAge: 1000 * 5,
    renew: true,
  };

  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'egg_house',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'shunima887/o',
    define: {
      timeStamps: false, //  不需要自动添加与时间相关的字段
      freezeTableName: true, // 使用原始表名称，不需要额外处理
    },
  };

  config.auth = {
    exclude: [ '/api/user/login', '/api/user/register' ],
  };

  config.interfaceLimt = {
    maxCount: 30, // 最多请求个数
    time: 3 * 1000, // 间隔时间ms
  };

  config.interfaceCache = {
    expire: 10, // 过期时间
    include: [ '/api/user/detail' ], // 需要缓存的接口
  };

  config.jwt = {
    secret: 'wenyu',
  };

  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: 'abc123456',
      db: 0,
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
