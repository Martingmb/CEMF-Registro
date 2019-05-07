const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Clase = require('../../models/clase');
const Aseo = require('../../models/aseo');
const moment = require('moment');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const { DATABASE_URL, PORT } = require('../../config');

mongoose.connect(DATABASE_URL, { useNewUrlParser: true });

router.post('/registroSalon', (req, res, next) => {

    let store = new MongoStore({
        mongooseConnection: mongoose.connection
    })

    store.get(req.body.directivo, (err, session) => {
        let aseo = {
            maestro: session.cookie._id,
            monto: req.body.aseo,
            fecha: moment().format()
        }

        let promiseAseo = new Promise(function(resolve, reject) {
            Aseo.create(resolve, reject, aseo);
        }).then(result => {

            let time = moment().format("HH:mm:ss.SSS[Z]");
            let momentDate = moment(req.body.fecha).format("YYYY-MM-DDT");
            let newDate = momentDate + time;
            let reporteSemanal = {
                alumnos: req.body.asistencia,
                maestro: result.maestro,
                fecha: newDate,
                biblias: req.body.biblia,
                capitulosLeidos: req.body.capitulos,
                ofrenda: req.body.ofrenda,
                visitantes: req.body.visitantes,
                aseo: result._id,
                clase: req.body.clase
            }

            return reporteSemanal;
        }).then(clase => {
            let promise = new Promise(function(resolve, reject) {
                Clase.create(resolve, reject, clase);
            }).then(result => {
                let directivo = result.maestro;
                console.log(directivo)
                let store = new MongoStore({
                    mongooseConnection: mongoose.connection
                })

                return res.redirect('/directiva/' + req.body.directivo);
            }).catch(err => {
                return res.status(400).send(`Something unexpected occured ${err}`);
            });
        }).catch(err => {
            return res.status(400).send(`Something unexpected occured ${err}`);
        });
    })



})

module.exports = router;