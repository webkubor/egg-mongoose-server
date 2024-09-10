/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1573538093936_4264';

  // add your middleware config here
  config.middleware = [];
  // 关闭内置egg-security的安全防御
  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [ '*' ],
  };
  // 配置跨域
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    exposeHeaders: [ 'Authorization' ],
    credentials: true,
    allowHeaders: [ 'Content-Type', 'Authorization', 'Accept', 'Mycon-Agent' ],
  };


  return {
    ...config,
  };
};
