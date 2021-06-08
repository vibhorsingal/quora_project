const mongoose = require('mongoose')
const connection = mongoose.connect(process.env.MONGO_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(()=>{
    console.log('connection to database successfull')
})
.catch((err)=>{
    console.log(err)
})