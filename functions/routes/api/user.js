const express = require('express');
const session = require('express-session');
const passport = require('passport');
const router = express.Router();
const User = require('../../models/user');
const MongoStore = require('connect-mongo')(session);
const { DATABASE_URL, PORT } = require('../../config');
const mongoose = require('mongoose');

mongoose.connect(DATABASE_URL, { useNewUrlParser: true });


router.post('/m/registro', (req, res, next) => {

    if (req.body.type === "Maestro") {

        User.register(new User({
                username: req.body.username,
                password: req.body.password,
                name: req.body.name,
                title: req.body.title,
                type: req.body.type,
                clase: req.body.clase
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

                            let store = new MongoStore({
                                mongooseConnection: mongoose.connection
                            })

                            store.destroy(req.sessionID, (err) => {
                                if (err) {
                                    throw err;
                                }

                                res.redirect('/m/registro');

                            })

                        });
                    })
                }
            })

    } else {

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

                            let store = new MongoStore({
                                mongooseConnection: mongoose.connection
                            })

                            store.destroy(req.sessionID, (err) => {
                                if (err) {
                                    throw err;
                                }

                                res.redirect('/m/registro');

                            })

                        });
                    })
                }
            })
    }


})


module.exports = router;