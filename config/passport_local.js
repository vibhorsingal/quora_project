const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Users = require('../models/users')
const { matchPassword } = require('../controllers/loginControllers')

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},

    function (username, password, done) {
        Users.findOne({ email: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (user) {
                const check = matchPassword(password, user.password);
                if (!check) return done(null, false, { message: 'Incorrect Password' });
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