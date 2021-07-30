/*jshint esversion: 6 */

const mongoose = require("mongoose");

const chatroomSchema = new mongoose.Schema(
  {
    members: {
        type: Array,
        required: true
    },
    messageLog: {
        type: Array,
        required: true,
        default: []
    },
    lastMessage: {
        type: Date
    }
  });

module.exports = mongoose.model("Chatroom", chatroomSchema);
