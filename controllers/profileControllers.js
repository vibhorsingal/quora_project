const Users = require('../models/users')

module.exports.getProfile = async (req, res) => {
    try{
        const user=await Users.findById(req.user.id).populate({path:'questionsAsked',populate:{path:'answers'}}).populate({ path: 'answers', populate: { path: 'questionId' } })
        res.render('profile', {
            user: user
        })
    }
    catch(err){
        console.log(err)
    }
}

module.exports.editProfile = async (req, res) => {
    try{
        const user = await Users.findByIdAndUpdate(req.user.id, { name: req.body.newName })
        await user.save()
        res.redirect('/user/profile')    
    }
    catch(err){
        console.log(err)
    }
}