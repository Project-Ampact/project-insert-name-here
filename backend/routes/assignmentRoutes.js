/*jshint esversion: 10*/

const express = require("express"); 
const Deliverable = require("../models/deliverable");
const Submission = require("../models/submission");
const router = express.Router();

// Add assignment
router.post("/", async(req, res) => {
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
router.post("/submission",  async(req, res) => {
    let submission = req.body.submission;
    let assignment = req.body.assignment;
    let newAssignment = new Submission({
        user: req.user._id,
        submission: submission,
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