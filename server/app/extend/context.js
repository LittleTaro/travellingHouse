// eslint-disable-next-line strict
module.exports = {
  params(key) { // 用于获取get/post请求里的参数
    const method = this.request.method;
    if (method === 'GET') {
      return key ? this.query[key] : this.query;
    }
    return key ? this.request.body[key] : this.request.body;
  },
  get username() {
    const token = this.request.header.token;
    const tokenCache = token ? this.app.jwt.verify(token, this.app.config.jwt.secret) : undefined;

    return tokenCache ? tokenCache.username : undefined;
  },
  get userId() {
    const token = this.request.header.token;
    const tokenCache = token ? this.app.jwt.verify(token, this.app.config.jwt.secret) : undefined;

    return tokenCache ? tokenCache.id : undefined;
  },
};
