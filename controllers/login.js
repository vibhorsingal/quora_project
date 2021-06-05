const bcyrpt=require('bcrypt')

module.exports.getLoginPage=async (req,res)=>{
    res.render('login')
}

module.exports.matchPassword=async (password,hash)=>{
    const matched=await bcyrpt.compare(password,hash)
    return matched
}