const Users=require('../models/users')
const Questions=require('../models/questions')
const Answers=require('../models/answers')

//posting a new answer
module.exports.answerQuestion=async (req,res)=>{
    try{
        //question id
        const qid=req.body.postId
        //new answer
        const answer=new Answers({
            userId:req.user.id,
            questionId:qid,
            answerBody:req.body.ansBody
        })
        await answer.save()
        //updating question array
        var question=await Questions.findById(qid)
        question.answers.push(answer.id)
        await question.save()
        //updating user answers
        var user=await Users.findById(req.user.id)
        user.answers.push(answer)
        await user.save()
        // console.log(user,question,answer)
        res.redirect('/')
    }
    catch(err){
        console.log(err)
    }
    
}