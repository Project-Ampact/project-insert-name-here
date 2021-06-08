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

app.use(cors({ 
    origin: 'http://localhost:3000',
    credentials: true
}));

app.post('/signup', async(req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    User.findById(username, (err, user) => {
        if (err) return res.status(500).send('Error ', 500);
        if (user) return res.status(409).send(username + " is not an available username");
    });
    let salt = getSalt();
    let hashword = hashPassword(req.body.password, salt);
    let newUser = new User({
        _id: username,
        password: hashword,
        salt: salt
    });
    try{
        let savedUser = await newUser.save();
        return res.json(savedUser);
    }
    catch(err){
        return res.status(500).send('Error ' + err);
    }
});

//establish connection to mongodb 
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true}, () => {
    console.log("connected to DB");
});

const port = 8000;
app.listen(port, () => console.log("Server running on localhost:", port));