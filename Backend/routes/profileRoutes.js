const express = require('express');
const router = express.Router();
const Profile = require('./../models/Profile');

//Using async and await
router.post('/',async(req,res)=>{
    try{
      const data = req.body
      const newPerson = new Profile(data);
      const response = await newPerson.save()    //wait until the data is saved and then save the response(either success or failure) in the 'response' 
      console.log('Response saved');
      res.status(200).json(response);           //response is returned in json format
    }
    catch(err){
      console.log(err);
      res.status(500)({error: 'Internal server error'});
    }
  });


  //GET method to retrieve the data of the Person
router.get('/',async(req,res)=>{
    try{
      const data = await Profile.find();                 //all documents are retrieved from 'Person' collection
      console.log('Data fetched from Person collection');
      res.status(200).json(data); 
    }catch{
      console.log(err);
      res.status(500)({error: 'Internal server error'});
    }
  })

module.exports = router;