/**
 * Created by Administrator on 2017/7/31.
 */
/**
 * 用户信息
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = require('./db');

var User = new Schema({
    username: {type: String},
    password: {type: String},
    phone: {type: String},
    e_mail: {type: String},
    age: {type: Number},
    birthday: {type: String},
    gender: {type: String},
    address: {type: String},
    head: {type: String},
    logindate: {type: Date},
    createdate: {type: Date}
});

module.exports = db.node.model('user', User);