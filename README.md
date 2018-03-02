一、项目建立（使用 Express	简单、实用，路由中间件等五脏俱全）
  
  1.  安装node
  
  2.  全局安装 npm install -g express-generator
  
  3.  创建node项目 express node-server
  
  4.  安装初始依赖模块 cd node-server 然后 npm install
  
  5.  启动项目 npm run start 然后浏览器输入 http://localhost:3000 查看启动成功

二、项目功能
   
   1.  设置跨域 
      
        ```
        app.all('*', function (req, res, next) {
          res.header("Access-Control-Allow-Origin", "*");
          res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
          res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization, platform_type");
          res.header("X-Powered-By", ' 3.2.1');
          res.header("Content-Type", "application/json;charset=utf-8");/*设置数据返回格式*/
          if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
          else  next();
        });
    