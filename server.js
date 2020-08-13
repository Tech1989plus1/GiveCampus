// Load up the express framework abd body-parser helper
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Created an instance of express to serve our end points
const app = express();
const port = 3001;

// Load up node buil in file system helper library here
// using this later to serve our JSON files
const fs = require('fs');
const dataPath = path.join(__dirname, './src/data/donors.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serveing static file
app.use('/', express.static(path.join(__dirname, './src/client')));

// GET 
const routes = require('./src/routes/routes.js')(app, fs);

// POST
// Reading JSON file and appening new data to array object
app.post('/donors', (req, res) => {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if(err) {
      res.status(500).send(err);
    } else {
      
      let donorData = JSON.parse(data);
      donorData.push(req.body)
      
      fs.writeFile(dataPath, JSON.stringify(donorData), (err) => {
        if(err) {
          res.status(500).send(err);
        } else {
          res.status(200).send();
        }
      });
    }
  });
})

// Listening on localhost:3001/ server static file
app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});