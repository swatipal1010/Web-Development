const express = require('express');
const router = express.Router();
const UploadItem = require('./../models/UploadItem');       
const passport = require('passport');
const { jwtAuthMiddleware, generateToken } = require('./../jwt');

// POST method to save a new item
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newItem = new UploadItem(data);
        const response = await newItem.save();
        console.log('Item saved successfully');
        res.status(200).json(response); // Return saved item as JSON response
    } catch (err) {
        console.error('Error saving item:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


//const localAuthMiddleware = passport.authenticate('local', { session: false })
// GET method to retrieve all items
router.get('/',jwtAuthMiddleware, async (req, res) => {
    try {
        const items = await UploadItem.find(); // Retrieve all items from UploadItem collection
        console.log('Items fetched from UploadItem collection');
        res.status(200).json(items); // Return items as JSON response
    } catch (err) {
        console.error('Error fetching items:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
