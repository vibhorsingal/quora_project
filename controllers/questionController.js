const Questions = require('../models/questions')
const Users = require('../models/users')

//rendering home page
module.exports.showHomePage = async (req, res) => {
    //most answered questions 
    const questions = await Questions.find({}).limit(10).sort({ answers: -1 }).populate('answers').populate('userId')
    // console.log(questions)
    res.render('home',{
        name:req.user.name,
        questions:questions
    })    
}

//asking a new question
module.exports.askQuestion = async (req, res) => {
    const { body } = req.body
    //creating new question
    const query = new Questions({
        userId: req.user.id,
        questionBody: body
    })
    await query.save()
    //updating user 
    const user=await Users.findById(req.user.id)
    user.questionsAsked.push(query.id)
    await user.save()

    res.send(query)
}

//rendering form to ask new question
module.exports.showAskQuestion= (req,res)=>{
    res.render('ask',{
        name:req.user.name
    })
}