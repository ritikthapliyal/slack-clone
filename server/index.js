require('dotenv').config()
const express = require('express')
const passport = require('passport')
const connectAndStartServer = require('./server')


const authRoutes = require('./routes/authRoutes')

const app = express()
app.use(passport.initialize())


app.use(express.json())
app.use('/auth',authRoutes)




connectAndStartServer(app)



