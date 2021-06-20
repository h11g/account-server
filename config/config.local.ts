import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};
  config.security = {
    csrf: {
      enable: false,
    },
  };

  const bizConfig = {
    mongoose: {
      client: {
        url: 'mongodb://127.0.0.1/mymoney',
        options: {},
      },
    },
  };

  return {
    ...config,
    ...bizConfig,
  };
};
