const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const moment = require('moment');
const reporte = require('./../../models/reporte');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const { DATABASE_URL, PORT } = require('../../config');

mongoose.connect(DATABASE_URL, { useNewUrlParser: true });

router.post('/reporteMaestro', (req, res, next) => {


    let store = new MongoStore({
        mongooseConnection: mongoose.connection
    })

    store.get(req.body.maestro, (err, session) => {

        let reporteMaestro = {
            clase: session.cookie.clase,
            capitulosLeidos: req.body.capitulos,
            visita: req.body.visita,
            asistenciaAServicio: req.body.servicio,
            maestro: session.cookie._id,
            fecha: moment().format()
        }
        console.log(reporteMaestro);
        let promiseAseo = new Promise(function(resolve, reject) {
            reporte.create(resolve, reject, reporteMaestro);
        }).then(result => {
            res.redirect('/maestro/' + req.body.maestro);
        }).catch(err => {
            return res.status(400).send(`Something unexpected occured ${err}`);
        });
    })

})


module.exports = router