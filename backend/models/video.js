/*jshint esversion: 6 */

const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    poster: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now(),
    }, tags: {
        type: Array,
        required: true
    }
},
{
    collection: 'Videos'
});

module.exports = mongoose.model('Video', videoSchema);