const mongoose = require('mongoose')
const { Schema } = mongoose

const questionsSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    questionBody: {
        type: String,
        required: true,
        trim: true
    },
    answers: [{
        type: Schema.Types.ObjectId,
        ref: 'Answers'
    }],
    downvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }],
    upvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }]
}, {
    timestamps: true
})

const Questions = new mongoose.model('Questions', questionsSchema)
module.exports = Questions