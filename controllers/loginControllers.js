const bcyrpt = require('bcrypt')

//rendering the login page 
module.exports.getLoginPage = async (req, res) => {
    if (req.user) {
        return res.redirect('/')
    }
    res.render('login', { message: req.flash('error') })
}

//checking whether password and hash match or not 
module.exports.matchPassword = async (password, hash) => {
    try {
        const matched = await bcyrpt.compare(password, hash)
        return matched
    }
    catch (err) {
        console.log(err)
    }
}

module.exports.logout = (req, res) => {
    req.logout()
    res.redirect('/')
}