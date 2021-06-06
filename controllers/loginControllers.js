const bcyrpt=require('bcrypt')

//rendering the login page 
module.exports.getLoginPage=async (req,res)=>{
    res.render('login')
}

//checking whether password and hash match or not 
module.exports.matchPassword=async (password,hash)=>{
    const matched=await bcyrpt.compare(password,hash)
    return matched
}