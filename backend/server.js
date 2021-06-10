/* jshint esversion: 10*/
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//prints request out onto the console
app.use((req, res, next) => {
  console.log("HTTP request", req.method, req.url, req.body);
  next();
});

//establish connection to mongodb 
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true}, () => {
  console.log("connected to DB");
});

const port = 8000;

const groups = require('./routes/groupRoutes');
app.use('/group', groups);

app.listen(port, () => console.log("Server running on localhost:", port));