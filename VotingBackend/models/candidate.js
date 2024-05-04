const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


//define person schema/model
const candidateSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,   //mandatory field
    },
    
    party:{
        type:String,
        required: true
    },
    
    age:{
        type:Number,
        required: true
    },
    votes: [                                                //array of objects
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,       //user gets the id that mongodb assigns at the time of record creation
                ref: 'User',                                //where does this id come from? -> From 'User' table
                required: true
            },
            votedAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    voteCount:{                             //Candidate has registered only but the voting hasn't been started yet
        type: Number,
        default: 0
    }

    
});

const Candidate = mongoose.model('Candidate', candidateSchema);
module.exports = Candidate;

