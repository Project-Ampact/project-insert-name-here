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
    let dueDate = req.body.dueDate;
    let fileTypes = req.body.fileTypes;
    let newAssignment = new Deliverable({
        title: title,
        description: description,
        instructor: req.user._id
    });
    if (dueDate) newAssignment.dueDate = dueDate;
    if (fileTypes) newAssignment.fileTypes = fileTypes;
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

//Get assignments
router.get("/", Authentication.isAuthenticated, async(req, res) => {
    let query = {};
    if (req.query.id) query._id = req.query.id;
    if (req,query.instructor) query.instructor = req.query.instructor;
    Deliverable.find(query, (err, assignments) => {
        if (err) return res.status(500).send({success: false, message: err.toString()});
        return res.json(assignments);
    });
});

//Get Submissions
router.get("/submission/metadata", Authentication.isAuthenticated, async(req, res) => {
    let query = {};
    if (!req.query.assignment) return res.status(401).send({success: false, message: "Can only get submissions for one assignment"});
    query.assignment = req.query.assignment;
    if (req.query.id) query._id = req.query.id;
    Submission.find(query, (err, submissions) => {
        if (err) return res.status(500).send({success: false, message: err.toString()});
        return res.json(submissions);
    });
});

router.get("/submission/file", Authentication.isAuthenticated, async(req, res) => {
    let query = {};
    if (!req.query.assignment) return res.status(401).send({success: false, message: "Can only get submissions for one assignment"});
    query.assignment = req.query.assignment;
    if (req.query.id) query._id = req.query.id;
    Submission.find(query, (err, submissions) => {
        if (err) return res.status(500).send({success: false, message: err.toString()});
        return res.json(submissions);
    });
});

module.exports = router; 