require('dotenv').config()
//require express
const express = require('express')
const app = express()

//setting up cookies and sessions
const session = require('express-session')
const MongoStore = require('connect-mongo')
const store = MongoStore.create({ mongoUrl: process.env.MONGO_URL, collectionName: 'sessions' })
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
}))

//passport 
const passport=require('passport')
const passportLocal=require('./config/passport_local')
const passportGoogle=require('./config/passport_google')

app.use(passport.initialize())
app.use(passport.session())

const loginRoute = require('./routes/loginRoute')
const questionsRoute= require('./routes/questionsRoute')
//configuring database
require('./config/database')

app.use('/', express.static(__dirname + '/public'))
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//loading the routes
app.use('/', loginRoute)
app.use('/query',questionsRoute)
//server listening on port 5000
app.listen(5000, () => {
    console.log(`server started at http://localhost:5000`)
})