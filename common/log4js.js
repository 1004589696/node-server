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
