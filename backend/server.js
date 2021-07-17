/* jshint esversion: 10*/
const express = require('express');
const app = express();
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const crypto = require('crypto');
const validator = require('validator');
const cookie = require('cookie');
const User = require('./models/user');
const Profile = require('./models/profile');
const Authentication = require("./authentication");

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

//set up session
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

//Send cookie back with signed in user info
app.use(function(req, res, next){
    req.user = ('user' in req.session)? req.session.user : null;
});

//allow cross origin requests
app.use(cors({ 
    origin: 'http://localhost:3000',
    credentials: true
}));

const getSalt = () => {
    return crypto.randomBytes(16).toString('base64');
};

const hashPassword = (password, salt) => {
    var hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    return hash.digest('base64');
};

//check if registration info is valid
const checkRegistrationInfo = async(req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    let role = req.body.role;
    if (username == undefined || password == undefined || role == undefined) return res.status(400).send({success: false, message: "Request body must contain username, password and role attributes"});
    if (username.indexOf(' ') >= 0) return res.status(422).send({success: false, message: "bad input: username must have no whitespace"});
    if (validator.isEmpty(username)) return res.status(422).send({success: false, message: "bad input: username must be non-empty"});
    if (validator.isEmpty(password)) return res.status(422).send({success: false, message: "bad input: password must be non-empty"});
    if (role != "instructor" && role != "partner" && role != "entrepreneur" && role != "guest") return res.status(422).send({success: false, message: "bad input: role must be either instructor, partner, entrepeneur or guest"});
    let user = await User.findById(username, (err, user) => {
        if (err) return res.status(500).send({success: false, message: err.toString()});
    });
    if (user) return res.status(409).send({success: false, message: "Username is already taken"});
    next();
};

//register user into database
app.post('/signup', Authentication.isNotAuthenticated, checkRegistrationInfo, async(req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    let role = req.body.role;
    let salt = getSalt();
    let hashword = hashPassword(password, salt); 
    let newUser = new User({
        _id: username,
        password: hashword,
        salt: salt, 
        role: role
    });
    let newProfile = new Profile({
        _id: username,
        role: role
    });
    try{
        let savedUser = await newUser.save();
        let savedProfile = await newProfile.save();
        let cookieData = username + " " + role;
        req.session.user = savedUser;
        res.setHeader('Set-Cookie', cookie.serialize('user', cookieData, {
            path : '/', 
            maxAge: 60 * 60 * 24 * 7
        }));
        return res.json({success: true, username: savedUser._id, role: savedProfile.role});
    }
    catch(err){
        return res.status(500).send({success: false, message: err.toString()});
    }
});

//signin
app.post('/signin', Authentication.isNotAuthenticated, (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    User.findById(username, (err, user) => {
        if (err) return res.status(500).send({success: false, message: err.toString()});
        if (!user) return res.status(401).send({success: false, message: "Access Denied: No user with username " + username + " is registered"});
        let hashword = hashPassword(password, user.salt);
        if (hashword != user.password) return res.status(401).send({success: false, message: "Access Denied: Incorrect password"});
        req.session.user = user;
        let cookieData = username + " " + user.role;
        res.setHeader('Set-Cookie', cookie.serialize('user', cookieData, {
            path : '/', 
            maxAge: 60 * 60 * 24 * 7
        }));
        return res.json({success: true});
    });
});

app.get('/signout', Authentication.isAuthenticated ,(req, res) => {
    req.session.destroy();
    res.setHeader('Set-Cookie', cookie.serialize('user', '', {
        path : '/', 
        maxAge: 60 * 60 * 24 * 7
    }));
    return res.json({success: true});
});

//establish connection to mongodb 
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true}, () => {
    console.log("connected to DB");
});

const events = require('./routes/eventRoutes');
const groups = require('./routes/groupRoutes');
const videos = require('./routes/videoRoutes');
const search = require('./routes/searchRoutes');
const profiles = require('./routes/profileRoutes');
const comment = require('./routes/commentRoutes');
const post = require('./routes/postRoutes');

app.use('/group', groups);
app.use('/video', videos);
app.use('/search', search);
app.use('/post', post);
app.use('/comment', comment);
app.use('/calendar', events);
app.use('/profile', profiles);

const port = 8000;
app.listen(port, () => console.log("Server running on localhost:", port));