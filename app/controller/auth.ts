import { Controller } from 'egg';

export default class LoginController extends Controller {
  /**
   * 登录
   */
  async login() {
    const { ctx, service } = this;
    const body = ctx.request.body;
    const { username, password } = body;

    // 校验用户名是否存在
    let user = await service.user.getUsersByName(username);
    if (!user) {
      ctx.generateResponse({ msg: '用户不存在！', status: false });
      return;
    }

    // 校验密码
    const currentUser = await service.user.getPasswordByUsername(username);
    const verify = await ctx.helper.checkPassword(password, currentUser.password);
    if (!verify) {
      ctx.generateResponse({ msg: '密码错误，请重试', status: false });
      return;
    }

    user = user.toObject();
    const userDataStr = JSON.parse(JSON.stringify(user));
    const token = await ctx.getToken(userDataStr);
    ctx.generateResponse({ data: { access_token: token, userInfo: user } });
    ctx.rotateCsrfSecret();
  }

  /**
   * 注册
   */
  async regist() {
    const { ctx, service } = this;
    const { email, username, password } = ctx.request.body;

    if (!password) {
      ctx.generateResponse({ msg: '密码不能为空！', status: false });
      return;
    } else if (password.length < 6 || password.length > 16) {
      ctx.generateResponse({ msg: '密码长度为6-16位！', status: false });
      return;
    }

    const users = await service.user.getUsersByQuery({
      $or: [
        { username },
        { email },
      ],
    });

    if (users.length > 0) {
      ctx.generateResponse({ msg: '用户名或邮箱已被注册!', status: false });
      return;
    }

    const hash_password = await ctx.helper.createPassword(password);
    try {
      let userData = await ctx.service.user.createUser(username, hash_password, email);
      userData = userData.toObject();
      const userDataStr = JSON.parse(JSON.stringify(userData));
      const token = await ctx.getToken(userDataStr);
      ctx.generateResponse({ data: { access_token: token, userInfo: userData } });
    } catch (error) {
      ctx.generateResponse({ msg: error.message, status: false });
    }
  }
}
