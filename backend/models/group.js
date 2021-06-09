const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = Schema({
    name: String,
    members: [{ type: Schema.Types.ObjectId, ref: 'User'}], 
    owner: Schema.Types.ObjectId
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group; 