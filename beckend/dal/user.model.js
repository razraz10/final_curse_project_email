const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        require: true,
        minLength: 2,
        maxLength: 10
    }, 
    lastName:{
        type: String,
        require: true,
        minLength: 2,
        maxLength: 15
    },
    email:{
        type: String,
        require: true,
        minLength: 5,
        maxLength: 100,
        unique: true
    },
    password:{
        type: String,
        require: true,
        minLength: 5,
        maxLength: 1024
    },
    accessToken:{
        type: [String]
    },
    profilePic:{
        type: String,
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    }
})

const userModel = mongoose.model('user', userSchema)
module.exports = userModel

