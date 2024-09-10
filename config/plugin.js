'use strict';

/** @type Egg.EggPlugin */

// 注册启用跨域
exports.cors = {
  enable: true,
  package: 'egg-cors',
};
exports.validate = {
  enable: true,
  package: 'egg-validate',
};


exports.mongoose = {
  enable: true,
  package: 'egg-mongoose',
};
