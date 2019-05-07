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
        if (req.session.type == 'Maestro') {
            req.session.cookie = person;
            req.session.save(err => {
                res.redirect('/maestro/' + req.sessionID);
            })
        } else {
            req.session.cookie = person;
            console.log(req.session);
            req.session.save(err => {
                res.redirect('/directiva/' + req.sessionID);
            });

        }
    })

});

module.exports = router;