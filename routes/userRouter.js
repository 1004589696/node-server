var express = require('express');
var passport = require('passport');
var router = express.Router();

var libs = process.cwd() + '/routes/';
var log = require(libs + 'log')(module);
var bcrypt = require('bcrypt');

var SALT_WORK_FACTOR = 10;

var User = require("./schema/user.js");          //schema User


function IsOldUser(phone, callback) {
    User.findOne({phone: phone}, function (err, userData) {
        if (err) {
            log.debug('连接服务错误');
            callback('500')
        } else {
            if (userData) {
                log.debug('userData', userData);

                callback(false)
            } else {
                log.debug('数据库未查询到');
                callback(true)
            }
        }
    });
}


/**
 * 插入用户信息
 */
router.post('/createuser', function (req, res, next) {
    IsOldUser(req.body.phone,function (is_old) {
        if(is_old==='500'){
            res.json({
                code: '500',
                msg: "Error:" + err
            });
        }else if(is_old){
            var data = {
                password: req.body.password,
                phone: req.body.phone,
            };
            var user = new User(data);
            user.save(function (err, result) {
                if (err) {
                    res.json({
                        code: '500',
                        msg: "Error:" + err
                    });
                } else {
                    res.json({
                        code: '0',
                        data: result
                    });
                }
            });
        }else{
            res.json({
                code: '10001',
                msg: req.body.phone+"已注册过"
            });
        }
    });
});



function IsUser(password, hash, callback) {
    bcrypt.compare(password, hash, function(err, IsUserData) {
        if(err){
            log.debug('连接服务错误');
            callback('500')
        } else {
            if (IsUserData) {
                callback(true)
            } else {
                callback(false)
            }
        }
    });
}
/**
 * 登录用户信息
 */
router.post('/login', function (req, res, next) {
    var phone = req.body.phone;
    var password = req.body.password;
    User.findOne({phone: phone}, function (err, result) {
        if (err) {
            res.json({
                code: '500',
                msg: "Error:" + err
            });
        } else {
            if (result) {
                IsUser(password, result.password, function (code) {
                    if (code === '500') {
                        res.json({
                            code: '500',
                            msg: "服务器错误"
                        });
                    } else if (code) {
                        delete result.password;
                        res.json({
                            code: '0',
                            msg: "ok"
                        });
                    } else {
                        res.json({
                            code: '10002',
                            msg: "密码错误"
                        });
                    }
                });
            } else {
                res.json({
                    code: '10001',
                    msg: "用户不存在"
                });
            }
        }
    });
});


/**
 * 查询用户信息
 */
router.get('/userid', function (req, res, next) {
    var id = req.query.id;
    User.findOne({_id: id},{ password: 0 }, function (err, result) {
        if (err) {
            res.json({
                code: '500',
                msg: "Error:" + err
            });
        } else {
            if (result) {
                res.json({
                    code: '0',
                    data: result
                });
            } else {
                res.json({
                    code: '10001',
                    msg: "用户不存在"
                });
            }
        }
    });
});


/**
 * 更新编辑用户信息
 */
router.put('/userupdate', function (req, res, next) {
    var id = req.query.id;
    var data = {};
    req.body.username && ( data.username = req.body.username);
    req.body.e_mail && ( data.e_mail = req.body.e_mail);
    req.body.age && ( data.age = req.body.age);
    req.body.birthday && ( data.birthday = req.body.birthday);
    req.body.gender && ( data.gender = req.body.gender);
    req.body.address && ( data.address = req.body.address);
    req.body.head && ( data.head = req.body.head);
    User.update({_id: id}, {$set: data}, function (err, result) {
        if (err) {
            res.json({
                code: '500',
                msg: "Error:" + err
            });
        } else {
            res.json({
                code: '0',
                data: result
            });
        }
    });
});




// /**
//  * 删除用户信息
//  */
// router.delete('/userdelete', passport.authenticate('bearer', { session: false }), function (req, res, next) {
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
//
//
//

/**
 * 全部分页查询用户列表
 */
router.get('/userlist', function (req, res, next) {
    var page = parseInt(req.query.page) || 0;
    var size = parseInt(req.query.size) || 10;
    User.find({},{ password: 0 }).skip(page * size).limit(size).sort({createdate: -1}).exec(function(err,result){
        if (err) {
            res.json({
                code: '500',
                msg: "Error:" + err
            });
        } else {
            res.json({
                code: '0',
                data: result
            });
        }
    });
});


module.exports = router;