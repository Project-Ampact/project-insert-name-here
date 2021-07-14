/*jshint esversion: 10*/

const express = require("express"); 
const Post = require("../models/post");
const User = require("../models/user");
const Authentication = require('../authentication');
const router = express.Router();

const COMMENTS_PER_PAGE = 10;

// get posts
router.get("/", Authentication.isAuthenticated, async (req, res) => {
    let type = req.body.type;
    let visibility = req.body.visibility; 
    let posts;

    let query = {}; 

    if (type != null) {
        query.type = type;
    }
    if (type != null && visibility != "all") {
        query.visibility = visibility; 
    }

    posts = await Post.find(query).sort( {date: -1} );
    return res.json(posts);
});

// get one specific post
router.get("/:postID", Authentication.isAuthenticated, async (req, res) => {
    let postID = req.params.postID;
    Post.findOne({_id: postID}, (err, post) => {
        if (err && err.name != 'CastError') return res.status(500).send({
            success: false,
            message: err.toString()
        });
        if (!post) return res.status(404).send({
            success: false, 
            message: "Post not found"
        });
        res.json(post);
    });
});

// delete a post
router.delete("/:postID", Authentication.isAuthenticated, async (req, res) => {
    let postID = req.params.postID;
    let post;
    let comment; 
    try {
        post = await Post.findOne({_id: postID}).populate({
           path: "comments",
           model: "Comment" 
        }); 
        if (!post) return res.status(404).send({
            success: false, 
            message: "Post not found"
        });
        for (let i = 0; i < post.comments.length; i++) {
            comment = await Comment.findById(post.comments[i]);
            for (let j = 0; j < comment.replies.length; j++) {
                await Comment.findByIdAndDelete(comment.replies[j]);
            }
           await Comment.findByIdAndDelete(comment._id);
        }

        Post.findById(postId, (err, post) => {
            if (err) return res.status(500).send({success: false, message: err.toString()});
            if (!post) return res.status(404).send({success: false, message: "Post not found"});
            if (post.user != req.user && !Authentication.isInstructor) return res.status(401).send({success: false, message: "Posts can only be deleted by the original poster or instructors"});
            Post.findByIdAndDelete(postId, (err, pst) => {
                if (err) return res.status(500).send({success: false, message: err.toString()});
                return res.json({success: true});
            });
        });
        return res.json(post);
    } catch (err) {
        if (err && err.name != 'CastError') return res.status(500).send({
            success: false,
            message: err.toString()
        });
    }
});

// get comments of one specific post
router.get("/:postID/comments/", Authentication.isAuthenticated, async(req, res) => {
    let postID = req.params.postID;

    let page = req.query.page;
    (page > 0) ? page = parseInt(page) : page = 1;

    let post;

    try {
        post = await Post.findById(postID).populate({
            path: "comments",
            model: "Comment",
            options: {
                skip: (page - 1) * COMMENTS_PER_PAGE,
                limit: COMMENTS_PER_PAGE
            }
        });
        if (!post) return res.status(404).send({
            success: false, 
            message: "Post not found"
        });
        return res.json(post.comments);
    } catch (error) {
        if (error != 'CastError') return res.status(500).send({
            success: false,
            message: error.toString()
        });
    }
});


// make a post
router.post("/", Authentication.isAuthenticated, async (req, res) => {
    let user = req.body.user; 
    let type = req.body.type;
    let content = req.body.content;
    let visibility = req.body.visibility;

    // contains required params 
    if (user == null || type == null || content == null || visibility == null) return res.status(400).json({
        success: false,
        message: "Request body must contain user, type, visibility, and content parameters"
    });

    // check post type is valid
    if (type != 'announcement' && type != 'QnA') return res.status(400).json({
        success: false,
        message: "Type must be QnA or general"
    });

    // check visibility is valid
    if (!['all', 'partner', 'entrepreneur'].includes(visibility)) return res.status(400).json({
        success: false,
        message: "Visibility must be all, partner, or entrepreneur"
    });

    // check user exists
    let userExists = await User.exists({_id: user});
    if (!userExists) return res.status(404).json({
        success: false,
        message: "User could not be found"
    });

    let post = new Post({
        user: user,
        type: type,
        content: content,
        visibility: visibility
    });

    try {
            const savedPost = await post.save(); 
            return res.status(201).json(savedPost);            // Successfully created post; return new post info as json
    } catch (err) {                                   // Error in creating a new group; return error message
            return res.status(400).json({message: err.message})
    }
 }); 
 
 module.exports = router; 
 