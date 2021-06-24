/*jshint esversion: 10*/

const express = require("express"); 
const Video = require("../models/video");
const router = express.Router();
const { query } = require("express");

//insert valid subjects here

const isAuthenticated = (req, res, next) => {
    if(!req.user || req.user === "") return res.status(403).send({success: false, message: "Not authenticated"});
    next();
};

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

module.exports = router; 