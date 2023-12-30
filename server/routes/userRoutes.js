const express = require('express')
const authenticate  = require('./authMiddleware')
const router = express.Router()



router.get('/', authenticate , (req,res)=>{

   setTimeout(() => {
        res.status(200).json({ success: true, data: req.user, status: 200 });
    }, 5000)

})



module.exports = router