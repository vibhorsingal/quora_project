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
        const user = await Users.findById(req.user.id)
        Users.uploadAvatar(req,res,(err)=>{
            if(err){
                console.log(err)
            }
            user.name=req.body.newName
            if(req.file){
                console.log(req.file.filename)
                user.avatar= Users.avatarPath + '/' + req.file.filename
            }
            user.save()
            return res.redirect('/auth/login')  
        })
          
    }
    catch(err){
        console.log(err)
    }
}