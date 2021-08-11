/*jshint esversion: 10*/

const express = require("express"); 
const Video = require("../models/video");
const router = express.Router();
const Authentication = require("../authentication");

//insert valid subjects here
const validator = require('validator');

//Get videos matching the query
router.get("/", async(req, res) => {
    let query = {};
    if (req.query.id) query._id = req.query.id;
    if (req.query.author) query.action = req.query.author;
    if (req.query.subject) query.subject = req.query.subject;
    Video.find(query, (err, videos) => {
        if (err) return res.status(500).send();
        return res.json(videos);
    });
});

const checkVideo = (req, res, next) => {
    let title = req.body.title;
    let url = req.body.url;
    let tag = req.body.tags;
    //let subject = req.body.subject.toLowerCase().trim();
    let description = req.body.description;
    if(title === undefined || url === undefined || tag === undefined || description === undefined){
        return res.status(400).send({success: false, message: "Request body must conatin title, url, tag and description parameters"});
    }
    if(validator.isEmpty(title) || validator.isEmpty(url) || validator.isEmpty(tag)){
        return res.status(422).send({success: false, message: "Title, url and tag parameters must be non-empty strings"});
    }
  /*  if(!(subject in validSubjects)){
        return res.status(422).send({success: false, message: "Invalid subject"});
    }*/
    //function to check url tbi later
    next();
};
// Add video 
router.post("/", Authentication.isAuthenticated , checkVideo,  async(req, res) => {
    let title = req.body.title;
    let url = req.body.url;
    //let subject = req.body.subject.toLowerCase().trim();
    let description = req.body.description;
    let tags = req.body.tags;
    let picture = req.body.picture;
    let poster = req.body.poster;
    let newVideo = new Video({
        title: title,
        videoUrl: url,
        description: description,
        //poster: req.user.username,
        poster: poster,
        subject: "none",
        tags: tags,
        picture: picture
    });
    try{
        let savedVideo = await newVideo.save();
        return res.json({success: true, videoId: savedVideo._id});
    }
    catch(err){
        return res.status(500).send({success: false, message: err.toString()});
    }
});

//Get set of section of videos, grouped by tag
router.get("/browse", Authentication.isAuthenticated, async(req, res) => {
    let tag = req.params.tag;
    var allTagSections = [];

    // Gets all the videos in the database
    const allVideos = await Video.find((err, videos) => {
        if (err) return res.status(500).send();
       // console.log(videos);
        return videos;
    });
    // Creates an array of all the unique tags in the videos
    const uniqueTags = [];
    allVideos.map(video => {
        curTag = video.tags.filter((val, i, arr) => arr.indexOf(val) === i);
        video.tags.map(tag => {
           uniqueTags.push(tag);
        })
    });
    const uniqueTags2 = [...new Set(uniqueTags)];

    // Create an array of arrays of tags
    for (let i = 0; i < uniqueTags2.length; i++) {
        let query = { tags: uniqueTags2[i] };
        const videoSection = await Video.find(query, (err, videos) => {
            if (err) return res.status(500).send();
            return videos;
        });
        allTagSections.push({ "videoSec": videoSection, "commonTag": uniqueTags2[i]});
    }

   return res.json(allTagSections);
});

//Get videos matching the given tag
router.get("/browse/:tag", Authentication.isAuthenticated, async(req, res) => {
    let tag = req.params.tag;
    let query = { tags: tag };
    Video.find(query, (err, videos) => {
        if (err) return res.status(500).send();
        return res.json(videos);
    });
});

module.exports = router; 