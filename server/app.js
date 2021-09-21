// eslint-disable-next-line strict
module.exports = app => {
  const store = {}; //  将Session的内容保存着内存当中
  app.sessionStore = {
    async get(key) {
      console.log('--store--', store);
      return store[key];
    },
    // eslint-disable-next-line no-unused-vars
    async set(key, value, maxAge) {
      store[key] = value;
    },
    async destroy(key) {
      store[key] = null;
    },
  };
  const mids = app.config.coreMiddleware;
  app.config.coreMiddleware = [
    ...mids,
    ...[
      'interfaceLimit', // 接口限流 避免无限制请求
      'allowHosts', // CSRF攻击防御 判断是否是允许的host
      'notFound', // 接口是否存在
      'auth', // 用户是否登录
      'interfaceCache', // 接口缓存
    ],
  ];
};
