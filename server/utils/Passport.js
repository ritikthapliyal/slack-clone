const passport = require('passport')
const User = require('../models/UserModel')
const GoogleStrategy = require('passport-google-oauth20').Strategy


const credentials = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
}

const callback_function = async (accessToken, refreshToken, profile, done) => {
    try{                                             
        
        let user = await User.findOne({googleId : profile.id})
        
        if(!user){
            user = await User.create({
                username: profile.displayName,
                googleId: profile.id,
                email: profile.emails[0].value
            })
        }

        done(null,user)

    }catch(err){
        console.log(err)
        return done(err)
    }
}



passport.serializeUser((user,done)=>{
    done(null,user.id)
})


passport.deserializeUser(async (userId,done)=>{ 
    try{
        const user = await User.findById(userId)
        return done(null,user)
    }catch(err){
        return done(err)
    }
})


const googleStrategy = new GoogleStrategy(credentials,callback_function)
passport.use(googleStrategy)

module.exports = passport