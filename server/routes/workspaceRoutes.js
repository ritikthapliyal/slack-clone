const express = require('express')
const router = express.Router()
const AWS = require('../utils/aws')
const DynamoDB = new AWS.DynamoDB.DocumentClient()
const lambda = new AWS.Lambda()


// router.get('/', authenticate , (req,res)=>{
//    setTimeout(() => {
//         res.status(200).json({ success: true, data: req.user, status: 200 });
//     }, 5000)
// })


router.post('/', async (req,res)=>{

        const {workspace_name, invite_emails, photo, username} = req.body
        
        const new_workspace = {
            name : workspace_name,
            workspace_photo : `${process.env.S3_URL}${photo}`,
            id : `${req.user.googleId}_${Date.now()}`,
        }

        const updated_workspaces = [...req.user.workspaces, new_workspace]

        try {

            // const params = {
            //     FunctionName: 'slack-clone-microservice',
            //     InvocationType: 'Event', // or 'Event' for asynchronous invocation
            //     Payload: JSON.stringify({
            //         task : "send_email",
            //         user_details : {
            //             username : username || req.user.username,
            //             workspace_name : new_workspace.workspace_name
            //         },
            //         invite_emails : new_workspace.invite_emails
            //     })
            // }

            // await lambda.invoke(params).promise()

            const update_params = {
                TableName: 'Users',
                Key: { googleId: req.user.googleId},
                UpdateExpression: 'SET workspaces = :updated_workspaces, username = :username',
                ExpressionAttributeValues: { ':updated_workspaces': updated_workspaces, ':username': username}
            }

            await DynamoDB.update(update_params).promise()

            const put_params = {
                TableName: 'Workspaces',
                Item: {
                    id: new_workspace.id,
                    workspace_name : new_workspace.name,
                    workspace_photo : new_workspace.workspace_photo,
                    workspace_admin : req.user.googleId
                }
            }

            await DynamoDB.put(put_params).promise()
            res.status(200).json({ success: true, message : "successful", status: 200 })

        } catch (error) {
            console.log('Error : ', error)
            res.status(500).json({ success: true, message : "successful", status: 500 })
        }
})

module.exports = router