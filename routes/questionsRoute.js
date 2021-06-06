const route = require('express').Router()
// const Questions = require('../models/questions')
//controllers 
const { showAskQuestion, askQuestion, showHomePage } = require('../controllers/questionController')
const { answerQuestion } = require('../controllers/answerController')

//home page route
route.get('/', showHomePage)

//posting a new question
route.post('/query/ask', askQuestion)

//load form to ask question
route.get('/query/ask',showAskQuestion)

//answer a question
route.post('/query/answer',answerQuestion)

//exporting
module.exports = route