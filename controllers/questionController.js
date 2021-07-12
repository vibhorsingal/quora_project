const Questions = require('../models/questions')
const Users = require('../models/users')
const { format } = require('timeago.js')
//rendering home page
module.exports.showHomePage = async (req, res) => {
    //most answered questions 
    try {
        var questions;
        if (req.user) {
            questions = await Questions.
                find({ userId: { $ne: req.user.id } }).
                sort({ createdAt: -1 }).
                populate({
                    path: 'answers',
                    options: {
                        sort: 'netVote'
                    },
                    perDocumentLimit: 1
                }).
                populate('userId')
        }
        else {
            questions = await Questions.find({}).
                sort({ createdAt: -1 }).
                populate({
                    path: 'answers',
                    options: {
                        sort: 'netVote'
                    },
                    perDocumentLimit: 1

                }).
                populate('userId')
        }
        // console.log(questions)
        if (req.user) {
            return res.render('home', {
                user: req.user.name,
                id: req.user.id,
                questions: questions,
                format
            })
        }
        else {
            return res.render('home', {
                user: 'Login',
                questions: questions,
                format
            })
        }
    }
    catch (err) {
        console.log(err)
    }
}

//asking a new question
module.exports.askQuestion = async (req, res) => {
    try {
        const { body } = req.body
        const query = new Questions({
            userId: req.user.id,
            questionBody: body
        })
        await query.save()
        //updating user 
        const user = await Users.findById(req.user.id)
        user.questionsAsked.push(query.id)
        await user.save()

        res.send(query)
    }
    catch (err) {
        console.log(err)
    }
}

//rendering form to ask new question
module.exports.showAskQuestion = (req, res) => {
    if (req.user) {
        return res.render('ask', {
            name: req.user.name
        })
    }
    else {
        return res.redirect('/auth/login')
    }

}

//question by id
module.exports.showQuestionById = async (req, res) => {
    try {
        const question = await Questions.findById(req.params.qid).
            populate({
                path: 'answers',
                populate: {
                    path: 'userId'
                }
            })
            .populate({
                path: 'userId'
            })
        if (req.user) {
            return res.render('question', {
                user: req.user.name,
                id: req.user.id,
                question: question,
                format
            })
        }
        else {
            return res.render('question', {
                user: 'Login',
                question: question,
                format
            })
        }
    }
    catch (err) {
        console.log(err)
    }
}


//delete question by id

/*
    if a question is not answered yet the person can delete it 
*/

module.exports.deleteQuestionById = async (req, res) => {
    try {
        const qid = req.params.qid
        const user = await Users.findById(req.user.id)
        let index = user.questionsAsked.indexOf(qid)
        user.questionsAsked.splice(index, 1)
        user.save()
        const question = await Questions.findByIdAndDelete(qid)
        return res.send(question)
    }
    catch (err) {
        console.log(err);
    }
}