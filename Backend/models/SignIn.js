const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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


signIn.pre('save', async function(next){          //'pre' is the middleware that executes when save operation gets triggered
    const person = this;
    //hash the password only if has been modified or it is new
    if(!person.isModified('password')) return next();
    try{
        //Hash password generation
        const salt = await bcrypt.genSalt(10);  //bcrypt.genSalt() is used to generate a salt which is then used to hash the password

        //hash password
        const hashedPassword = await bcrypt.hash(person.password, salt);

        //Override the plain password with the hashed password
        person.password = hashedPassword;

        next();
    }catch(err){
        return next(arr);
    }
})

signIn.methods.comparePassword = async function(candidatePassword){ //comparePassword method is used in auth.js to compare the password provided by the user and hashed password
    try{
        //use bcrypt to comapare the password provided by the user and hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password)
        return isMatch;
    }catch(err){
        throw err;
    }
}


const SignIn = mongoose.model('SignIn', signIn);
module.exports = SignIn;