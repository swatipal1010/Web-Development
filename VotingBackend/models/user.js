const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


//define person schema/model
const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,   //mandatory field
    },
    
    age:{
        type:Number,
        required: true
    },

    email:{
        type: String,
    },

    mobile:{
        type: Number,
    },

    address:{
        type: String,
        required: true
    },

    aadharCardNumber:{
        type: Number,
        unique: true,
        required: true
    },

    role:{
        type: String,
        enum :['admin','voter'],
        default: 'voter'
    },

    isVoted:{
        type: Boolean,
        default: false          //By default the value is set to false considering that the user has not voted yet when he/she logins for the first time
    },
    
    password:{
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;

