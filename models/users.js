const mongoose = require('mongoose')
const { Schema } = mongoose
const multer = require('multer')
const path = require('path')
const AVATAR_PATH = path.join('/uploads/users/avatars')

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },

    name: {
        type: String,
        required: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
        trim: true
    },

    questionsAsked: [{
        type: Schema.Types.ObjectId,
        ref: 'Questions'
    }],

    answers: [{
        type: Schema.Types.ObjectId,
        ref: 'Answers'
    }],

    avatar: {
        type: String
    },

    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }],

    following: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }],

    upVotes: [{
        type: Schema.Types.ObjectId,
        ref: 'Vote'
    }],
    downVotes: [{
        type: Schema.Types.ObjectId,
        ref: 'Vote'
    }],
    otp: {
        type: Number,
        default: 0
    }

}, {
    timestamps: true
})

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', AVATAR_PATH))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

userSchema.statics.uploadAvatar = multer({ storage: storage }).single('avatar')
userSchema.statics.avatarPath = AVATAR_PATH

const Users = new mongoose.model('Users', userSchema)
module.exports = Users