const mongoose = require('mongoose');

//define profile schema/model
const profileSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,   //mandatory field
    },
    gender:{
        type:String
    },
    mobile: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
});


//Model is the blueprint of the database i.e. what all you're going to add in the database
//Create Person model (used to perform operations on database)
const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;
