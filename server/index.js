require('dotenv').config()
const express = require('express')
const passport = require('passport')
const connectAndStartServer = require('./server')
var session = require('express-session')
const cors = require('cors')
const authenticate = require('./routes/authMiddleware')


var MongoDBStore = require('connect-mongodb-session')(session)


const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const workspaceRoutes = require('./routes/workspaceRoutes')

const app = express()
app.use(express.json())

const corsOptions = {origin: 'http://localhost:3000', credentials: true} 
app.use(cors(corsOptions))


var store = new MongoDBStore({
    uri: process.env.MONGO_CONNECTION_URL,
    collection: 'sessions'
})


app.use(session({
    secret: process.env.SESSION_SECRET,
    name : 'slack-clone',
    cookie: {maxAge: 1000 * 60 * 20},
    store: store,
    resave: true,
    saveUninitialized: true
}))



app.use(passport.initialize())
app.use(passport.session())



app.use('/auth',authRoutes)
app.use('/user',authenticate,userRoutes)
app.use('/workspace',authenticate,workspaceRoutes)


connectAndStartServer(app)