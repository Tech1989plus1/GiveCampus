// load up the express framework abd body-parser helper
const express = require('express');
const bodyParser = require('body-parser');

// created an instance of express to serve our end points
const app = express();
const port = 3001;

// load up node buil in file system helper library here
// using this later to serve our JSON files
const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require('./src/routes/routes.js')(app, fs);

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});