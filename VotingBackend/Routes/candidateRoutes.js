const express = require('express');
const router = express.Router();
const Candidate = require('../models/candidate');
const { jwtAuthMiddleware, generateToken } = require('../jwt');


// POST route to add a candidate
router.post('/', async (req, res) => {
    try {
        const data = req.body;          //Extract the data from the request body

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


//Profile route specific to each user
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try {
        const userData = res.user;
        console.log('User data:', userData);
        const userId = userData.id;
        const user = await User.findById(userId);
        res.status(200).json({ user }); // Send user details as response
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


//PUT method to change the password of the user --> Profile can be used to change the password of the user
router.put('/profile/password',jwtAuthMiddleware, async(req,res)=>{
    try {
        const userId = req.user;        //Extract the user id from the token
        const {currentPassword, newPassword}= req.body; //Extract the current password and new password from the request body   

        //Find the user by userId
        const user = await User.findById(userId);

        //If password doesn't match, return error
        const isMatch = await user.comparePassword(currentPassword);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        //Update the user password (done after the old password is verified)
        user.password = newPassword;
        await user.save();


        console.log('Password updated.');
        res.status(200).json({ message: "Password updated" }); // Return updated response as JSON
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' }); // Send error response as JSON
    }
})



module.exports = router;
