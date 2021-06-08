/*jshint esversion: 6 */

const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
},
{
    collection: 'Users'
});

class User{
    //add custom static methods here
}

userSchema.loadClass(User);

module.exports = mongoose.model('User', userSchema);