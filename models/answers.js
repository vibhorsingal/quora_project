const mongoose = require('mongoose')
const { Schema } = mongoose

const answersSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    questionId: {
        type: Schema.Types.ObjectId,
        ref: 'Questions'
    },
    upvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'Users',
    }],
    downvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }],
    answerBody: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
})

const Answers = new mongoose.model('Answers', answersSchema)
module.exports = Answers