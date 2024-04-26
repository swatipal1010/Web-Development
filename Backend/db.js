const mongoose = require('mongoose');
require('dotenv').config();

//Define the mongodb connection
/*const mongoURL = process.env.MONGODB_URL_LOCAL; */            //'hotels' is the name of the database
const mongoURL = process.env.MONGODB_URL;

//Connection establishment of MongoDB
mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

//Get the default connection
//Mongoose maintains a default connection object representing the Mongoose connection
const db = mongoose.connection;


//Default event listeners for database listeners
db.on('connected',()=>{
    console.log('Connected to MongoDb server');
});

db.on('error',(err)=>{
    console.log('MongoDB connection error: ',err);
});

db.on('disconnected',()=>{
    console.log('MongoDB disconnected');
});

//Export the database connection (to connect with node server)
module.exports = db;