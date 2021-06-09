/* jshint esversion: 10*/
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const user = require('./models/user');
const crypto = require('crypto');
const cors = require('cors');
const validator = require('validator');
const User = require('./models/user');
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

const getSalt = () => {
    return crypto.randomBytes(16).toString('base64');
};

const hashPassword = (password, salt) => {
    var hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    return hash.digest('base64');
};

//check if registration info is valid
const checkRegistrationInfo = (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    let role = req.body.role;
    if (username == undefined || password == undefined || role == undefined){
        return res.status(400).send({message: "Request body must contain username, password and role attributes"});
    }
    User.findOne({_id: username}, (err, user) => {
        if (err) return res.status(500).send({message: err.toString()});
        if (user) return res.status(409).send({message: username + " is already taken"});
    });
    if (validator.isEmpty(username)) return res.status(422).send({message: "bad input: username must be non-empty"});
    if (validator.isEmpty(password)) return res.status(422).send({message: "bad input: password must be non-empty"});
    if (role != "instructor" && role != "partner" && role != " entrepeneur") return res.status(422).send({message: "bad input: role must be either instructor, partner or entrepeneur"});
    next();
};

//register user into database
app.post('/signup', checkRegistrationInfo, async(req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    let salt = getSalt();
    let hashword = hashPassword(password, salt); 
    let newUser = new User({
        _id: username,
        password: hashword,
        salt: salt,
        role: req.body.role,
    });
    try{
        let savedUser = await newUser.save();
        return res.json({username: savedUser._id, role: savedUser._id});
    }
    catch(err){
        return res.status(500).send({message: err.toString()});
    }
});

//establish connection to mongodb 
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true}, () => {
    console.log("connected to DB");
});

const port = 8000;
app.listen(port, () => console.log("Server running on localhost:", port));