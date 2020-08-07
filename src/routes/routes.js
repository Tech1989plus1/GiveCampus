const path = require('path');

const appRouter = (app, fs) => {
  //variables
  const dataPath = path.join(__dirname, '../data/donors.json');
  
  //Read
  app.get('/donors', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if(err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    })
  })
};

module.exports = appRouter;