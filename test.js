var express = require('express');
var router = express.Router();

var Static = require("./routes/schema/static.js");          //schema User

/**
 * 条件用户信息
 */
Static.find({newQuestion_count: 28}, function (err, resData) {
    if (err) {
        console.log(err);
    }
    else {
        console.log(resData);
    }
})


module.exports = router;
