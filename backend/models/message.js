/*jshint esversion: 6 */

const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    message: {
        type: String
    },
    from: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
  }
);

module.exports = mongoose.model("Message", messageSchema);
