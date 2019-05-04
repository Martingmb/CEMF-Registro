const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Clase = require('../../models/clase');
const Aseo = require('../../models/aseo');
const moment = require('moment');
const Swal = require('sweetalert2');

router.post('/reporteSemanal', (req, res, next) => {

    let aseo = {
        maestro: "5cbbad831cc69593fca18e90",
        monto: req.body.aseo,
        fecha: moment().format()
    }

    let promiseAseo = new Promise(function(resolve, reject) {
        Aseo.create(resolve, reject, aseo)
    }).then(result => {

        let date = new Date(Date.parse(req.body.fecha)).toISOString()
        let objPrueba = {
            alumnos: req.body.asistencia,
            nombre: "5cbbadb81cc69593fca18e91",
            fecha: date,
            biblias: req.body.biblia,
            capitulosLeidos: req.body.capitulos,
            ofrenda: req.body.ofrenda,
            visitantes: req.body.visitantes,
            aseo: result._id,
            clase: 'Jovenes'
        }
        return objPrueba;
    }).then(clase => {
        let promise = new Promise(function(resolve, reject) {
            Clase.create(resolve, reject, clase);
        }).then(result => {
            Swal.fire('Oops...', 'Something went wrong!', 'error');
            res.status(201).render('maestros', { title: 'Maestro' });
        }).catch(err => {
            return res.status(400).send(`Something unexpected occured ${err}`);
        });
    }).catch(err => {
        return res.status(400).send(`Something unexpected occured ${err}`);
    });





    //res.send(objPrueba);

})

module.exports = router;