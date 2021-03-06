const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Clase = require('../../models/clase');
const Aseo = require('../../models/aseo');
const User = require('../../models/user');
const moment = require('moment');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const { DATABASE_URL, PORT } = require('../../config');

mongoose.connect(DATABASE_URL, { useNewUrlParser: true });

router.post('/reporteSemanal', (req, res, next) => {

    let store = new MongoStore({
        mongooseConnection: mongoose.connection
    })

    store.get(req.body.maestro, (err, session) => {
        let aseo = {
            maestro: session.cookie._id,
            monto: req.body.aseo,
            fecha: moment().format()
        }

        let promiseAseo = new Promise(function(resolve, reject) {
            Aseo.create(resolve, reject, aseo);
        }).then(result => {


            return User.findById(result.maestro, (err, maestro) => {
                if (err) {
                    throw err;
                }

                return maestro.clase
            }).then(res => {
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
                    clase: res.clase
                }
                console.log(reporteSemanal);
                return reporteSemanal;
            })
        }).then(clase => {
            let promise = new Promise(function(resolve, reject) {
                Clase.create(resolve, reject, clase);
            }).then(result => {
                let maestro = result.maestro;
                console.log(maestro)
                let store = new MongoStore({
                    mongooseConnection: mongoose.connection
                })

                return res.redirect('/maestro/' + req.body.maestro);
            }).catch(err => {
                return res.status(400).send(`Something unexpected occured ${err}`);
            });
        }).catch(err => {
            return res.status(400).send(`Something unexpected occured ${err}`);
        });
    })



})

module.exports = router;