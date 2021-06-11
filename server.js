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

const authRoute = require('./routes/authRoute')
const questionsRoute= require('./routes/questionsRoute')
const profileRoute=require('./routes/profileRoute')
//configuring database
require('./config/database')

app.use('/', express.static(__dirname + '/public'))
app.use('/uploads',express.static(__dirname+ '/uploads'))
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//loading the routes
app.use('/auth', authRoute)
app.use('/',questionsRoute)
app.use('/user',profileRoute)
//server listening on port 5000
app.listen(5000, () => {
    console.log(`server started at http://localhost:5000`)
})