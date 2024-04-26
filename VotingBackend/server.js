const express = require('express');
const app = express();                  //Creates a server

require('dotenv').config();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});