/**
 * Created by Administrator on 2017/8/4.
 */
var User = require("./schema/user.js");          //schema User

var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

passport.use('local',new LocalStrategy({
        usernameField: 'username',
        passwordField: 'userpwd'
    },
    function(username, password, done) {
        User.findOne({ username: username }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (user.userpwd != password) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    })
);


passport.serializeUser(function (user, done) {//保存user对象
    done(null, user);//可以通过数据库方式操作
});

passport.deserializeUser(function (user, done) {//删除user对象
    done(null, user);//可以通过数据库方式操作
});