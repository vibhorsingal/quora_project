const route = require('express').Router()
const Questions = require('../models/questions')

const { askQuestion, showHomePage } = require('../controllers/questionController')
const { answerQuestion } = require('../controllers/answerController')

route.get('/', showHomePage)
route.post('/ask', askQuestion)
route.post('/answer',answerQuestion)
module.exports = route