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
    isGeneral: {
        type: Boolean,
        required: true
    },
    groupId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Event', eventSchema);