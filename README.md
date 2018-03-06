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
        
   2.  log4js 日志
      
      ```
         /**
          * npm install log4js --save
          */
         const log4js = require('log4js');
         
         log4js.configure({
           appenders: {
             xcLogFile: {
               type: "dateFile",
               filename: './logs/xcLogFile',//您要写入日志文件的路径
               alwaysIncludePattern: true,//（默认为false） - 将模式包含在当前日志文件的名称以及备份中
               //compress: true,//（默认为false） - 在滚动期间压缩备份文件（备份文件将具有.gz扩展名）
               pattern: "-yyyy-MM-dd-hh.log",//（可选，默认为.yyyy-MM-dd） - 用于确定何时滚动日志的模式。格式:.yyyy-MM-dd-hh:mm:ss.log
               encoding: 'utf-8',//default "utf-8"，文件的编码
               maxLogSize: 10 //文件最大存储空间，当文件内容超过文件存储空间会自动生成一个文件xxx.log.1的序列自增长的文件
             },
             xcLogConsole: {
               type: 'console'
             }
           },
           categories: {
             default: {
               appenders: ['xcLogFile'],
               level: 'all'
             },
             xcLogFile: {
               appenders: ['xcLogFile'],
               level: 'all'
             },
             xcLogConsole: {
               appenders: ['xcLogConsole'],
               level: log4js.levels.ALL
             }
           }
         });
         
         module.exports = log4js.getLogger('xcLogFile');
         
         
         /**
          * 使用
          */
         var logger1 = require('./common/log4js');
         logger1.info("www");
    
  
  3.  操作数据库
     
          安装 mongodb 到 C:\Program Files(自定义亦可)
  
          启动 mongodb  命令框输入：cd "C:\Program Files\MongoDB\Server\3.4\bin" 和 mongod.exe --dbpath "C:\data\db"
       
          安装  mongoose 操作 npm install mongoose --save
       
          建立多个连接库，例如：在根目录下建里mongoose文件夹，并创建db.js(连接)
       
          建立schema数据模型，定义表结构 例如：在根目录下建里schema文件夹，并创建user.js(用户信息表)（bcrypt密码加密）
          
          // 在 routes 建立 index.js 文件为总的路由控制文件
          // 在routes/index文件中再进行统一的路由分发，这样防止app.js中代码过于臃肿
          
          
  4.  用户注册 登录 密码加密 token 刷新Token