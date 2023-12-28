const express = require('express')
const router = express.Router()
const passport = require('../utils/Passport')

router.get('/google',passport.authenticate('google', { scope: ['profile', 'email'] }))
  
router.get('/google/callback',passport.authenticate('google', {
        successRedirect: '/dashboard', // Redirect to dashboard on successful authentication
        failureRedirect: '/login' // Redirect to login page on failure
    })
)


module.exports = router