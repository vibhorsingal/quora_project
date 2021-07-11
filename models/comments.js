const mongoose = require('mongoose')
const { Schema } = mongoose

const commentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    body: {
        type: String,
        trim: true,
        required: true
    },
    on: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    onModel: {
        type: String,
        required: true,
        enum: ['Comments', 'Answers']
    }
}, {
    timestamps: true
})

const Comments = new mongoose.model('Comments', commentSchema)
module.exports = Comments