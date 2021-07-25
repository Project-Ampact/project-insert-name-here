/*jshint esversion: 10*/

const express = require("express"); 
const Deliverable = require("../models/deliverable");
const Submission = require("../models/submission");
const Authentication = require("../authentication");
const router = express.Router();
const multer = require('multer');
const path = require("path");
const fs = require("fs");
const upload = multer({ dest: path.join(__dirname, '..', 'uploads')});

// Add assignment
router.post("/", Authentication.isAuthenticated, Authentication.isInstructor, async(req, res, next) => {
    let title = req.body.title;
    let description = req.body.description;
    let dueDate = req.body.dueDate;
    let fileTypes = req.body.fileTypes;
    let totalMarks = req.body.totalMarks;
    if (totalMarks <= 0) return res.status(401).send({success: false, message: "Assignment must be out of 1 or more marks"});
    let newAssignment = new Deliverable({
        title: title,
        description: description,
        instructor: req.user._id,
        totalMarks: totalMarks
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
router.put("/submission", Authentication.isAuthenticated, upload.single('file') , (req, res) => {
    let assignmentId = req.body.assignment;
    Deliverable.findById(assignmentId, (err, assignment) => {
        if (err) return res.status(500).send({success: false, message: err.toString()});
        if (!assignment) return res.status(404).send({success: false, message: "Can not find assignment"});
        let submissionTime = Date.now();
        if (assignment.dueDate && assignment.dueDate < submissionTime) return res.status(401).send({success: false, message: "Due date has passed"});
        let fileEnding = req.file.originalname.split(".").pop();
        if (assignment.fileTypes === [] || !assignment.fileTypes.includes(fileEnding)) return res.status(404).send({success: false, message: "Invalid file type"});
        Submission.findOne({user: req.user._id, assignment: assignmentId}, async(err, submission) => {
            if (err) return res.status(500).send({success: false, message: err.toString()});
            console.log(submission);
            if (submission){
                Submission.findByIdAndUpdate(submission._id, {file: req.file, submissionTime: submissionTime},(err, sub) => {
                    if (err) return res.status(500).send({success: false, message: err.toString()});
                    fs.unlink(path.join(__dirname, '..', 'uploads', sub.file.filename), (err) => {
                        if (err) return res.status(500).send({success: false, message: err.toString()});
                    });
                    return res.json(sub);
                });
            } else {
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
            }
        });
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

//update submission grade
router.patch("/submission/:id", Authentication.isAuthenticated, Authentication.isInstructor, (req, res) => {
    let updateQuery = {};
    if (req.body.feedback !== undefined) updateQuery.feedback = req.body.feedback;
    if (!req.params.id) return res.status(401).send({success: false, message: "Request must contain id parameter"});
    Submission.findById(req.params.id, (err, submission) => {
        if (err) return res.status(500).send({success: false, message: err.toString()});
        if (!submission) return res.status(404).send({success: false, message: "Can't find submission"});
        var grade = req.body.grade;
        Deliverable.findById(submission.assignment, (err, deliverable) => {
            if (err) return res.status(500).send({success: false, message: err.toString()});
            if (grade !== undefined){
                if (grade < 0 || grade > deliverable.totalMarks) return res.status(401).send({success: false, message: "Grade must be between 0 and 100"});
                updateQuery.grade = grade;
            }
        });
        Submission.findByIdAndUpdate(req.params.id, updateQuery, (err, updatedSubmission) => {
            if (err) return res.status(500).send({success: false, message: err.toString()});
            return res.json(updatedSubmission);
        });
    });
});

module.exports = router; 