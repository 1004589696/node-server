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
    userpwd: {type: String},                        //密码
    userphone: {type: String},                      //手机号
    user_e_mail: {type: String},                    //邮箱
    userage: {type: Number},                        //年龄
    userbirthday: {type:String},                    //生日
    usergender: {type:String},                      //性别
    useradress: {type:String},                      //地址
    userhead: {type:String},                        //头像
    logindate : { type: Date}                       //最近登录时间
});


module.exports = mongoose.model('User',UserSchema);