const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const Users = require('../models/users')
const bcrypt = require('bcrypt')
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.REDIRECT_URL || "http://localhost:5000/auth/google/redirect"
},
    async (accessToken, refreshToken, profile, done) => {
        const user = await Users.findOne({ email: profile.emails[0].value })

        if (user) {
            console.log(user)
            return done(null, user)
        }
        else {
            const salt = await bcrypt.genSalt(10)
            const randomPassword = await bcrypt.hash(Math.random().toString(36).substring(2, 7), salt)
            const newUser = new Users({
                email: profile.emails[0].value,
                name: profile.displayName,
                password: randomPassword,
                avatar: profile.photos[0].value
            })
            await newUser.save()
            console.log(newUser)
            return done(null, newUser)
        }
    }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    GoogleUsers.findById(id, function (err, user) {
        done(err, user);
    });
});

module.exports = passport