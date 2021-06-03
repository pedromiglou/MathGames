const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
        message: "No token provided!"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
        return res.status(401).send({
            message: "Unauthorized!"
        });
        }
        req.userId = decoded.id;
        req.account_type = decoded.account_type;
        next();
    });
};

isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        if (user.account_type == "A") {
            next();
            return;
        }

        res.status(403).send({
            message: "Require Admin Role!"
        });
        return;
    });
};

isTournamentManager = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        if (user.account_type == "T") {
            next();
            return;
        }

        res.status(403).send({
            message: "Require Tournament Manager Role!"
        });
        return;
    });
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isTournamentManager
};
module.exports = authJwt;