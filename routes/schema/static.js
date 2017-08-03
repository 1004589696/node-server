/**
 * Created by Administrator on 2017/7/31.
 */
/**
 * 用户信息
 */
var mongoose = require('./db.js'),
    Schema = mongoose.Schema;

var StaticSchema = new Schema({
    newAccount_count: {type: Number},
    newPolicy_count: {type: Number},
    newQuestion_count: {type: Number},
    newQuestionUser_count: {type: Number},
    newQuestionAnswer_count: {type: Number},
    newAnswer_count: {type: Number},
    newAnswerUser_count: {type: Number},
    createTime: {type: Date}
});


module.exports = mongoose.model('jd_static_counts',StaticSchema);