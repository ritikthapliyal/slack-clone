const getEmailTemplate = (username, workspaceName)=> {

    return `<!DOCTYPE html>
    <html>
    <head>
        <title>Workspace Invitation</title>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap" rel="stylesheet">
    </head>
    <body style="height: fit-content;margin: 0; padding: 1rem;font-family: 'Poppins', sans-serif; display: block;">
            <div style="margin-top: 2rem; font-size: 2.6rem; font-weight: 500; color: rgb(80, 80, 80);">
                <img src="https://slack-clone-user-data.s3.ap-south-1.amazonaws.com/user_profile_images/slack.png" alt="Logo" style="width: 80px; display: block; margin: auto;" />
                <span style="text-align: center; display: block;">slack-clone</span>
            </div>
            <p style="font-size: 1rem; text-align: center; margin-top: 2rem;">
                <b>${username}</b> invited you to join the workspace <b>${workspaceName}</b>
            </p>
            <a href="${process.env.WORKSPACE_CONFIRMATION_URL}" style="display: block; margin: auto; width: fit-content; padding: 1rem 1.4rem; text-decoration: none; color: white; background-color: #642065;">Accept Invite</a>
    </body>
    </html>`        
}

module.exports = getEmailTemplate