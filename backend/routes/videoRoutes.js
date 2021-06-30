/*jshint esversion: 10*/

const express = require("express"); 
const Video = require("../models/video");
const router = express.Router();
const validator = require('validator');

//insert valid subjects here
const validSubjects = [''];

const isAuthenticated = (req, res, next) => {
    if(!req.user || req.user === "") return res.status(403).send({success: false, message: "Not authenticated"});
    next();
};

const checkVideo = (req, res, next) => {
    let title = req.body.title;
    let url = req.body.url;
    let subject = req.body.subject.toLowerCase().trim();
    let description = req.body.description;
    if(title === undefined || url === undefined || subject === undefined || description === undefined){
        return res.status(400).send({success: false, message: "Request body must conatin title, url, subject and description parameters"});
    }
    if(validator.isEmpty(title) || validator.isEmpty(url) || validator.isEmpty(subject)){
        return res.status(422).send({success: false, message: "Title, url and subject parameters must be non-empty strings"});
    }
    if(!(subject in validSubjects)){
        return res.status(422).send({success: false, message: "Invalid subject"});
    }
    //function to check url tbi later
    next();
};
// Add video 
router.post("/", isAuthenticated, checkVideo,  async(req, res) => {
    let title = req.body.title;
    let url = req.body.url;
    let subject = req.body.subject.toLowerCase().trim();
    let description = req.body.description;
    let newVideo = new Video({
        title: title,
        videoUrl: url,
        description: description,
        poster: req.user.username,
        subject: subject
    });
    try{
        let savedVideo = await newVideo.save();
        return res.json({success: true, videoId: savedVideo._id});
    }
    catch(err){
        return res.status(500).send({success: false, message: err.toString()});
    }
});

module.exports = router; 