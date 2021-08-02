const mongoose = require('mongoose')
const url = process.env.MONGODB_URI || process.env.MONGO_URL
const connection = mongoose.connect(url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(() => {
        console.log('connection to database successfull')
    })
    .catch((err) => {
        console.log(err)
    })