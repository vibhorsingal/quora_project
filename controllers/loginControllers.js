const bcyrpt = require('bcrypt')
const transporter = require('../config/nodemailer')
const Users = require('../models/users')
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

//forgot password
module.exports.forgotPassword = async (req, res) => {
    try {
        res.render('forgotPassword', {
            message: req.flash('error')
        })
    }
    catch (err) {
        console.log(err)
    }
}

//send OTP
module.exports.sendOtp = async (req, res) => {
    try {
        const email = req.body.email
        const user = await Users.findOne({ email: email, password: { $exists: true } })
        // console.log(user)
        if (user) {
            const otp = Math.floor(Math.random() * 8999) + 1000
            // console.log(otp)
            await Users.findOneAndUpdate({ email: email }, { otp: otp })
            const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: 'OTP for resetting password',
                text: `your OTP is ${otp}`
            }
            transporter.sendMail(mailOptions, (err, data) => {
                if (err) {
                    console.log(err)
                    return res.redirect('/auth/forgot')
                }
                else {
                    console.log('mail sent')
                    return res.render('confirmOtp', {
                        email: email,
                        message: req.flash('error')
                    })
                }
            })
        }
        else {
            throw new Error("Email is not registered ")
        }
    }
    catch (err) {
        req.flash('error', err.message)
        console.log(err)
        res.redirect('/auth/forgot')
    }
}

//confirm otp
module.exports.confirmOtp = async (req, res) => {
    try {
        const otp = parseInt(req.body.otp)
        const email = req.body.email
        const user = await Users.findOne({ email: email })
        if (user.otp == otp) {
            return res.render('resetPassword', {
                message: req.flash('error'),
                email: email
            })
        }
        else {
            throw new Error("Wrong OTP")
        }
    }
    catch (err) {
        console.log(err)
        req.flash('error', err.message)
        const email = req.body.email
        res.render('confirmOtp', {
            email: email,
            message: req.flash('error')
        })
    }
}

//render reset password page
module.exports.resetPassword = async (req, res) => {
    try {
        const user = await Users.findOne({ email: req.body.email })
        if (req.body.newpassword == req.body.confirmpassword) {
            const salt = await bcyrpt.genSalt(10)
            const hash = await bcyrpt.hash('req.body.newPassword', salt)
            await Users.findOneAndUpdate({ email: req.body.email }, { password: hash })
            return res.redirect('/auth/login')
        }
        else {
            throw new Error("Passwords do not match")
        }
    }
    catch (err) {
        console.log(err)
        req.flash('error', err.message)
        const email = req.body.email
        res.render('resetPassword', {
            email: email,
            message: req.flash('error')
        })
    }
}

//logout 
module.exports.logout = (req, res) => {
    req.logout()
    res.redirect('/')
}