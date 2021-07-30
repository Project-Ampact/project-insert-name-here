const mongoose = require('mongoose');

const interestSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },

    interests: {
        type: Array,
        required: true,
        default: []
    }
});

module.exports = mongoose.model('Interests', interestSchema);
