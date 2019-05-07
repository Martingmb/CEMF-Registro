const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const tesoreria = require('../../models/tesoreria');
const moment = require('moment');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const { DATABASE_URL, PORT } = require('../../config');

mongoose.connect(DATABASE_URL, { useNewUrlParser: true });

router.post('/registroTesoreria', (req, res, next) => {

    let store = new MongoStore({
        mongooseConnection: mongoose.connection
    })

    store.get(req.body.directivo, (err, session) => {
        let tesoreriaReporte = {
            directivo: session.cookie._id,
            monto: req.body.monto,
            razon: req.body.razon,
            tipoDeGasto: req.body.gasto,
            fecha: moment().format()
        }

        console.log(tesoreriaReporte);
        let promise = new Promise((resolve, reject) => {
            tesoreria.create(resolve, reject, tesoreriaReporte);
        }).then(result => {
            res.redirect('/directiva/' + req.body.directivo);
        }).catch(err => {
            if (err) {
                throw err;
            }
            return res.status(400).send(`Something unexpected occured ${err}`);
        })

    })

})


module.exports = router