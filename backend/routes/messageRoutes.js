/*jshint esversion: 10*/

const express = require("express"); 
const router = express.Router();
const Chatroom = require("../models/chatroom");

// Get ids of most recent chats with listed user
router.get("/:userID", async (req, res) => {
    let userID = req.params.userID;
    let chatrooms = await Chatroom.find({members: userID}).sort({lastMessage: -1});
    return res.json(chatrooms);
});

module.exports = router; 