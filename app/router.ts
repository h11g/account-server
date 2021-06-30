import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);

  // 认证
  router.post('/mymoney/auth/login', controller.auth.login);
  router.post('/mymoney/auth/regist', controller.auth.regist);

  // 用户
  router.post('/mymoney/user/info', controller.user.getUserInfo);

  // 账本
  router.post('/mymoney/book/list', controller.book.getBooks);
  router.post('/mymoney/book/create', controller.book.createBook);
  router.post('/mymoney/book/update', controller.book.updateBook);

  // 账户
  router.post('/mymoney/account/list', controller.account.getAccounts);
  router.post('/mymoney/account/create', controller.account.createAccount);
  router.post('/mymoney/account/update', controller.account.updateAccount);
  router.post('/mymoney/account/group/list', controller.account.getAccountGroups);
};
