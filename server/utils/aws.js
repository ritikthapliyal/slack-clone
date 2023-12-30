const AWS = require('aws-sdk')

AWS.config.update({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
    region: 'ap-south-1',
})

module.exports = AWS

