const express = require('express')
const router = express.Router()
const passport = require('../utils/Passport')

router.get('/google',passport.authenticate('google', { scope: ['profile', 'email'] }))
  
router.get('/google/callback',passport.authenticate('google', {
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: '/login' 
    })
)

module.exports = router