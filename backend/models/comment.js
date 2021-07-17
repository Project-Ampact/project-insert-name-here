/*jshint esversion: 6 */

const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    poster: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    replies: {
      type: Array,
      default: [],
    }
  },
  {
    collection: "Comments",
  }
);

module.exports = mongoose.model("Comment", commentSchema);
