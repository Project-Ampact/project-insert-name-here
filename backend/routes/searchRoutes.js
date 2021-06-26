const express = require("express"); 
const Group = require("../models/group");
const User = require("../models/user");
const router = express.Router();


router.get("/group", async (req, res) => {
    let searchString = req.query.searchString; 
    let page = req.query.page;
    if (searchString == null) {
        return res.status(400).send({success: false, message: "Missing required fields"});
    }

    (page > 0) ? page = parseInt(page) : page = 1;

    let group;
    try {
    group = await Group.find(
        {$text: {
            $search: searchString,
            $caseSensitive: false
        }}).skip((page-1)*15).limit(15);
    } catch {
        return res.status(500).send({success: false, message: "Error while searching"});
    }
    return res.json(group);
});


module.exports = router; 