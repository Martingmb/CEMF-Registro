const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const moment = require('moment');
const reporte = require('./../../models/reporte');

router.post('/reporteMaestro', (req, res, next) => {

    let reporteMaestro = {
        clase: "",
        capitulosLeidos: req.body.capitulos,
        visita: req.body.visito,
        asistenciaAServicio: req.body.servicio,
        maestro: "",
        fecha: moment().format()
    }
    res.status(201).render('maestros', { title: 'Maestro' });
    // res.render('maestros', { title: 'Maestro' })
})


module.exports = router