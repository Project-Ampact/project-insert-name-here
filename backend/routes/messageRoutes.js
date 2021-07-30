/*jshint esversion: 10*/

const express = require("express"); 
const router = express.Router();
const Chatroom = require("../models/chatroom");

// Get most recent chats with listed user
router.get("/:userID", async (req, res) => {
    let userID = req.params.userID;
    let chatrooms = await Chatroom.find({members: userID}).sort({lastMessage: -1}).populate(
        {
            path: "members",
            model: "Profile",
            select: {'_id': 1, 'firstName': 1, 'lastName': 1, 'role': 1},
            options: {
              limit: 25
            }
         }
    )
    let response = [];
    for (let i = 0; i < chatrooms.length; i++) {
        if (chatrooms[i].members._id != userID) {
            response.push(chatrooms[i].members[1]);
        } else {
            response.push(chatrooms[i].members[0])
        }
    }
    return res.json(response);
});

module.exports = router; 