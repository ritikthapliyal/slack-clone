const authenticate = (req, res, next) => {

    if (req.isAuthenticated()) {
      return next()
    }

    res.status(401).json({success:false,message:'Unauthorized. Session expired',status:401})
}

module.exports = authenticate