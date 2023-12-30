const passport = require('passport')
const User = require('../models/UserModel')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const AWS = require('./aws')
const dynamodb = new AWS.DynamoDB.DocumentClient()

const credentials = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
}

const callback_function = async (accessToken, refreshToken, profile, done) => {
    
    try{                                             
        
        // mongodb
        // let user = await User.findOne({googleId : profile.id})

    
        const get_params = {
            TableName: 'Users',
            Key: { googleId : profile.id }
        }
        
        let {Item} = await dynamodb.get(get_params).promise()

        if(!Item){

            const user = {
                username: profile.displayName,
                googleId: profile.id,
                email: profile.emails[0].value,
                workspaces : [],
                workspace_emails : []
            }

            const update_params = {
                TableName: 'Users',
                Item: user,
            }

            await dynamodb.put(update_params).promise()
            done(null,user)

        }
        else{
            done(null,Item)
        }


    }
    catch(err){
        console.log(err)
        return done(err)
    }
}



passport.serializeUser((user,done)=>{
    done(null,user.googleId)
})



//retrieves data using session object. {session.passport.user}
passport.deserializeUser(async (googleId,done)=>{ 
    try{
        
        // const user = await User.findById(userId)
        
        const get_params = {
            TableName: 'Users',
            Key: { googleId }
        }
        
        let {Item} = await dynamodb.get(get_params).promise()

        return done(null,Item)

    }catch(err){
        return done(err)
    }
})


const googleStrategy = new GoogleStrategy(credentials,callback_function)
passport.use(googleStrategy)

module.exports = passport