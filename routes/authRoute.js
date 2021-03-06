const route = require('express').Router()

//passport configuration
const passport = require('passport')
require('../config/passport_local')
require('../config/passport_google')

//controllers 
const { getLoginPage, logout, forgotPassword, sendOtp, confirmOtp, resetPassword } = require('../controllers/loginControllers')
const { getRegisterPage, registerController } = require('../controllers/registerControllers')

//routes for local login
route.get('/login', getLoginPage)
route.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/auth/login' }))

//register routes
route.get('/register', getRegisterPage)
route.post('/register', registerController)

//google authentication routes
route.get('/google',
  passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ]
  }));

//google authentication callback  
route.get('/google/redirect',
  passport.authenticate('google', { failureRedirect: '/login', failureFlash: true }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

//forgot password route
route.get('/forgot', forgotPassword)

//send OTP
route.post('/sendOtp', sendOtp)

//confirm OTP
route.post('/confirmOtp', confirmOtp)

//reset password
route.post('/reset', resetPassword)

//logout route
route.get('/logout', logout)
//exporting  
module.exports = route