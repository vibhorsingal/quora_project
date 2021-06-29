const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Users = require('../models/users')
const { matchPassword } = require('../controllers/loginControllers')

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},

    function (req, username, password, done) {
        Users.findOne({ email: username }, async (err, user) => {
            if (!user) {
                return done(null, false, req.flash('error', "Email is not registerd"));
            }
            if (user) {
                const check = await matchPassword(password, user.password);
                if (!check) {
                    return done(null, false, req.flash('error', 'Incorrect Password'));
                }
                return done(null, user);
            }
            return done(null, user);
        });
    }
))

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    Users.findById(id, function (err, user) {
        done(err, user);
    });
});



module.exports = passport