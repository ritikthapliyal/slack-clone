const nodemailer = require("nodemailer")
const {google} = require("googleapis")

app.post('/sendEmail',async (req,res)=>{
    
    const {user_details, invite_emails} = req.body
    
    console.log(invite_emails)

    const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID,process.env.CLIENT_SECRET,process.env.REDIRECT_URI)
    oAuth2Client.setCredentials({ refresh_token : process.env.REFRESH_TOKEN})

    try{

        const accessToken = await oAuth2Client.getAccessToken()

        let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
                type: 'OAuth2',
                user: process.env.EMAIL,
                // pass: process.env.PASS,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken : accessToken.token
            },
        })
        
        const emailsPromises = invite_emails.map((email) => {
            
            const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: 'Workspace Invitation',
                text: `${user_details.email} invited to join the workspace ${user_details.workspace_name}.`,
            }
            
            return transporter.sendMail(mailOptions)
            
        })
        
        await Promise.all(emailsPromises)
          
        res.send("email sent")
      } catch (error) {
        console.log(error)
        res.send("email not sent")
      }

})