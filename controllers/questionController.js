const Questions = require('../models/questions')
const Users = require('../models/users')
const axios=require('axios')

module.exports.showHomePage = async (req, res) => {
    const questions = await Questions.find({}).limit(10).sort({ answers: -1 }).populate('answers').populate('userId')
    console.log(questions)
    res.render('home',{
        name:req.user.name,
        questions:questions
    })    
}

module.exports.askQuestion = async (req, res) => {
    const { body } = req.body
    const query = new Questions({
        userId: req.user.id,
        questionBody: body
    })
    await query.save()
    res.send(query)
}
