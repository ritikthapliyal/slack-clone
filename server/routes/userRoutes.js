const express = require('express')
const authenticate  = require('./authMiddleware')
const router = express.Router()
const AWS = require('../utils/aws')
const s3 = new AWS.S3()


router.get('/', authenticate , (req,res)=>{
   setTimeout(() => {
        res.status(200).json({ success: true, data: req.user, status: 200 });
    }, 1000)
})



router.get('/image/upload', authenticate , async (req,res)=>{
        
        const contentType = req.query?.contentType || 'image/jpeg'

        const parts = contentType.split('/')

        const fileName = `${req.user.googleId}_${Date.now()}.${parts[parts.length - 1]}`

        const params = {
          Bucket: 'slack-clone-user-data',
          Key: 'user_profile_images/' + fileName,
          Expires: 1000 * 60 * 2,
          ContentType: contentType,
          ACL: 'private',
        }
      
        try {
            const signedUrl = await s3.getSignedUrlPromise('putObject', params)
            res.status(200).json({ success: true, data : {signedUrl, fileName}, status: 200 })
        } catch (error) {
            console.log('Error generating presigned URL:', error)
        }
})




module.exports = router