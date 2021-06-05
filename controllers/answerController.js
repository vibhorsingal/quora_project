const Users=require('../models/users')
const Questions=require('../models/questions')
const Answers=require('../models/answers')

module.exports.answerQuestion=async (req,res)=>{
    const qid=req.body.postId
    const answer=new Answers({
        userId:req.user.id,
        questionId:qid,
        answerBody:req.body.ansBody
    })
    await answer.save()
    var question=await Questions.findById(qid)
    question.answers.push(answer.id)
    await question.save()
    var user=await Users.findById(req.user.id)
    user.answers.push(answer)
    await user.save()
    // console.log(user,question,answer)
    res.send(user)
}