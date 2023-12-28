const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy


const credentials = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
}

const callback_function = (accessToken, refreshToken, profile, done) => {
    // You can handle user creation and authentication here using the profile info
    // For example:
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });

    console.log(profile)

    return done(null, profile)
}



passport.serializeUser((user, done) => {
    done(null, user)
})
  
passport.deserializeUser((user, done) => {
    done(null, user)
})



passport.use(new GoogleStrategy(credentials, callback_function))

module.exports = passport