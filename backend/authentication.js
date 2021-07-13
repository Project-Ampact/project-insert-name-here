/*jshint esversion: 10*/

const isAuthenticated = (req, res, next) => {
    if (!req.user) return res.status(401).send({success: false, message: "Unauthorized"});
    next();
};

const isNotAuthenticated = (req, res, next) => {
    if (req.user) return res.status(401).send({success: false, message: "Unauthorized"});
    next();
};

exports.isAutenticated = isAuthenticated;
exports.isNotAutenticated = isNotAuthenticated;