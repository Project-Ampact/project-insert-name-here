const express = require("express"); 
const Group = require("../models/Group");
const router = express.Router();
const bodyParser = require('body-parser');

// Get all groups 
router.get("/", async (req, res) => {
    let group
    try {
        group = await Group.find(); 
        console.log(group);
        res.status(200).send(group); 
    } catch(err) {                                  // Serverside error occured, thus return error message
        // console.error(err); 
        res.status(500).send({error: err.message});  
    }
});

// Get specific group 
router.get("/:groupID", getGroup, async (req, res) => {
    res.send(res.group); 
    console.log(res.group)
});

// Update a group attribute(s) 
router.patch("/:groupID", getGroup, async (req, res) => {
    // If a groupName is provided in the body of the patch request, then update the group name for the group 'groupID'
    if (req.body.name != null) {
        res.group.name = req.body.name
    }
    // If a groupAbout is provided in the body of the patch request, then update the group about for the group 'groupID'
    if (req.body.about != null) {
        res.group.about = req.body.about
    }
    // If a groupPicture is provided in the body of the patch request, then update the profile picture for the group 'groupID'
    if (req.body.picture != null) {
        res.group.picture = req.body.picture
    }
    try {
        const updatedGroup = await res.group.save()
        res.json(updatedGroup) // Successfully updatedGroup, thus return updated group
    } catch(error) { //Post request had invalid arguments
        res.status(400).json({ message: error.message })
    }
});

// Create new group 
router.post("/", async (req, res) => {
   // try {
        let name = req.body.name; 
        let about = req.body.about;
        let picture = req.body.picture;
        let group = new Group({name: name, about: about, picture: picture}); 
        

       try {
            const savedGroup = await group.save(); 
            console.log("Group created"); 
            res.status(201).json(savedGroup);            // Successfully created group, thus return new group info as json
       } catch (err) {                                   // Error in creating a new group, thus return error message (bad data)
            res.status(400).json({ message: err.message})
       }
}); 

// Add new member to group 
router.post("/:groupID", getGroup, async (req, res) => {
    // TODO: check userID is valid 
    let userID = req.body.userID; 

    res.group.members.push(userID); 
    res.group.save(); 
    console.log("Group member added"); 

    res.status(200).send(); 
}); 

// Middleware used to getGroup from MongoDB database
async function getGroup(req, res, next) {
    let group
    try {
        group = await Group.findById(req.params.groupID); //.populate('members'); 
    } catch(error) {
       return res.status(404).json({ message: 'Group does not exist'})
    }
    res.group = group
    next()
}

// Remove member from group 
router.delete("/:groupID/:userID", async (req, res) => {
    // TODO: check userID is valid 
    let userID = req.params.userID;
    let groupID = req.params.groupID; 

    try {
        for (let i = 0; i < res.group.members; i++) {
            if (res.group.members[i].toString() == userID) {
                res.group.members.splice(i, 1); 
                res.group.save(); 
                console.log("Group member " + userID + "removed from " + groupID); 
                res.status(200).send(); 
            }
        }
    } catch(error) {
        res.status(500).send({error: error.message}); 
    }
    // could not find group member; returns error 
    res.status(404).json({message: 'Member does not exist or is not in group'}); 
}); 

module.exports = router; 

// TODO: fix error handling / responses 
