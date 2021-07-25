const express = require("express"); 
const Video = require("../models/video");
const Interest = require("../models/interests");
const User = require("../models/user");

const router = express.Router();

router.get("/tags", async(req, res) => {
    try {
        let tags = await Video.distinct('tags');
        return res.json(tags);
    } catch (e) {
        return res.status(500);
    }
});

router.get("/user/:userID", async(req, res) => {
    let userID = req.params.userID;
    let interests;

    try {
        interests = await Interest.findById(userID);
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }

    if (interests == null) return res.status(404).json({
        success: false,
        message: "Request body must contain interests"
    });
    
    return res.json(interests.interests);
});

router.put("/user/:userID", async(req, res) => {
    let userID = req.params.userID;
    let interests = req.body.interests;

    if (!interests) return res.status(400).json.send({
        success: false,
        message: "Request body must contain interests"
    });

    if (!await User.exists({_id: userID})) return res.status(404).send({
        success: false,
        message: "Could not find user"
    });

    let updatedInterests; 
    if (!await Interest.exists({_id: userID})) 
        updatedInterests = new Interest({_id: userID, interests: interests});
    else 
        updatedInterests = await Interest.findById(userID);

    updatedInterests.interests = interests; 
    
    try {
        await updatedInterests.save();
    } catch (e) {
        return res.status(500).send({
            success: false,
            message: "Internal server error"
        });
    }

    return res.status(200).send();
});

module.exports = router; 