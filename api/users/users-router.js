const router = require("express").Router();

const Users = require("./users-model");

const restricted = (req, res, next) => {
    if (req.session && req.session.user) {
        next();
    } else {
        res.status(401).json("unauthorized");
    }
};

router.get("/", restricted, (req, res) => {
    Users.find()
        .then((users) => {
            res.status(200).json(users);
        })
        .catch((err) => res.status(500).json(err));
});

module.exports = router;
