const route = require('express').Router()
// const Questions = require('../models/questions')
//controllers 
const { showAskQuestion, askQuestion, showHomePage, showQuestionById, deleteQuestionById } = require('../controllers/questionController')
const { answerQuestion, upvotingController, downvotingController, answerAQuestion } = require('../controllers/answerController')

//home page route
route.get('/', showHomePage)

//posting a new question
route.post('/query/ask', askQuestion)

//load form to ask question
route.get('/query/ask', showAskQuestion)

//answer a question
route.post('/query/answer', answerQuestion)

//
route.post('/question/answer/:qid', answerAQuestion)

//question by id
route.get('/question/:qid', showQuestionById)

// upvotes
route.get('/answer/upvote/:aid', upvotingController)

//downvote
route.get('/answer/downvote/:aid', downvotingController)

//delete a question by id
route.get('/question/delete/:qid', deleteQuestionById)
//exporting
module.exports = route