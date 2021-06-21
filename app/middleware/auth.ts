import { Context } from 'egg';

// 登录验证
module.exports = () => {
  return async function(ctx: Context, next) {
    const { headers, query } = ctx;
    let token = '';
    let user;

    if (headers.authorization) {
      token = headers.authorization as string;
    } else if (query.accessToken) {
      token = query.accesstoken;
    }

    try {
      user = await ctx.checkToken(token);
    } catch (error) {
      ctx.generateResponse({ status: false, statusCode: 401, msg: '身份校验失败，请重新登录' });
      return;
    }
    if (!user) {
      ctx.generateResponse({ status: false, statusCode: 401, msg: '身份校验失败，请重新登录' });
      return;
    }

    // ctx.request.user = user;
    await next();
  };
};
