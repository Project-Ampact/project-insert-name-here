const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user: { // user who made the post
        type: String,
        required: true
    },
    type: { // type of post: QnA or general
        type: String,
        required: true,
    },
    content: { // content of the post
        type: String,
        required: true,
    },
    date: { // when the post was made
        type: Date,
        default: Date.now(),
    },
    visibility: {
        type: String,
        required: true
    },
    comments: {
        type: Array,
        default: []
    }
});

module.exports = mongoose.model('Post', postSchema);