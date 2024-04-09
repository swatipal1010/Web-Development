const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');

//Using async and await
router.post('/',async(req,res)=>{
    try{
      const data = req.body
      const newPerson = new Person(data);
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
      const data = await Person.find();                 //all documents are retrieved from 'Person' collection
      console.log('Data fetched from Person collection');
      res.status(200).json(data); 
    }catch{
      console.log(err);
      res.status(500)({error: 'Internal server error'});
    }
  })


  //Get info accor. to particular role --> PARAMETERIZED CALL
router.get('/:workType',async(req,res)=>{     // ':' indicates what follows is a variable
    try{
      const workType = req.params.workType.toLowerCase();   //Extract workType from the request URL paramater and store it in a variable 'workType'
      if(workType=='chef' || workType=='waiter' || workType == 'manager'){      //variable workType can only take values 'chef' or 'waiter' or 'manager'
        const response = await Person.find({role:workType});
        console.log('Response fetched');
        res.status(200).json({response});
      }else{
        res.status(404).json({error:'Invalid work type'});
      }
    }catch{
      console.log(err);
      res.status(500)({error: 'Internal server error'});
    }
      
})


//PUT METHOD
router.put('/:id',async(req,res)=>{      //'id' is the varaiable that stores the unique id that is associated with each record/document
    try{
      const personId = req.params.id;                         //Extract the is from the URL paramater
      const  updatedPersonData = req.body;                    //Updated data for thr person whose id is stored in 'id' variable
      const response = await Person.findByIdAndUpdate(personId, updatedPersonData,{
        new : true,                                           //Return the updated document
        runValidators : true,                                 //Run mongoose validators
      });

      if(!response){
        return res.status(404).json({error: 'Person not found'});
      }

      console.log('Data updated.');
      res.status(200).json(response);
     
    }
    catch(err){
      console.log(err);
      res.status(500)({error: 'Internal server error'});
    }
})

module.exports = router;