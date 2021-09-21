'use strict';
const path = require('path');

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
  redis: {
    enable: true,
    package: 'egg-redis',
  },
  auth: {
    enable: true,
    path: path.join(__dirname, '../lib/plugin/egg-auth'),
  },
  notFound: {
    enable: true,
    path: path.join(__dirname, '../lib/plugin/egg-notFound'),
  },
  allowHosts: {
    enable: true,
    path: path.join(__dirname, '../lib/plugin/egg-allowHosts'),
  },
  interfaceLimit: {
    enable: true,
    path: path.join(__dirname, '../lib/plugin/egg-interfaceLimit'),
  },
  interfaceCache: {
    enable: true,
    path: path.join(__dirname, '../lib/plugin/egg-interfaceCache'),
  },
};
