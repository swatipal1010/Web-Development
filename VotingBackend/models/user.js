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
        type: String,
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

userSchema.pre('save', async function(next){          //'pre' is the function that executes when save operation gets triggered
    const person = this;
    //hash the password only if has been modified or it is new
    if(!person.isModified('password')) return next();
    try{
        //Hash password generation
        const salt = await bcrypt.genSalt(10);

        //hash password
        const hashedPassword = await bcrypt.hash(person.password, salt);

        //Override the plain password with the hashed password
        person.password = hashedPassword;

        next();
    }catch(err){
        return next(arr);
    }
})

userSchema.methods.comparePassword = async function(candidatePassword){
    try{
        //use bcrypt to comapare the password provided by the user and hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password)
        return isMatch;
    }catch(err){
        throw err;
    }
}

const User = mongoose.model('User', userSchema);
module.exports = User;

