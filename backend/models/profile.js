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

profileSchema.index({
    firstName: 'text',
    lastName: 'text',
    bio: 'text',
    },
    {weights: {
        firstName: 5,
        lastName: 4,
        bio: 3,
    }});

module.exports = mongoose.model('Profile', profileSchema);