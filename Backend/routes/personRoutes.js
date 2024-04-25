const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');

// Using async and await
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log('Response saved');
        res.status(200).json(response); // Return saved response as JSON
    } catch (err) {
        console.log(err);

        // Handle duplicate key error for the unique username field
        if (err.code === 11000 && err.keyValue && err.keyValue.username) {
            return res.status(409).json({ error: 'Username must be unique' });
        }

        res.status(500).json({ error: 'Internal server error' }); // Send error response as JSON
    }
});


// GET method to retrieve all data of the Person
router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log('Data fetched from Person collection');
        res.status(200).json(data); // Return fetched data as JSON
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' }); // Send error response as JSON
    }
});

// Get info according to particular role --> PARAMETERIZED CALL
router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType.toLowerCase();
        if (workType === 'chef' || workType === 'waiter' || workType === 'manager') {
            const response = await Person.find({ role: workType });
            console.log('Response fetched');
            res.status(200).json({ response }); // Return fetched response as JSON
        } else {
            res.status(404).json({ error: 'Invalid work type' }); // Send error response as JSON
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' }); // Send error response as JSON
    }
});

// PUT METHOD to update a specific person's data
router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const updatedPersonData = req.body;
        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true,
            runValidators: true,
        });

        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }

        console.log('Data updated.');
        res.status(200).json(response); // Return updated response as JSON
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' }); // Send error response as JSON
    }
});

// DELETE method to delete a specific person
// DELETE method to delete a specific person
router.delete('/:id', async (req, res) => {
  try {
      const personId = req.params.id;

      // Validate if the provided ID is a valid ObjectId
      if (!mongoose.isValidObjectId(personId)) {
          return res.status(400).json({ error: 'Invalid ID format' });
      }

      const response = await Person.findByIdAndDelete(personId);
      if (!response) {
          return res.status(404).json({ error: 'Person not found' });
      }

      console.log('Data deleted');
      res.status(200).json({ message: 'Person deleted successfully' });
  } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
