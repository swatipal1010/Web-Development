const express = require('express');
const router = express.Router();
const SignUp = require('./../models/SignUp');
const { jwtAuthMiddleware, generateToken } = require('./../jwt');

// SIGNUP
// POST method to store the signup details of the customer and seller
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newPerson = new SignUp(data);
        const response = await newPerson.save(); // Wait until the data is saved
        console.log('Response saved');
        const token = generateToken(response.username);
        console.log("Token is: ", token);
        res.status(200).json({ response: response, token: token }); // Response is returned in JSON format
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' }); // Send error response as JSON with status 500
    }
});


// GET method to retrieve the data of the Seller or Customer
router.get('/', async (req, res) => {
    try {
        const data = await SignUp.find(); // Retrieve all documents from 'SignUp' collection
        console.log('Data fetched from SignUp collection');
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// SELLER or CUSTOMER endPoint for fetching info entered during signup
router.get('/:roleType', async (req, res) => {
    try {
        const roleType = req.params.roleType;
        if (roleType == 'seller' || roleType == 'customer') {
            const response = await SignUp.find({ role: roleType });
            console.log('Response fetched');
            res.status(200).json({ response });
        } else {
            res.status(404).json({ error: 'Invalid role type' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
