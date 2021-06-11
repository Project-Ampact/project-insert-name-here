const express = require("express"); 
const Group = require("../models/Group");
const User = require("../models/User");
const router = express.Router();

// Get all groups 
router.get("/", async (req, res) => {
    Group.find({}, (err, groups) => {
        if (err) return res.status(500).send({success: false, message: err.toString()});
        console.log(groups)
        if (!groups) return res.json([]);
        return res.json(groups);
    });
   /* let group
    try {
        group = await Group.find().populate('members', '_id');
        console.log(group);
        res.status(200).send(group); 
    } catch(err) {                                  // Serverside error occured, thus return error message
        // console.error(err); 
        res.status(500).send({error: err.message});  
    }*/
});

// Get specific group  getGroup,
router.get("/:groupID", async (req, res) => {
    let groupId = req.params.groupID;
    Group.findById(groupId, (err, groups) => {
        if (err) return res.status(500).send({success: false, message: err.toString()});
        console.log(groups);
        if (!groups) return res.status(401).send({success: false, message: "Bad input"});
        return res.json(groups);
    });
    /*res.send(res.group); 
    console.log(res.group)*/
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
router.post("/add/:groupID", async (req, res) => {
    // TODO: check userID is valid 
    let userID = req.body.userID; 
    let groupID = req.params.groupID;
    let user = await User.findById(userID, (err, user) => {
        if (err) return res.status(500).send({success: false, message: err.toString()});
    });
    if (!user) return res.status(401).send({success: false, message: "User with username " + userID + " does not exist"});
    Group.findById(groupID, (err, group) => {
        console.log(group);
        if (err) return res.status(500).send({success: false, message: err.toString()});
        if (!group) return res.status(401).send({success: false, message: "Group with Id " + groupID + " does not exist"});
        group.members.push(userID);
        Group.findByIdAndUpdate(groupID, {members: group.members}, (err, group) => {
            if (err) return res.status(500).send({success: false, message: err.toString()});
            console.log("Group member added"); 
            return res.json({success: true});
        });
    });
})
/*router.post("/:groupID", getGroup, async (req, res) => {
    try{
        let userID = req.body.userID;
        // check user exists
        if (!await userExists(userID)) {
            res.status(404).json({message: "User does not exist"});
        }

        res.group.members.push(userID); 
        res.group.save(); 
        console.log("Group member added"); 

        res.status(200).send(); 
    } catch(err) {
        res.status(400).json({ message: err.message})
    }
}); */

async function userExists(id) {
    let found = await User.findById(id); 
    if (found == null) {
        return false; 
    } return true; 
}

// Middleware used to getGroup from MongoDB database
async function getGroup(req, res, next) {
    let group
    try {
        group = await Group.findById(req.params.groupID).populate('members', '_id role');
    } catch(error) {
       return res.status(404).json({ message: 'Group does not exist'})
    }
    res.group = group
    next()
}

// Remove member from group 
router.delete("/delete/:groupID/:userID", async (req, res) => {
    let userID = req.params.userID; 
    let groupID = req.params.groupID;

    Group.findById(groupID, (err, group) => {
        if (err) return res.status(500).send({success: false, message: err.toString()});
        if (!group) return res.status(401).send({success: false, message: "Group with Id " + groupID + " does not exist"});
        if (!group.members.includes(userID)) return res.status(401).send({success: false, message: "Member not group"});
        for (i = 0; i < group.members.length; i++) if(group.members[i] == userID) group.members.splice(i, 1);
        console.log(group.members);
        Group.findByIdAndUpdate(groupID, {members: group.members}, (err, groups) => {
            if (err) return res.status(500).send({success: false, message: err.toString()});
            console.log("Group member removed"); 
            return res.json({success: true});
        });
    });
});

/*router.delete("/:groupID/:userID", getGroup, async (req, res) => {
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
}); */

module.exports = router; 