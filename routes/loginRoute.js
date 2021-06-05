const route=require('express').Router()
const passport=require('passport')
const { getLoginPage }=require('../controllers/login')
const { getRegisterPage,registerController}=require('../controllers/register')
require('../config/passport_local')
require('../config/passport_google')

route.get('/login',getLoginPage)
route.post('/login',passport.authenticate('local',{successRedirect:'/'}))
route.get('/register',getRegisterPage)
route.post('/register',registerController)
route.get('/auth/google',
  passport.authenticate('google', { scope: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'
  ] }));
 
route.get('/auth/google/redirect', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
module.exports=route