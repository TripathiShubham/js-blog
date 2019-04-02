var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../routes/user');

module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.profile.email);
    });

    // used to deserialize the user
    passport.deserializeUser(function(email, done) {
        User.getUserByEmail(email, function(user) {
            done(null, user);
        });
    });

    // =========================================================================
    // GOOGLE ==================================================================
    // =========================================================================
    passport.use(new GoogleStrategy({

        clientID        : '323592826137-dn19ht5043bm97qgo5b2hu50n3c75u2g.apps.googleusercontent.com',
        clientSecret    : 'Ygdv9RvwdtEpX2NKBLgUkA7m',
        callbackURL     : '	https://codeconnect.app/auth/google',

    },
    function(token, refreshToken, profile, done) {
        User.getUserByEmail(profile._json.email, function(user) {
            if(user == null) {
                User.addUser(profile._json, function(user) {
                    return done(null, {
                        profile: user,
                        token: token
                    });
                });
            } else {
                return done(null, {
                    profile: user,
                    token: token
                });
            }
        });
    }));

};