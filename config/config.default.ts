import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1624165262860_6489';

  // add your egg config in here
  config.middleware = [ 'auth' ];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
    crypto: {
      secret: 'mymoney$crypt$secret',
    },
    jwt: {
      secret: 'mymoney$jwt$secret',
    },
    // 配置不需要 auth 中间件的 url 请求
    auth: {
      ignore: '/mymoney/auth',
    },
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
