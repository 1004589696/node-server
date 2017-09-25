/**
 * Created by Administrator on 2017/7/31.
 */
/**
 * 用户信息
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = require('./db');

var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var UserBox = new Schema({
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


// 使用pre中间件在用户信息存储前进行密码加密
UserBox.pre('save', function (next) {
    var user = this;

    // 进行加密（加盐）
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        })
    });
});

// 编译模型
module.exports = db.node.model('User', UserBox);