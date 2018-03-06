module.exports = function(app){
  /**
   * 实现分发路由模块
   */
  var user = require('./api/user');
  app.use('/api/user',user);
};
