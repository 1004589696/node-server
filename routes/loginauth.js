/**
 * Created by Administrator on 2017/8/4.
 */
var User = require("./schema/user.js");          //schema User

var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function (user, done) {
    console.log('hhahahh222'+user);
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    console.log('hhahahh'+id);
    User.findById(id, function(error, user) {
        console.log('hhahahh'+user);
        done(error, user);
    });
});

passport.use('local',new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback:true
    },
    function(req, username, password, done) {
        User.findOne({ username: username }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (user.password != password) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    })
);

