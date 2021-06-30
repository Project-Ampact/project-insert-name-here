/*jshint esversion: 6 */

const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        default: ""
    },
    lastName: {
        type: String,
        default: ""
    },
    picture: {
        type: String,
        default: "https://picsum.photos/200/100"
    },
    bio: {
        type: String,
        default: ""
    },
    role: {
        type: String,
        required: true
    },
    dateJoined: {
        type: Date,
        default: Date.now()
    }
},
{
    collection: 'Profiles'
});

module.exports = mongoose.model('Profile', profileSchema);