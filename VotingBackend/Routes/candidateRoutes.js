const express = require('express');
const router = express.Router();
const Candidate = require('../models/candidate');
const { jwtAuthMiddleware, generateToken } = require('../jwt');
const User = require('../models/user');                             // Import the User model

const checkAdminRole = async(userId)=>{
    try{
        const user = await User.findById(userId);
        if(user.role === 'admin'){
            return true;
        };
    }catch(err){
        return false;
    }
}

// POST route to add a candidate
router.post('/',jwtAuthMiddleware, async (req, res) => {
    try {
        if(! await checkAdminRole(req.user.id))
            return res.status(403).json({message: 'User has no admin role.'});

        const data = req.body;          //Assuming the request body contains the candidate's data

        //create a new Candidate document using the mongoose model
        const newCandidate = new Candidate(data);

        //save new candidate to the database
        const response = await newCandidate.save();
        console.log('Response saved');

        res.status(200).json({ response: response });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


//PUT method to change the details of the candidate. Action can be performed by the admin only.
router.put('/:candidateID',jwtAuthMiddleware, async(req,res)=>{
    try {
        if(!checkAdminRole(req.user.id))
            return res.status(403).json({message: 'User has no admin role.'});

        const candidateID = req.params.candidateID;
        const updatedCandidateData = req.body;
        const response = await Person.findByIdAndUpdate(candidateID, updatedCandidateData, {
            new: true,
            runValidators: true,
        });

        if (!response) {
            return res.status(404).json({ error: 'Candidate not found' });
        }

        console.log('Candidate Data updated.');
        res.status(200).json(response); // Return updated response as JSON
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' }); // Send error response as JSON
    }
})



//DELETE method to delete the details of the candiadet. Action can be performed by the admin only.
router.delete('/:candidateID',jwtAuthMiddleware, async(req,res)=>{
    try {
        if(!checkAdminRole(req.user.id))
            return res.status(404).json({message: 'User has no admin role.'});

        const candidateID = req.params.candidateID;
        const response = await Person.findByIdAndDelete(candidateID);

        if (!response) {
            return res.status(404).json({ error: 'Candidate not found' });
        }

        console.log('Candidate deleted.');
        res.status(200).json(response); // Return updated response as JSON
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' }); // Send error response as JSON
    }
})


//Let's start voting
router.post('/vote/:candidateID',jwtAuthMiddleware, async(req,res)=>{
    //No admin can vote
    ///User can vote only once
    candidateID = req.params.candidateID;
    userId = req.user.id;
    try {
        //find the candidate document with the specified candidateID
        const candidate = await Candidate.findById(candidateID);
        if(!candidate){
            return res.status(404).json({error: 'Candidate not found'});
        }

        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({error: 'User not found'});
        }
        if(user.isVoted){
            return res.status(403).json({error: 'You has already voted'});
        }
        if(user.role=='admin'){
            return res.status(403).json({error: 'Admin cannot vote'});
        }

        //Update the candidate document to record the vote
        candidate.votes.push({user:userId});
        candidate.voteCount++;
        await candidate.save();

        //update the user document
        user.isVoted = true;
        await user.save();

        res.status(200).json({message: 'Vote recorded'});

    }catch(err){
        return res.status(500).json({error: 'Internal server error'});
    }
})


//Vote Count
router.get('/vote/count', async(req,res)=>{
    try{
        //find all candidates and sort them in descending order of the voteCount
        const candidate = await Candidate.find().sort({voteCount: 'desc'});

        //map the candidates to only return their name and vote count
        const voteRecord = candidate.map((data)=>{
            return {
                party: data.party,
                count: data.voteCount
            }
        });
        return res.status(200).json(voteRecord);
    }catch(err){
        return res.status(500).json({error: 'Internal server error'});
    }
})


//Get the candidate list
router.get('/candidate', async(req,res)=>{
    try{
        //list of candidates
        
    }catch(err){
        return res.status(500).json({error: 'Internal server error'});
    }
})


module.exports = router;
