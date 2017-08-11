/**
 * Created by Administrator on 2017/8/4.
 */
var passport = require('passport');
var jwt = require('jwt-simple');
var User = require("./schema/user.js");
var LocalStrategy = require('passport-local').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;

/**
 * passport  Username & Password
 */
passport.use('local',new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback:true
    },
    function(req, username, password, done) {
        username = req.headers.authorization;
        password = '123456';
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
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(function (id, done) {
    User.findById(id, function(error, user) {
        done(error, user);
    });
});



/**
 * passport  OAuth 2.0
 */
passport.use(new BearerStrategy(
    function (token, done) {
        var tokenObj = jwt.decode(token, 'dingcunkuan123456');
        if ( tokenObj.name != 'dingcunkuan' ) {
            return done(null, false);
        }
        return done(null, {name: 'dingcunkuan', psd: '123'}, {scope: 'read'});
    }
));
