/*jshint esversion: 6 */

const mongoose = require('mongoose');

const deliverableSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    instructor: {
        type: String,
        required: true
    },
    fileTypes: {
        type: Array,
        default: []
    },
    totalMarks: {
        type: Number,
        required: true
    },
    dueDate: {
        type: Date,
        default: null
    },
    datePosted: {
        type: Date,
        default: Date.now(),
    }
},
{
    collection: 'Deliverables'
});

module.exports = mongoose.model('Deliverable', deliverableSchema);