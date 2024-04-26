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
        const response = await newPerson.save();
        console.log('Response saved');
        const payload = {
            id: response.id,
            username: response.username
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
        const { username, password } = req.body;
        const user = await SignUp.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        const payload = {
            id: user.id,
            username: user.username
        };
        const token = generateToken(payload);
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
        const user = await SignUp.findById(userId);
        res.status(200).json({ user }); // Send user details as response
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET method to retrieve the data of the Seller or Customer
router.get('/', jwtAuthMiddleware, async (req, res) => {
    try {
        const data = await SignUp.find();
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
