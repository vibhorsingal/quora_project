const express = require('express')
const route = express.Router()

const { getProfile, editProfile } = require('../controllers/profileControllers')

//edit profile and showing profile page
route.get('/profile', getProfile)
route.post('/profile', editProfile)


module.exports = route