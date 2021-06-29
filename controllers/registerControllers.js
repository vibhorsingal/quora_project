const bcrypt = require('bcrypt')
const Users = require('../models/users')

//show register page
module.exports.getRegisterPage = (req, res) => {
    res.render('register', { message: req.flash('error') })
}

//register the user
module.exports.registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const user = await Users.findOne({ email: email })
        if (user) {
            throw new Error("Email already registered")
        }
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        const newUser = new Users({
            name: name,
            email: email,
            password: hash
        })
        Users.uploadAvatar(req, res, (err) => {
            if (err) {
                console.log(err)
            }
            let path = Users.avatarPath + '/' + 'default'
            newUser.avatar = path.replace(/\\/g, '/')
            newUser.save()
            return res.redirect('/auth/login')
        })
    }
    catch (err) {
        req.flash('error', err.message)
        console.log(err)
        res.redirect('/auth/register')
    }
}