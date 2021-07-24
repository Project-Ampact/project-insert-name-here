/*jshint esversion: 10*/
const Group = require("./models/group");

const isAuthenticated = (req, res, next) => {
    if (!req.user) return res.status(401).send({success: false, message: "Unauthorized"});
    next();
};

const isNotAuthenticated = (req, res, next) => {
    if (req.user) return res.status(401).send({success: false, message: "Unauthorized"});
    next();
};

const isInstructor = (req, res, next) => {
    if (req.user.role != "instructor") return res.status(401).send({success: false, message: "Unauthorized"});
    next();
};

const isGroupOwner = (name, groupId) => {
    Group.findById(groupId, (err, group) => {
        if (err || !group) return false;
        return group.owner === name;
    });
};

exports.isAuthenticated = isAuthenticated;
exports.isNotAuthenticated = isNotAuthenticated;
exports.isGroupOwner = isGroupOwner;
exports.isInstructor = isInstructor;