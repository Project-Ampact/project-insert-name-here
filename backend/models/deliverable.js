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
    dueDate: {
        type: Date,
        default: null
    },
    instructor: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now(),
    }
},
{
    collection: 'Deliverables'
});

module.exports = mongoose.model('Deliverable', deliverableSchema);