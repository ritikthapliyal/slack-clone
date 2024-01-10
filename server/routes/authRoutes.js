const express = require('express')
const router = express.Router()
const passport = require('../utils/Passport')

router.get('/google',passport.authenticate('google', { scope: ['profile', 'email'] }))
  
router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/login' 
}), (req, res) => {
    const redirectUrl = req.session.returnTo || `${process.env.CLIENT_URL}/workspace`
    delete req.session.returnTo
    res.redirect(redirectUrl)
})

module.exports = router