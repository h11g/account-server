import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);

  // 认证
  router.post('/mymoney/auth/login', controller.auth.login);
  router.post('/mymoney/auth/regist', controller.auth.regist);
};
