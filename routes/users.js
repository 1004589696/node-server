var express = require('express');
var router = express.Router();

var User = require("./schema/user.js");          //schema User

/**
 * 插入用户信息
 */
router.post('/postuser', function(req, res, next) {
    var data = {
        username: 'cunkuan.ding',                 //用户账号
        userpwd: 'no123456',                      //密码
        userage: 27,                              //年龄
        logindate: new Date()                     //最近登录时间
    };
    var user = new User(data);
    user.save(function (err, resData) {
        if (err) {
            res.json({
                code: '0',
                msg:"Error:" + err
            });
        }
        else {
            res.json({
                code: '10100',
                data: resData
            });
        }
    });
});



/**
 * 条件用户信息
 */
router.get('/getuserlist', function(req, res, next) {
    var data = {
        username: 'cunkuan.dng'
    };
    User.find(data, function(err, resData){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            res.json({
                code: '10100',
                data: resData
            });
        }
    })
});



module.exports = router;
