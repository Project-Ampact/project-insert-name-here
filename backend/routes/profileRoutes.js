/* jshint esversion: 10 */
const express = require("express"); 
const User = require("../models/user");
const Profile = require('../models/profile');
const router = express.Router();

// Get all profiles 
router.get("/", async (req, res) => {
    Profile.find({}, (err, profiles) => {
        if (err) return res.status(500).send({success: false, message: err.toString()});
        console.log(profiles);
        if (!profiles) return res.json([]);
        return res.json(profiles);
    });
});

// Get specific profile 
router.get("/:profileID", async (req, res) => {
    let profileId = req.params.profileID;
    Profile.findById(profileId, (err, profiles) => {
        if (err) return res.status(500).send({success: false, message: err.toString()});
        console.log(profiles);
        if (!profiles) return res.status(404).send({success: false, message: "User not found"});
        return res.json(profiles);
    }); 
});

// Update a profile attribute(s) 
router.patch("/:profileID", async (req, res) => {
    let profileID = req.params.profileID;
    Profile.findById(profileID, async (err, profiles) => {
        if (err) return res.status(500).send({success: false, message: err.toString()});
        console.log(profiles);
        if (!profiles) return res.status(404).send({success: false, message: "User not found"});
        // If a lastName field is provided in the body of the patch request, then update the profile lastName for the profile 'profileID'
        if (req.body.firstName != null) {
            profiles.firstName = req.body.firstName;
        }
        // If a firstName field is provided in the body of the patch request, then update the profile firstName for the profile 'profileID'
        if (req.body.lastName != null) {
            profiles.lastName = req.body.lastName;
        }
        // If a bio field is provided in the body of the patch request, then update the profile bio for the profile 'profileID'
        if (req.body.bio != null) {
            profiles.bio = req.body.bio;
        }
        // If a picture field is provided in the body of the patch request, then update the profile picture for the profile 'profileID'
        if (req.body.picture != null) {
            profiles.picture = req.body.picture;
        }
        try {
            const updatedProfile = await profiles.save();
            res.json(updatedProfile); // Successfully updatedProfile, thus return updated profile
        } catch(error) { //Post request had invalid arguments
            res.status(400).json({ message: error.message });
        }
    });
   
});

module.exports = router; 