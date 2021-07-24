/*jshint esversion: 10*/

const express = require("express"); 
const Deliverable = require("../models/deliverable");
const Submission = require("../models/submission");
const Authentication = require("../authentication");
const router = express.Router();
const multer = require('multer');
const path = require("path");
const upload = multer({ dest: path.join(__dirname, '..', 'uploads')});

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
router.post("/submission", Authentication.isAuthenticated, upload.single('file') , (req, res) => {
    let assignmentId = req.body.assignment;
    Deliverable.findById(assignmentId, async(err, assignment) => {
        if (err) return res.status(500).send({success: false, message: err.toString()});
        if (!assignment) return res.status(404).send({success: false, message: "Can not find assignment"});
        let fileEnding = req.file.originalname.split(".").pop();
        if (!assignment.fileTypes.includes(fileEnding)) return res.status(404).send({success: false, message: "Invalid file type"});
        let newAssignment = new Submission({
            user: req.user._id,
            file: req.file,
            assignment: assignmentId
        });
        try{
            let savedAssignment = await newAssignment.save();
            return res.json({success: true, submissionId: savedAssignment._id});
        }
        catch(error){
            return res.status(500).send({success: false, message: error.toString()});
        }
    });
    
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

//Get metadata for submissions
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

//Get file by id
router.get("/submission/file/:id", Authentication.isAuthenticated, async(req, res) => {
    if (!req.params.id) return res.status(401).send({success: false, message: "Request must contain id parameter"});
    Submission.findById(req.params.id, (err, submission) => {
        if (err) return res.status(500).send({success: false, message: err.toString()});
        res.setHeader('Content-Type', submission.file.mimetype);
        return res.sendFile(path.join(submission.file.path));
    });
});

module.exports = router; 