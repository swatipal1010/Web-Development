const mongoose = require('mongoose');

const signIn = new mongoose.Schema({

    email:{
        type:String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum :['seller','customer'],
        required: true
    }
    
});

const SignIn = mongoose.model('SignIn', signIn);
module.exports = SignIn;