/*jshint esversion: 10*/

const express = require("express");
const Event = require("../models/events");
const Group = require("../models/group");
const router = express.Router();
const Authentication = require("../authentication");

// // Get events for the user (personal, group, general)
// router.get("/", async (req, res) => {
//     const userId = req.body.userId;
//     const groupId = req.body.groupId;
//     console.log(userId, groupId)
//     //find personal events
//     Event.find({$or: [
//         {userId: userId, type: "personal"},
//         {groupId: groupId, type: "group"},
//         {type: "general"}]}, (err, events) => {
//         if (err) return res.status(500).send({success: false, message: err.toString()});
//         return res.json(events);
//     })
// });

router.get("/:userId", Authentication.isAuthenticated, async(req, res) => {
    const userId = req.params.userId;
    Group.findOne({members: userId}, (err, result) => {
        console.log(result);
        if (err) return res.status(500).send({success: false, message: err.toString()});
        if (!result) groupSearch = null;
        Event.find({$or: [
            {userId: userId, type: "personal"},
            {groupId: (result === null) ? null : result._id, type: "group"},
            {type: "general"}]}, (err, events) => {
            if (err) return res.status(500).send({success: false, message: err.toString()});
            if (!events) return res.status(404).send({sucess: false, message: "User's events not found"});
            return res.json(events);
        })
    })
});

// router.post("/", async (req, res) => {
//     const newEvent = req.body;
//     const event = new Event(newEvent);
//     try {
//         const savedEvent = await event.save();
//         console.log("Event added")
//         res.status(201).json(savedEvent);
//     } catch (err) {
//         res.status(400).json({message: err.message})
//     }
// });

module.exports = router;