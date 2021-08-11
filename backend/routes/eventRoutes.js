/*jshint esversion: 10*/

const express = require("express");
const Event = require("../models/events");
const Group = require("../models/group");
const User = require("../models/user");
const Profile = require('../models/profile');

const Authentication = require('../authentication');
const router = express.Router();

router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;

  Profile.findById(userId, (err, result) => {
    if (err)
      return res.status(500).send({ success: false, message: err.toString() });

    if (!result)
      return res.status(404).send({sucess: false, message: 'User not found'});

    console.log(result.role)
    const role = result.role;

    Group.findOne({ members: userId }, (err, result) => {
      console.log(result);
      if (err)
        return res.status(500).send({ success: false, message: err.toString() });
      if (!result) groupSearch = null;
  
      let query;
  
      if (role === 'entrepreneur' || role === 'instructor') {
        query = {
          $or: [
            { userId: userId, type: "personal" },
            { groupId: result === null ? null : result._id, type: "group" },
            { type: "general" },
            { type: "assignment" }
          ]
        }
      } else {
        query = {
          $or: [
            { userId: userId, type: "personal" },
            { groupId: result === null ? null : result._id, type: "group" },
            { type: "general" }
          ]
        }
      }
  
      Event.find(query,
        (err, events) => {
          if (err)
            return res
              .status(500)
              .send({ success: false, message: err.toString() });
          if (!events)
            return res
              .status(404)
              .send({ success: false, message: "User's events not found" });
          return res.json(events);
        }
      );
    });
  })
});

router.post("/", async (req, res) => {

  let title = req.body.title;
  let description = req.body.description;
  let conferenceLink = req.body.conferenceLink;
  let start = req.body.start;
  let end = req.body.end;
  let type = req.body.type;
  let groupId = req.body.groupId;
  let userId = req.body.userId;

  // Make sure all required values are filled in
  if (
    title == null ||
    description == null ||
    start == null ||
    end == null ||
    type == null ||
    userId == null
  )
    return res.status(400).json({
      success: false,
      message: "Request body must contain title, description, start, end, type and userId filled",
    });
 // Make sure that the user creating it actually exists
  let userExists = await User.exists({ _id:userId});
  if (!userExists) return res.status(404).json({
      success: false,
      message: "User could not be found"
    });

// Make sure the types are only the specified values
 if(type != 'general' && type != 'group' && type != 'personal') return res.status(400).json ({
    success: false,
    message: "Type must be general, group or personal"
 });


 // Create event 
 let newEvent = new Event({
    title: title,
    description: description,
    conferenceLink: conferenceLink,
    start: start,
    end: end,
    type: type,
    groupId: groupId,
    userId: userId,
  });

  try {
    const savedEvent = await newEvent.save();
    console.log("Event added");
    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.delete("/:eventId", Authentication.isAuthenticated, async (req, res) => {
  const eventId = req.params.eventId;

  Event.deleteOne({_id: eventId}, (err, events) => {
    console.log(err, events)

    if (err)
      return res
        .status(500)
        .send({ success: false, message: err.toString() });
    if (events.deletedCount === 0)
      return res
        .status(404)
        .send({ success: false, message: "Event not found" });
    return res.json({success: true, message: "Event has been deleted"});
  })
})

module.exports = router;
