var express = require('express');
var passport = require('passport');
var router = express.Router();

var User = require("./schema/user.js");          //schema User


/**
 * 插入用户信息
 */
router.post('/useradd', function (req, res, next) {
    var data = {
        username: req.body.username,                          //用户账号
        userpwd: req.body.userpwd,                            //密码
        userage: req.body.userage,                            //年龄
        userphone: req.body.userphone,                        //手机号
        user_e_mail: req.body.user_e_mail,                    //邮箱
        userbirthday: req.body.userbirthday,                  //生日
        usergender: req.body.usergender,                      //性别
        useradress: req.body.useradress,                      //地址
        userhead: req.body.userhead,                          //头像
    };
    var user = new User(data);
    user.save(function (err, result) {
        if (err) {
            res.json({
                code: '110',
                msg: "Error:" + err
            });
        } else {
            res.json({
                code: '100',
                data: result
            });
        }
    });
});

/**
 * 更新编辑用户信息
 */
router.put('/userput', function (req, res, next) {
    var id = req.query.id;
    console.log(id);
    var data = {
        username: req.body.username,                          //用户账号
        userpwd: req.body.userpwd,                            //密码
        userage: req.body.userage,                            //年龄
        userphone: req.body.userphone,                        //手机号
        user_e_mail: req.body.user_e_mail,                    //邮箱
        userbirthday: req.body.userbirthday,                  //生日
        usergender: req.body.usergender,                      //性别
        useradress: req.body.useradress,                      //地址
        userhead: req.body.userhead,                          //头像
    };
    User.update({_id: id},{$set:data},function (err, result) {
        if (err) {
            res.json({
                code: '110',
                msg: "Error:" + err
            });
        } else {
            res.json({
                code: '100',
                data: result
            });
        }
    });
});

/**
 * 删除用户信息
 */
router.delete('/userdelete', passport.authenticate('local'), function (req, res, next) {
    var id = req.query.id;
    User.remove({_id: id},function (err, result) {
        if (err) {
            res.json({
                code: '110',
                msg: "Error:" + err
            });
        } else {
            res.json({
                code: '100',
                data: result
            });
        }
    });
});




//
// /**
//  * 删除用户信息
//  */
// router.delete('/userdelete', function (req, res, next) {
//     var id = req.query.id;
//     User.remove({_id: id},function (err, result) {
//         if (err) {
//             res.json({
//                 code: '110',
//                 msg: "Error:" + err
//             });
//         } else {
//             res.json({
//                 code: '100',
//                 data: result
//             });
//         }
//     });
// });

/**
 * 全部分页查询用户列表
 */
router.get('/userlist', function (req, res, next) {
    var page = parseInt(req.query.page);
    var size = parseInt(req.query.size);
    User.find({}).skip(page * size).limit(size).exec(function(err,result){
        if (err) {
            res.json({
                code: '110',
                msg: "Error:" + err
            });
        } else {
            res.json({
                code: '100',
                data: result
            });
        }
    });
});


module.exports = router;
