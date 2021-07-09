const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    groupId: {
        type: String,
        required: false
    },
    userId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Event', eventSchema);