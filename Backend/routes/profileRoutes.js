const express = require('express');
const router = express.Router();
const Profile = require('./../models/Profile');


// POST method to create a new profile (assuming this is for creating a profile)
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newProfile = new Profile(data);
        const response = await newProfile.save();
        console.log('Profile created successfully');
        res.status(200).json(response); // Return saved profile as JSON
    } catch (err) {
        console.error('Error creating profile:', err);
        res.status(500).json({ error: 'Internal server error' }); // Send error response as JSON
    }
});

// GET method to retrieve all profiles (assuming this is for fetching all profiles)
router.get('/',async (req, res) => {
    try {
        const profiles = await Profile.find();
        console.log('Profiles fetched successfully');
        res.status(200).json(profiles); // Return fetched profiles as JSON
    } catch (err) {
        console.error('Error fetching profiles:', err);
        res.status(500).json({ error: 'Internal server error' }); // Send error response as JSON
    }
});

module.exports = router;
