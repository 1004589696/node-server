/**
 * Created by Administrator on 2017/7/31.
 */
/**
 * 奖品信息
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = require('./db');


//记录
var LucydrawRecord = new Schema({
    userID: {type: String},
    lucydrawID: {type: String},
    createTime: {type: Date, default: Date.now},
    draw: {type: Object}
});


module.exports = db.node.model('lucydrawRecord', LucydrawRecord);