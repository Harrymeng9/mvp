const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const saveToDB = require('../database/index.js').saveToDB;
const getFromDB = require('../database/index.js').getFromDB;
const updateTarget = require('../database/index.js').updateTarget;

app.use(express.json());
//Serving static files in Express
app.use(express.static(path.join(__dirname, '../client/dist/')));

app.listen(port, () => {
  console.log(`The app server is running on port: ${port}`);
});


app.post('/mvp', async (req, res) => {
  var month = req.body.Month;
  var category = req.body.Category;
  var amount = req.body.Amount;

  if (category === 'Target') {
    await updateTarget(month, category, amount);
  } else {
    // call saveToDB function to save data into database
    await saveToDB(month, category, amount);
  }

  res.status(200).send('Transaction Recorded');
});

app.get('/mvp', async (req, res) => {

  // fetch the selected month from client
  var selectedMonth = req.query.Month;
  // Get the data from database where month === selected Month
  var categorySum = await getFromDB(selectedMonth);
  console.log('categorySum', categorySum);
  // Send data back to client
  res.status(200).send(categorySum);
});


