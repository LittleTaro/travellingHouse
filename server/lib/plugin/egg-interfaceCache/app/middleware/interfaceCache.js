// eslint-disable-next-line strict
module.exports = options => {
  return async (ctx, next) => {
    const { url } = ctx.request;
    console.log(url);
    const cache = await ctx.app.redis.get(url);
    if (options.include.includes(url)) {
      if (cache) {
        ctx.body = JSON.parse(cache);
        return;
      }
      await next();
      await ctx.app.redis.set(url, JSON.stringify(ctx.response.body), 'EX', 8);
    } else {
      await next();
    }
  };
};
