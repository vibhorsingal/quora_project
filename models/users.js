const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique:true
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
    questionsAsked:[{
        type:Schema.Types.ObjectId,
        ref:'Questions'
    }],
    answers:[{
        type:Schema.Types.ObjectId,
        ref:'Answers'
    }]
},{
    timestamps:true
})

const Users = new mongoose.model('Users',userSchema)
module.exports=Users