const express = require("express"); 
const Post = require("../models/post");
const User = require("../models/user")
const router = express.Router();

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
 