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

module.exports = router; 