const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../../models/user');

router.post('/login', passport.authenticate('local'), (req, res) => {
    User.findOne({
        username: req.body.username,
        password: req.body.password
    }, (err, person) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        req.session.type = person.type;
        console.log(req.sessionID);
        if (req.session.type == 'Maestro') {
            req.session.name = person.name;
            req.session.type = person.type;
            res.redirect('/maestro');
        } else {
            req.session.name = person.name;
            req.session.type = person.type;
            req.session.cookie = person;
            console.log(req.session);
            req.session.save();
            res.redirect('/directiva');
        }
    })
});

module.exports = router;