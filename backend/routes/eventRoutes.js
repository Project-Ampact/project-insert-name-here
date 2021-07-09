const express = require("express");
const Event = require("../models/events")
const router = express.Router()

// Get events for the user (personal, group, general)
router.get("/", async (req, res) => {
    const userId = req.body.userId;
    const groupId = req.body.groupId;
    //find personal events
    Event.find({$or: [
        {userId: userId, type: "personal"},
        {groupId: groupId, type: "group"},
        {type: "general"}]}, (err, events) => {
        if (err) return res.status(500).send({success: false, message: err.toString()});
        return res.json(events);
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