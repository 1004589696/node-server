/**
 * Created by Administrator on 2017/7/31.
 */
/**
 * 用户信息
 */
var mongoose = require('./db.js'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    username : { type: String },                    //用户账号
    password: {type: String},                        //密码
    phone: {type: String},                      //手机号
    e_mail: {type: String},                    //邮箱
    age: {type: Number},                        //年龄
    birthday: {type:String},                    //生日
    gender: {type:String},                      //性别
    address: {type:String},                      //地址
    head: {type:String},                        //头像
    logindate : { type: Date}                       //最近登录时间
});


module.exports = mongoose.model('User',UserSchema);