// Budget API
const mongoose = require('mongoose');
const budgetDataModel = require('./public/models/budgetData_Schema');

const bodyParser = require('body-parser');
let url = 'mongodb://localhost:27017/assignment8_mongodb';
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
// use bodyParser to parse req.body in post requests
app.use(bodyParser.json());

// old implementation

// read from json file synchronously to retrieve raw data
// const budgetJSON = fs.readFileSync('./budget-data.json');
// // parse the raw data to create a readable object from the JSON
// const budget = JSON.parse(budgetJSON);


app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

// old endpoint
// app.get('/budget', (req, res) => {
//     // send budget object in JSON response
//     res.json(budget);
// });

// new endpoint for POST requests (new data)
app.post('/budgetData', (req, res) => {
    // connect to database
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                console.log('Connected to the database');
                // use body as new data
                const newData = req.body;
                console.log(newData);
                // insert new data into database
                budgetDataModel.insertMany(newData)
                               .then((data) => {
                                   console.log(data);
                                   // send data in response and close db connection
                                   res.send(data);
                                   mongoose.connection.close();
                               })
                               .catch((connectionError) => {
                                   // if an error occurs, send it in response
                                   console.log(connectionError);
                                   res.send(connectionError);
                               });
            })
            .catch((connectionError) => {
                console.log(connectionError);
            });
});

// new endpoint for GET requests (retrieving data)
app.get('/budgetData', (req, res) => {
    // connect to database
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                console.log('Connected to the database');
                // retrieve all budgetData documents
                budgetDataModel.find({})
                               .then((data) => {
                                   // send data in response and close connection
                                   res.json(data);
                                   console.log(data);
                                   mongoose.connection.close();
                               })
                               .catch((connectionError) => {
                                   // if an error occurs, send it in response
                                   console.log(connectionError);
                                   res.send(connectionError);
                               });
            })
            .catch((connectionError) => {
                console.log(connectionError)
            });
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});