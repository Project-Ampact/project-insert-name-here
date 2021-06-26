const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    members: { 
        type: Array, 
        required: true
    }, 
    owner: {
        type: String
    },
    about: {
        type: String,
        required: false,
        default: "About me"
    },
    picture: {
        type: String,
        required: false,
        default: "https://picsum.photos/200/100"
    } 
});

groupSchema.index({name: 'text', 
    about: 'text',
    owner: 'text'},
    {weights: {
        name: 5,
        about: 2,
    }});
const Group = mongoose.model('Group', groupSchema);

module.exports = Group; 