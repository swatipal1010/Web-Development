const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { jwtAuthMiddleware, generateToken } = require('../jwt');

// SIGNUP
// POST method to store the signup details of the voter
router.post('/signup', async (req, res) => {
    try {
        const data = req.body;          //Extract the data from the request body

        //create a new User document using the mongoose model
        const newUser = new User(data);

        //save new user to the database
        const response = await newUser.save();
        console.log('Response saved');

        //We just want the id to be the part of the payload that helps to count the vote of that user
        const payload = {
            id: response.id,
        }
        console.log(JSON.stringify(payload));
        const token = generateToken(payload);
        console.log("Token is: ", token);
        res.status(200).json({ response: response, token: token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


//Login Route
router.post('/login', async (req, res) => {
    try {
        //Extract aadharcardNumber and password from the request body
        const { aadharCardNumber, password } = req.body;

        //Find the user by aadhar Card Number
        const user = await User.findOne({ aadharCardNumber: aadharCardNumber});

        //If user doesn' exists or password doesn't match, return error
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        //generate token
        const payload = {
            id: user.id,
        };
        const token = generateToken(payload);

        //return token as response
        res.json({ token });
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
