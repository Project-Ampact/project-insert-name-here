const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = Schema({
    name: {
        type: String,
        required: true
    },
    members: [{ type: String, ref: 'User'}], 
    owner: Schema.Types.ObjectId,
    about: {
        type: String,
        required: false,
        default: "About me"
    },
    picture: {
        type: String,
        required: false,
        default: "Default"
    } 
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group; 