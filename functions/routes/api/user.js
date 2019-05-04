const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../../models/user');


router.post('/m/registro', (req, res, next) => {
    User.register(new User({
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            title: req.body.title,
            type: req.body.type
        }),
        req.body.password, (err, user) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.json({
                    err: err
                });
            } else {
                passport.authenticate('local')(req, res, () => {
                    User.findOne({
                        username: req.body.username
                    }, (err, person) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.render('admin', { title: 'Registro de Usuarios' })
                    });
                })
            }
        })

})


module.exports = router;