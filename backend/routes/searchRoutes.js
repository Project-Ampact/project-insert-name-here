const express = require("express"); 
const Group = require("../models/group");
const User = require("../models/user");
const router = express.Router();


router.get("/group", async (req, res) => {
    let searchString = req.query.searchString; 
    console.log(searchString);
    Group.find(
        {$text: {
            $search: searchString,
            $caseSensitive: false
        }}, async (err, groups) => {
            if (err) return res.status(500).send({success: false, message: err.toString()});
            return res.json(groups); 
        }
    )
});


module.exports = router; 