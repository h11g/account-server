import { Context } from 'egg';
import errorCode from '../common/error-code';

const context = {
  /**
	 * 返回客户端的内容
	 */
  generateResponse({ msg = 'ok', data = {}, status = true, code = 0, statusCode = 200 }) {
    const ctx = this as Context;
    ctx.status = statusCode;
    if (!status && code === 0) {
      code = errorCode.SERVER_ERROR;
    }
    ctx.body = {
      status,
      data,
      msg,
      code,
    };
  },

  // 生成 Token
  async getToken(data) {
    const { config, jwt } = (this as any).app;
    return await jwt.sign(data, config.jwt.secret, { expiresIn: 30 * 24 * 60 * 60 + 's' });
  },

  // 验证token
  async checkToken(token) {
    return await (this as any).app.jwt.verify(token, (this as any).app.config.jwt.secret);
  },
};

export default context;