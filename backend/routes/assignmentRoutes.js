/*jshint esversion: 10*/

const express = require("express"); 
const Deliverable = require("../models/deliverable");
const Submission = require("../models/submission");
const Authentication = require("../authentication");
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: 'uploads/'});

// Add assignment
router.post("/", Authentication.isAuthenticated, Authentication.isInstructor, async(req, res, next) => {
    let title = req.body.title;
    let description = req.body.description;
    let newAssignment = new Deliverable({
        title: title,
        description: description,
        instructor: req.user._id
    });
    try{
        let savedAssignment = await newAssignment.save();
        return res.json({success: true, assignmentId: savedAssignment._id});
    }
    catch(err){
        return res.status(500).send({success: false, message: err.toString()});
    }
});

// Add submission for a given assignment
router.post("/submission", Authentication.isAuthenticated, upload.single('file') , async(req, res) => {
    let assignment = req.body.assignment;
    console.log(assignment);
    let newAssignment = new Submission({
        user: req.user._id,
        file: req.file,
        assignment: assignment
    });
    try{
        let savedAssignment = await newAssignment.save();
        return res.json({success: true, submissionId: savedAssignment._id});
    }
    catch(err){
        return res.status(500).send({success: false, message: err.toString()});
    }
});

module.exports = router; 