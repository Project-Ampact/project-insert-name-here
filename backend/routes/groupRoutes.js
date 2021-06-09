const express = require("express"); 
const Group = require("../models/Group");
const router = express.Router();
const bodyParser = require('body-parser');

// get all groups 
router.get("/group", async (req, res) => {
    try {
        let group = await Group.find(); 
        console.log(group);

        res.status(200); 
        res.send(group); 
    } catch(err) {
        console.error(err); 
        res.status(400); 
        res.send({error: err}); 
    }
});

// get specific group 
router.get("/group/:groupID", async (req, res) => {
    try {
        let group = await Group.findById(req.params.groupID); //.populate('members'); 
        res.send(group); 
    } catch(error) {
        console.error(error);
        res.status(400); 
        res.send({error: "Group does not exist"}); 
    }
});

// add group 
router.post("/group", async (req, res) => {
    try {
        let groupName = req.body.groupName; 
        let group = new Group({name: groupName}); 
        group.save(); 
        console.log("Group created"); 

        res.status(200); 
        res.send();
    } catch(error) {
        res.status(400); 
        res.send({error: "Group creation failed"})
    }
}); 

// add member to group 
router.post("/group/:groupID", async (req, res) => {
    try { 
        // TODO: check userID is valid 
        let userID = req.body.userID; 
        let groupID = req.params.groupID; 

        let group = await Group.findById(groupID);
        group.members.push(userID); 
        group.save(); 
        console.log("Group member added"); 

        res.status(200); 
        res.send();
    } catch(error) {
        res.status(400); 
        console.error(error);
        res.send({error: "Group does not exist"})
    }
}); 

module.exports = router; 

// TODO: remove group member 
// TODO: fix error handling / responses 
