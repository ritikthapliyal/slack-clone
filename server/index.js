require('dotenv').config()
const AWS = require('./utils/aws')
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


//
app.post('/put_entry',async (req,res)=>{

    const dynamodb = new AWS.DynamoDB.DocumentClient()

    const params = {
        TableName: 'Sessions',
        Item: {
          session_id: '123',
          user_id: 'RITIK',
          created_at: Date.now()
        },
    }
    
    try{
        await dynamodb.put(params).promise()
        res.send("data entered....")
    }
    catch(err){
        console.log(err)
        res.send("something went wrong....")
    }

})



connectAndStartServer(app)