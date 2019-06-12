const express = require("express");
const router = express.Router();

router.get("/create", function(req, res) {

    const loggedInUsers = require("./users.js").loggedInUsers;
    const currentUser = loggedInUsers.filter(u => u.session === req.sessionID);

    if (!currentUser.length) {
        return res.redirect("/login.html");
    }

    return res.redirect("/create.html");
});

router.get("/login", function(req, res) {

    const loggedInUsers = require("./users.js").loggedInUsers;
    const currentUser = loggedInUsers.filter(u => u.session === req.sessionID);

    if (!currentUser.length) {
        return res.redirect("/login.html");
    }

    return res.redirect("/index.html");
});

router.get("/account", function(req, res) {

    const loggedInUsers = require("./users.js").loggedInUsers;

    const currentUser = loggedInUsers.filter(u => u.session === req.sessionID);

    if (!currentUser.length) {
        return res.redirect("/login.html");
    }

    return res.redirect("/account.html");
});

/* GET home page. */
router.get("/*", function(req, res, next) {
    res.redirect("/index.html");
});

module.exports = router;
