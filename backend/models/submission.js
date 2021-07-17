/*jshint esversion: 6 */

const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    submission: {
        type: String,
        default: ""
    },
    assignment: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now(),
    }
},
{
    collection: 'Submission'
});

module.exports = mongoose.model('Submission', submissionSchema);