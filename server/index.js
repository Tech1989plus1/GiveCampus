// Load up the express framework abd body-parser helper
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const {donorPost, donorsGet} = require('./controller/routes.js');

// Created an instance of express to serve our end points
const app = express();
const port = 3001;

// Load up node buil in file system helper library here
// using this later to serve our JSON files
const dataPath = path.join(__dirname, '../src/data/donors.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serveing static file
app.use('/', express.static(path.join(__dirname, '../src/client')));

// GET 
app.get('/donors', donorsGet);

// POST
// Reading JSON file and appening new data to array object
app.post('/donors', donorPost);

// Listening on localhost:3001/ server static file
app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
  console.log(`Donors.json listening on @ http://localhost:${port}/donors`);
});
