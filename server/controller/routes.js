const path = require('path');
const fs = require('fs');
const dataPath = path.join(__dirname, '../../src/data/donors.json');

// appRouter is a server function that servers donors.JSON to
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


