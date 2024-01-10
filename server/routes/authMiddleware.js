const authenticate = (req, res, next) => {
    
    console.log(req.originalUrl)
    if (req.isAuthenticated()) {
        return next()
    } 
    else if (req.originalUrl === '/workspace/confirm') {
        req.session.returnTo =  `${process.env.CLIENT_URL}/workspace/confirm`
        return res.redirect('/auth/google')
    } 
    else {
        res.status(401).json({ success: false, message: 'Unauthorized. Session expired', status: 401 })
    }

}

module.exports = authenticate