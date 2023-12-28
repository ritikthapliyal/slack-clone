require('dotenv').config()
const express = require('express')
const passport = require('passport')

const authRoutes = require('./routes/authRoutes')

const app = express()
app.use(passport.initialize())


app.use(express.json())
app.use('/auth',authRoutes)


// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
