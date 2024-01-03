const express = require('express')
const router = express.Router()
const AWS = require('../utils/aws')
const DynamoDB = new AWS.DynamoDB.DocumentClient()

// router.get('/', authenticate , (req,res)=>{
//    setTimeout(() => {
//         res.status(200).json({ success: true, data: req.user, status: 200 });
//     }, 5000)
// })



router.post('/', async (req,res)=>{
        
        const {workspace_name, invite_emails, photo} = req.body
        
        const new_workspace = {
            name : workspace_name,
            id : `${req.user.googleId}_${Date.now()}`,
            invite_emails
        }
        
        const updated_workspaces = [...req.user.workspaces, new_workspace]

        try {

            const update_params = {
                TableName: 'Users',
                Key: { googleId: req.user.googleId},
                UpdateExpression: 'SET workspaces = :updated_workspaces , photo=:photo',
                ExpressionAttributeValues: {
                    ':updated_workspaces': updated_workspaces,
                    ':photo': `${process.env.S3_URL}${photo}`,
                }
            }

            await DynamoDB.update(update_params).promise()

            const put_params = {
                TableName: 'Workspaces',
                Item: {
                    id: new_workspace.id,
                    workspace_name : new_workspace.name
                }
            }

            await DynamoDB.put(put_params).promise()
            res.status(200).json({ success: true, message : "successful", status: 200 })

        } catch (error) {
            console.log('Error : ', error)
        }
})

module.exports = router