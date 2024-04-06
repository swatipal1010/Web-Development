// import * as fs from 'fs';
// import {say} from 'cowsay';



// console.log("Hello world!!");
// const output = say({text:'moooo'});
// console.log(output);



// const jsonString = '{"name":"Swati", "age":15, "City":"Dehradun"}';
// const jsonObj = JSON.parse(jsonString);               // Parsing the JSON string into a JavaScript object
// console.log(jsonObj.name);                            // Accessing the name property of the parsed object

// const objToConvert = {name:"Swati", age:25, City:"Dehradun"};
// const jsonobj = JSON.stringify(objToConvert);
// console.log(jsonobj);



const express = require('express')
const app = express()
const db = require('./db')                          //Connection of nodejs with mongodb
const Person = require('./models/Person');

const bodyParser = require('body-parser'); 
app.use(bodyParser.json());               //body parser extracts the json data from the body of the client request and converts it to object and store it in req.body

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/aboutUs', (req, res)=>{
  res.send("Hey there!! We are the creators of StackBid");
})

app.get('/history', (req,res)=>{
  var obj ={
    actor: "seller",
    status : "sold",
    itmes: 10
  }
  res.json(obj);
})

app.post('/items',(req, res)=>{
  res.send("Data is saved.");
})


//POST route to add a person
/* 
app.post('/person',(req,res)=>{
    const data = req.body                                         //data being received from the client request is stored in req.body
  //create a new Person document using the Mongoose model
    const newPerson = new Person(data);

  //Declaring data the below way is lengthy process, thus we pass 'data' as argument in the above line
  
  newPerson.name = data.name;     //Since 'data' contains the person details stored in it, we save the person name into 'newPerson' using data.name
  newPerson.age = data.age;
  newPerson.email = data.email;
  newPerson.mobile = data.mobile;
  newPerson.address = data.address; 
  
  
  
// Assuming 'newPerson' is a Mongoose model instance
//The below code uses callback func which is now-a-days is deprecated, thus we use Async and await
newPerson.save((error, savedPerson) => {
  if (error) {
    console.log('Error saving person:', error);
    res.status(500).json({ error: 'Internal server error' });
  } else {
    console.log('Data saved successfully');
    res.status(200).json(savedPerson);
  }
}) 
}); */

//Using async and await
app.post('/person',async(req,res)=>{
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

app.listen(3000, ()=>{
  console.log("Server is running on port 3000");
})

