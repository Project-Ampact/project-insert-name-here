/*jshint esversion: 6 */

const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    file: {
        type: Object,
        required: true
    },
    assignment: {
        type: String,
        required: true
    },
    grade: {
        type: Number,
        default: null
    },
    feedback: {
        type: String,
        default: ""
    },
    submissionTime: {
        type: Date,
        default: Date.now(),
    }
},
{
    collection: 'Submissions'
});

module.exports = mongoose.model('Submission', submissionSchema);