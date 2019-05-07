const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Aseo = require('../../models/aseo');
const moment = require('moment');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const { DATABASE_URL, PORT } = require('../../config');

mongoose.connect(DATABASE_URL, { useNewUrlParser: true });

router.post('/registroAseo', (req, res, nex) => {

    let store = new MongoStore({
        mongooseConnection: mongoose.connection
    })

    store.get(req.body.maestro, (err, session) => {
        if (err) {
            throw err;
        }

        let aseo = {
            maestro: session.cookie._id,
            monto: req.body.aseo,
            fecha: moment().format()
        }

        let promise = new Promise((resolve, reject) => {
            Aseo.create(resolve, reject, aseo)
        }).then(result => {
            return res.redirect('/maestro/' + req.body.maestro);
        }).catch(err => {
            return res.status(400).send(`Something unexpected occured ${err}`);
        });

    })

})

module.exports = router;