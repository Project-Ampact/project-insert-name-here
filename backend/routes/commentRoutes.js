/*jshint esversion: 10*/

const express = require("express");
const Comment = require("../models/comment");
const User = require("../models/user");
const Authentication = require('../authentication');
const router = express.Router();

const COMMENTS_PER_PAGE = 10;
// General note: Both replies and comments are one in the same. The difference lies in relative perspective;
//               a commment made on a comment is considered a reply, however that reply is also a comment.

// Get replies given commentId
router.get("/:commentID", Authentication.isAuthenticated, async (req, res) => {
  let commentId = req.params.commentID;

  // Get the specified comment
  const specifiedComment = await Comment.findById(
    commentId,
    (err, comments) => {
      if (err)
        return res
          .status(500)
          .send({ success: false, message: err.toString() });
      if (!comments)
        return res
          .status(404)
          .send({ success: false, message: "Comment not found" });
      return comments.replies;
    }
  );

  console.log(specifiedComment.replies);

  var allReplies = [];
  // Given an array of reply id's, get the reply object matching its id and push into the allReplies array
  for (let i = 0; i < specifiedComment.replies.length; i++) {
    const curReply = await Comment.findById(
      specifiedComment.replies[i],
      (err, replies) => {
        if (err)
          return res
            .status(500)
            .send({ success: false, message: err.toString() });
        if (!replies)
          return res
            .status(404)
            .send({ success: false, message: "Reply not found" });
        return replies;
      }
    );

    allReplies.push(curReply);
  }

  return res.json(allReplies);
});

//Get all comments given a post id

// Create new comment 
router.post("/", Authentication.isAuthenticated, async (req, res) => {
  let message = req.body.message;
  let poster = req.body.poster;
  let pid = req.body.pid;
  let comment = new Comment({ message: message, poster: poster });

  try {
    const savedComment = await comment.save();

    Post.findById(pid, (err, post) => {
      if (err)
        return res
          .status(500)
          .send({ success: false, message: err.toString() });
      if (!post)
        return res
          .status(404)
          .send({
            success: false,
            message: "Post with Id " + pid + " does not exist",
          });
      post.comments.push(savedComment._id);
      Post.findByIdAndUpdate(pid, { comments: post.comments }, (err, post) => {
        if (err)
          return res
            .status(500)
            .send({ success: false, message: err.toString() });
        return res.status(201).json(savedComment); // Successfully created comment, thus return new comment info as json
      });
    });
  } catch (err) {
    // Error in creating a new comment, thus return error message (bad data)
    return res.status(400).json({ message: err.message });
  }
});

// Add new reply to comment
router.post("/add/:commentID", Authentication.isAuthenticated,  async (req, res) => {
  let commentID = req.params.commentID;
  let message = req.body.message;
  let poster = req.body.poster;
  let comment = new Comment({ message: message, poster: poster });

  let savedReply = new Comment();
  try {
    savedReply = await comment.save();
    console.log("Reply created");
    // Successfully created comment, thus return new comment info as json
  } catch (err) {
    // Error in creating a new comment, thus return error message (bad data)
    return res.status(400).json({ message: err.message });
  }

  Comment.findById(commentID, (err, comment2) => {
    // console.log(comment2);
    if (err)
      return res.status(500).send({ success: false, message: err.toString() });
    if (!comment2)
      return res.status(404).send({
        success: false,
        message: "Comment with Id " + commentID + " does not exist",
      });
    comment2.replies.push(savedReply._id);
    Comment.findByIdAndUpdate(
      commentID,
      { replies: comment2.replies },
      (err, comment2) => {
        if (err)
          return res
            .status(500)
            .send({ success: false, message: err.toString() });
        return res.json({ success: true });
      }
    );
  });
});

// Delete comment 
router.delete("/delete/:commentID/:postId", Authentication.isAuthenticated, async (req, res) => {
  let commentID = req.params.commentID;
  let pid = req.params.postId;

  //Delete the comment and replies

  Comment.findById(commentID, async (err, comment) => {
    if (err)
      return res.status(500).send({ success: false, message: err.toString() });
    if (!comment)
      return res.status(404).send({
        success: false,
        message: "Comment with Id " + commentID + " does not exist",
      });
    if (comment.poster != req.user._id && req.user.role != "instructor")
      return res.status(401).send({
        success: false,
        message: "Cannot delete another users comment unless you are an instructor",
      });
    //Delete all the replies of a comment Note: Does not delete replies of replies
    for (let i = 0; i < comment.replies.length; i++) {
      Comment.findByIdAndDelete(comment.replies[i], (err, delObj) => {});
    }
    //Delete the comment itself
    Comment.findByIdAndDelete(comment, (err, delObj) => {
    });
  });

  //Remove comment id from the posts comments array
  Post.findById(pid, (err, post) => {
    if (err)
      return res
        .status(500)
        .send({ success: false, message: err.toString() });
    if (!post)
      return res
        .status(404)
        .send({
          success: false,
          message: "Post with Id " + pid + " does not exist",
        });
    
    try {
      post.comments.pull(commentID);
    } catch (err) {
      return res
        .status(500)
        .send({ success: false, message: err.toString() });
    }
   
    Post.findByIdAndUpdate(pid, { comments: post.comments }, (err, post) => {
      if (err)
        return res
          .status(500)
          .send({ success: false, message: err.toString() });
        return res.json({ success: true }); //Succesfully deleted the comment, all of its replies and the comment id from the posts' list of comments.
    });
  });
});

// Delete reply 
router.delete("/delete/reply/:replyID/:commentID", Authentication.isAuthenticated, async (req, res) => {
  let replyID = req.params.replyID;
  let commentID = req.params.commentID;

  //Delete the comment and replies

  Comment.findById(replyID, async (err, comment) => {
    if (err)
      return res.status(500).send({ success: false, message: err.toString() });
    if (!comment)
      return res.status(404).send({
        success: false,
        message: "Reply with Id " + replyID + " does not exist",
      });
    if (comment.poster != req.user._id && req.user.role != "instructor")
      return res.status(401).send({
        success: false,
        message: "Cannot delete another users comment unless you are an instructor",
      });
    //Delete the comment itself
    Comment.findByIdAndDelete(comment, (err, delObj) => {
    });
  });

  //Remove reply id from the comment replies array
  Comment.findById(commentID, (err, comment2) => {
    if (err)
      return res
        .status(500)
        .send({ success: false, message: err.toString() });
    if (!comment2)
      return res
        .status(404)
        .send({
          success: false,
          message: "Comment with Id " + commentID + " does not exist",
        });
    
        try {
          comment2.replies.pull(replyID);
        } catch (err) {
          return res
            .status(500)
            .send({ success: false, message: err.toString() });
        }

    Comment.findByIdAndUpdate(commentID, { replies: comment2.replies }, (err, post) => {
      if (err)
        return res
          .status(500)
          .send({ success: false, message: err.toString() });
        return res.json({ success: true }); //Succesfully deleted the reply and the reply id from the comments list of replies.
    });
  });
});


module.exports = router;