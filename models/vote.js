const mongoose = require('mongoose')
const { Schema } = mongoose

const voteSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    votedOnId: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    onModel: {
        type: String,
        required: true,
        enum: ['Questions', 'Answers']
    }
})

const Vote = new mongoose.model('Vote', voteSchema)
module.exports = Vote