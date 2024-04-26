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
    votes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
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

