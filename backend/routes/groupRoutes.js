const express = require("express"); 
const { findByIdAndDelete } = require("../models/group");
const Group = require("../models/group");
const User = require("../models/user");
const router = express.Router();

// Get all groups 
router.get("/", async (req, res) => {
    Group.find({}, (err, groups) => {
        if (err) return res.status(500).send({success: false, message: err.toString()});
        console.log(groups)
        if (!groups) return res.json([]);
        return res.json(groups);
    });
});

// Get specific group 
router.get("/:groupID", async (req, res) => {
    let groupId = req.params.groupID;
    Group.findById(groupId, (err, groups) => {
        if (err) return res.status(500).send({success: false, message: err.toString()});
        console.log(groups);
        if (!groups) return res.status(404).send({success: false, message: "Group not found"});
        return res.json(groups);
    }); 
});
/*router.get("/:groupID", async (req, res) => {
    let groupId = req.params.groupID;
    Group.findById(groupId, (err, groups) => {
        if (err) return res.status(500).send({success: false, message: err.toString()});
        console.log(groups);
        if (!groups) return res.status(401).send({success: false, message: "Bad input"});
        return res.json(groups);
    });
    res.send(res.group); 
    console.log(res.group)
});*/

// Update a group attribute(s) 
router.patch("/:groupID", async (req, res) => {
    let groupId = req.params.groupID;
    let groupP
    Group.findById(groupId, async (err, groups) => {
        if (req.body.name != null) {
            groups.name = req.body.name
        }
        // If a groupAbout is provided in the body of the patch request, then update the group about for the group 'groupID'
        if (req.body.about != null) {
            groups.about = req.body.about
        }
        // If a groupPicture is provided in the body of the patch request, then update the profile picture for the group 'groupID'
        if (req.body.picture != null) {
            groups.picture = req.body.picture
        }
        try {
            const updatedGroup = await groups.save()
            res.json(updatedGroup) // Successfully updatedGroup, thus return updated group
        } catch(error) { //Post request had invalid arguments
            res.status(400).json({ message: error.message })
        }
    });
    // If a groupName is provided in the body of the patch request, then update the group name for the group 'groupID'
   
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
    let user = await User.findById(userID, (err, use) => {
        if (err) return res.status(500).send({success: false, message: err.toString()});
    });
    if (!user) return res.status(404).send({success: false, message: "User with username " + userID + " does not exist"});
    Group.findById(groupID, (err, group) => {
        console.log(group);
        if (err) return res.status(500).send({success: false, message: err.toString()});
        if (!group) return res.status(404).send({success: false, message: "Group with Id " + groupID + " does not exist"});
        if (group.members.includes(userID)) return res.status(404).send({success: false, message: "Member is already in group"});
        group.members.push(userID);
        Group.findByIdAndUpdate(groupID, {members: group.members}, (err, group) => {
            if (err) return res.status(500).send({success: false, message: err.toString()});
            return res.json({success: true});
        });
    });
});
/*// Add new member to group 
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
})*/

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
        group = await Group.findById(req.params.groupID).populate('members', 'about', 'picture', 'name');
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
        if (!group) return res.status(404).send({success: false, message: "Group with Id " + groupID + " does not exist"});
        if (!group.members.includes(userID)) return res.status(404).send({success: false, message: "Member not group"});
        for (i = 0; i < group.members.length; i++) if(group.members[i] == userID) group.members.splice(i, 1);
        Group.findByIdAndUpdate(groupID, {members: group.members}, (err, groups) => {
            if (err) return res.status(500).send({success: false, message: err.toString()});
            return res.json({success: true});
        });
    });
});

/*// Remove member from group 
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
});*/

// Delete group 
router.delete("/delete/:groupID/", async (req, res) => {
    let groupID = req.params.groupID;

    Group.findById(groupID, async (err, group) => {
        if (err) return res.status(500).send({success: false, message: err.toString()});
        if (!group) return res.status(404).send({success: false, message: "Group with Id " + groupID + " does not exist"});
        Group.findByIdAndDelete(group, (err,  delObj) => {
            return res.json({success: true})
        })
        //Group.deleteById(groupID);
        
    });
});


module.exports = router; 