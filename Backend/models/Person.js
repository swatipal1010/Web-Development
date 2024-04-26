const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


//define person schema/model
const personSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,   //mandatory field
    },
    age:{
        type:Number
    },
    role:{
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String
    },
    salary: {
        type: Number,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});



personSchema.pre('save', async function(next){          //'pre' is the function that executes when save operation gets triggered
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


personSchema.methods.comparePassword = async function(candidatePassword){
    try{
        //use bcrypt to comapare the password provided by the user and hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password)
        return isMatch;
    }catch(err){
        throw err;
    }
}

//Model is the blueprint of the database i.e. what all you're going to add in the database
//Create Person model (used to perform operations on database)
const Person = mongoose.model('Person', personSchema);
module.exports = Person;
