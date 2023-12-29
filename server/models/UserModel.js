const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: String,
    googleId: String,
    email: String,
})

// Defines the User model based on the UserSchema and specifies the collection name as 'Users'
const User = mongoose.model('User', UserSchema, 'Users')

module.exports = User