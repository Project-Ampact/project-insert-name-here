/* jshint esversion: 10*/
const express = require('express');
const app = express();
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const cors = require('cors');
const cookie = require('cookie');
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

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60 * 60 * 24 * 7}
}));

//Send cookie back with signed in user info
app.use(function(req, res, next){
    req.user = ('user' in req.session)? req.session.user : null;
    let username = (req.user)? req.user._id : '';
    res.setHeader('Set-Cookie', cookie.serialize('username', username, {
          path : '/', 
          maxAge: 60 * 60 * 24 * 7 // 1 week in number of seconds
    }));
    next();
});

//Authenticate user
const isAuthenticated = (req, res, next) => {
    if (!req.user) return res.status(401).end("Access denied");
    next();
};

app.use(cors());

const hashPassword = (password, salt) => {
    var hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    return hash.digest('base64');
};

//signin
app.post('/signin', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    User.findById(username, (err, user) => {
        if (err) return res.status(500).send({success: false, message: err.toString()});
        if (!user) return res.status(401).send({success: false, message: "Access Denied: No user with username " + username + " is registered"});
        let hashword = hashPassword(password, user.salt);
        if (hashword != user.password) return res.status(401).send({success: false, message: "Access Denied: Incorrect password"});
        res.setHeader('Set-Cookie', cookie.serialize('username', username, {
            path : '/', 
            maxAge: 60 * 60 * 24 * 7 // 1 week in number of seconds
        }));
        return res.json({success: true});
    });
});

//establish connection to mongodb 
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true}, () => {
    console.log("connected to DB");
});

const port = 8000;
app.listen(port, () => console.log("Server running on localhost:", port));