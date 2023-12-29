require('dotenv').config()
const express = require('express')
const passport = require('passport')
const connectAndStartServer = require('./server')
var session = require('express-session')
var MongoDBStore = require('connect-mongodb-session')(session)


const authRoutes = require('./routes/authRoutes')

const app = express()

var store = new MongoDBStore({
    uri: process.env.MONGO_CONNECTION_URL,
    collection: 'sessions'
})


app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: {maxAge: 1000 * 60},
    store: store,
    resave: true,
    saveUninitialized: true
}))


app.use(passport.initialize())
app.use(passport.session())


app.use(express.json())
app.use('/auth',authRoutes)

app.get('/dashboard',(req,res)=>{
    console.log(req)
    res.send("running...")
})



connectAndStartServer(app)