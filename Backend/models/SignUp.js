const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const signUp = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type:String,
        unique: true,
        required: true,
    },
    role:{
        type: String,
        enum :['seller','customer'],
        required: true,
    },
    password:{
        type:String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    verificationToken: {
        type: String
    },
    passwordResetToken: {
        type: String
    }  
});

const SignUp = mongoose.model('SignUp', signUp);
module.exports = SignUp;
