const { response } = require('express')
const Users = require('../models/users')

module.exports.getProfile = async (req, res) => {
    try {
        const user = await Users.findById(req.user.id).populate({ path: 'questionsAsked', populate: { path: 'answers' } }).populate({ path: 'answers', populate: { path: 'questionId' } })
        res.render('profile', {
            user: user
        })
    }
    catch (err) {
        console.log(err)
    }
}

//get profile by id
module.exports.getProfileById = async (req, res) => {
    try {
        const user = await Users.findById(req.params.uid).populate({ path: 'questionsAsked', populate: { path: 'answers' } }).populate({ path: 'answers', populate: { path: 'questionId' } })
        return res.render('otherProfile', {
            user: user
        })
    }
    catch (err) {
        console.log(err)
    }
}

//edit profile
module.exports.editProfile = async (req, res) => {
    try {
        const user = await Users.findById(req.user.id)
        Users.uploadAvatar(req, res, (err) => {
            if (err) {
                console.log(err)
            }
            user.name = req.body.newName
            if (req.file) {
                console.log(req.file.filename)
                user.avatar = Users.avatarPath + '/' + req.file.filename
            }
            user.save()
            return res.redirect('/auth/login')
        })

    }
    catch (err) {
        console.log(err)
    }
}

//follow controllers
module.exports.followUser = async (req, res) => {
    try {
        const followUser = await Users.findById(req.params.aid)
        followUser.followers.push(req.user.id)
        followUser.save()
        const user = await Users.findById(req.user.id)
        user.following.push(req.params.aid)
        user.save()
        res.send(user)
    }
    catch (err) {
        console.log(err)
    }
}