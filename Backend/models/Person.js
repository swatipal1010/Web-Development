const mongoose = require('mongoose');

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
    email: {
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
    }
});


//Model is the blueprint of the database i.e. what all you're going to add in the database
//Create Person model (used to perform operations on database)
const Person = mongoose.model('Person', personSchema);
module.exports = Person;
