// fs - JavaScript on the server helping with servering JSON file
const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../../src/data/donors.json');

// donorsGet is a fs.readFile servers donors.JSON to
// localhost:3001/donors
exports.donorsGet =  async (req, res) => {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if(err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
      }
  });
};

// donorsPost is a fs.writeFile writes donors.JSON and appends
// donors information and servers localhost:3001/donors
exports.donorPost = (req, res) => {
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
}


