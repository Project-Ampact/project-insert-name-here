const express = require("express");
const Comment = require("../models/comment");
const User = require("../models/user");
const router = express.Router();

// General note: Both replies and comments are one in the same. The difference lies in relative perspective;
//               a commment made on a comment is considered a reply, however that reply is also a comment which could have replies.

// Get replies given commentId
router.get("/:commentID", async (req, res) => {
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
    const curReply = await Comment.findById(specifiedComment.replies[i], (err, replies) => {
        if (err)
          return res
            .status(500)
            .send({ success: false, message: err.toString() });
        if (!replies)
          return res
            .status(404)
            .send({ success: false, message: "Reply not found" });
        return replies;
      });

      allReplies.push(curReply);
  }
  
  return res.json(allReplies);
});

//Get all comments given a post id

/*// Update a group attribute(s) 
router.patch("/:groupID", async (req, res) => {
    let groupId = req.params.groupID;
    let groupP
    Group.findById(groupId, async (err, groups) => {
        if (req.body.name != null) {
            groups.name = req.body.name
        }
        // If a groupAbout is provided in the body of the patch request, then update the group about for the group 'groupID'
        if (req.body.about != null) {
            groups.about = req.body.about
        }
        // If a groupPicture is provided in the body of the patch request, then update the profile picture for the group 'groupID'
        if (req.body.picture != null) {
            groups.picture = req.body.picture
        }
        try {
            const updatedGroup = await groups.save()
            res.json(updatedGroup) // Successfully updatedGroup, thus return updated group
        } catch(error) { //Post request had invalid arguments
            res.status(400).json({ message: error.message })
        }
    });
    // If a groupName is provided in the body of the patch request, then update the group name for the group 'groupID'
   
});*/

// Create new comment
router.post("/", async (req, res) => {
  let message = req.body.message;
  let poster = req.body.poster;
  let comment = new Comment({ message: message, poster: poster });

  try {
    const savedComment = await comment.save();
    console.log("Group created");
    res.status(201).json(savedComment); // Successfully created comment, thus return new comment info as json
  } catch (err) {
    // Error in creating a new comment, thus return error message (bad data)
    res.status(400).json({ message: err.message });
  }
});

// Add new reply to comment
router.post("/add/:commentID", async (req, res) => {
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

// Delete comment Note that this needs more work to make it delete all of its replies
router.delete("/delete/:commentID/", async (req, res) => {
  let commentID = req.params.commentID;

  Comment.findById(commentID, async (err, comment) => {
    if (err)
      return res.status(500).send({ success: false, message: err.toString() });
    if (!comment)
      return res.status(404).send({
        success: false,
        message: "Comment with Id " + commentID + " does not exist",
      });
    Comment.findByIdAndDelete(comment, (err, delObj) => {
      return res.json({ success: true });
    });
  });
});

module.exports = router;
