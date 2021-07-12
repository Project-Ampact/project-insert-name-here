const express = require("express"); 
const Post = require("../models/post");
const User = require("../models/user")
const router = express.Router();

const COMMENTS_PER_PAGE = 10;

// get posts
router.get("/", async (req, res) => {
    let type = req.body.type;
    let posts;
    console.log("TYPE: " + type);
    if (type == null) {
        posts = await Post.find({}).sort( {date: -1} );
    }
    else {
        posts = await Post.find({type: type}).sort( {date: -1} );
    }
    return res.json(posts);
});

// get one specific post
router.get("/:postID", async (req, res) => {
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

// get comments of one specific post
router.get("/:postID/comments/", async(req, res) => {
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
        return res.json(post);
    } catch (error) {
        if (error != 'CastError') return res.status(500).send({
            success: false,
            message: error.toString()
        });
    }
});

// make a post
router.post("/", async (req, res) => {
        let user = req.body.user; 
        let type = req.body.type;
        let content = req.body.content;

        // contains required params 
        if (user == null || type == null || content == null) return res.status(400).json({
            success: false,
            message: "Request body must contain user, type, and content parameters"
        });

        // check post type is valid
        if (type != 'QnA' && type != 'general') return res.status(400).json({
            success: false,
            message: "Type must be QnA or general"
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
            content: content
        });

        try {
             const savedPost = await post.save(); 
             return res.status(201).json(savedPost);            // Successfully created post; return new post info as json
        } catch (err) {                                   // Error in creating a new group; return error message
             return res.status(400).json({message: err.message})
        }
 }); 
 
 module.exports = router; 
 