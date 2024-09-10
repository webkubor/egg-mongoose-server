'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', '/api/', controller.home.index);
  router.resources('test', '/api/test', controller.test);
  router.resources('post', '/api/post', controller.post);
};
