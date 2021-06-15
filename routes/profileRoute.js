const express = require('express')
const route = express.Router()

const { getProfile, editProfile, getProfileById, followUser } = require('../controllers/profileControllers')

//edit profile and showing profile page
route.get('/profile', getProfile)

route.post('/profile', editProfile)

route.get('/profile/:uid', getProfileById)

route.get('/profile/follow/:aid', followUser)

module.exports = route