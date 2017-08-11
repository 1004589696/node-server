var express = require('express');
var passport = require('passport');
var router = express.Router();

var User = require("./schema/user.js");          //schema User


/**
 * 插入用户信息
 */
router.post('/useradd', function (req, res, next) {
    var data = {
        username: req.body.username,
        password: req.body.password,
        phone: req.body.phone,
        e_mail: req.body.e_mail,
        age: req.body.age,
        birthday: req.body.birthday,
        gender: req.body.gender,
        address: req.body.address,
        head: req.body.head,
        logindate: new Date(),
        createdate: new Date()
    };
    var user = new User(data);
    user.save(function (err, result) {
        if (err) {
            res.json({
                code: 0,
                msg: "Error:" + err
            });
        } else {
            res.json({
                code: 1,
                data: result
            });
        }
    });
});


/**
 * 查询用户信息
 */
router.post('/userget', function (req, res, next) {
    var data = {
        username: req.body.username,
        password: req.body.password
    };
    User.find({username:data.username,password:data.password},function(err,result){
        if (err) {
            res.json({
                code: 0,
                msg: "Error:" + err
            });
        } else {
            if(!result){
                res.json({
                    code: 2,
                    msg: "用户名或密码不正确"
                });
            }else{
                res.json({
                    code: '100',
                    data: result
                });
            }
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
        password: req.body.password,                            //密码
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
router.delete('/userdelete', passport.authenticate('bearer', { session: false }), function (req, res, next) {
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
