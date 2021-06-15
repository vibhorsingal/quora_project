const Users = require('../models/users')
const Questions = require('../models/questions')
const Answers = require('../models/answers')

//posting a new answer
module.exports.answerQuestion = async (req, res) => {
    try {
        //question id
        const qid = req.body.postId
        //new answer
        const answer = new Answers({
            userId: req.user.id,
            questionId: qid,
            answerBody: req.body.ansBody
        })
        await answer.save()
        //updating question array
        var question = await Questions.findById(qid)
        question.answers.push(answer.id)
        await question.save()
        //updating user answers
        var user = await Users.findById(req.user.id)
        user.answers.push(answer)
        await user.save()
        // console.log(user,question,answer)
        res.redirect('/')
    }
    catch (err) {
        console.log(err)
    }

}

module.exports.upvotingController = async (req, res) => {
    try {
        if (req.user) {
            const answerId = req.params.aid
            const userId = req.user.id
            const answer = await Answers.findById(answerId)
            var upIndex = answer.upvotes.indexOf(userId)
            if (upIndex != -1) {
                answer.upvotes.splice(upIndex, 1)
                answer.save()
            }
            else {
                var downIndex = answer.downvotes.indexOf(userId)
                if (downIndex != -1) {
                    answer.downvotes.splice(downIndex, 1)
                }
                answer.upvotes.push(userId)
                answer.save()
            }
            return res.status(201).send(answer)
        }
        else {
            return res.send(null)
        }
    }
    catch (err) {
        console.log(err)
    }
}

module.exports.downvotingController = async (req, res) => {
    try {
        if (req.user) {
            const answerId = req.params.aid
            const userId = req.user.id
            const answer = await Answers.findById(answerId)
            var downIndex = answer.downvotes.indexOf(userId)
            if (downIndex != -1) {
                answer.downvotes.splice(downIndex, 1)
                answer.save()
            }
            else {
                var upIndex = answer.upvotes.indexOf(userId)
                if (upIndex != -1) {
                    answer.upvotes.splice(upIndex, 1)
                }
                answer.downvotes.push(userId)
                answer.save()
            }
            return res.send(answer)
        }
        else {
            console.log(null)
            return res.send(null)
        }
    }
    catch (err) {
        console.log(err)
    }
}
