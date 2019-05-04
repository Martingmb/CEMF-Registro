const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const Reportes = require('../../models/reporte');

let jsonParser = bodyParser.json();

router.get('/reportes', jsonParser, (req, res) => {
    let promise = new Promise(function(resolve, reject) {
            Reportes.get(resolve, reject);
        })
        .then(reportes => {
            res.json(reportes);
        })
        .catch(err => {
            return res.status(500).json(err);
        })
});

router.get('/reportes/:_id', jsonParser, (req, res) => {
    let promise = new Promise(function(resolve, reject) {
            Reportes.getOne(resolve, reject, req.params._id);
        })
        .then(reporte => {
            res.json(reporte);
        })
        .catch(err => {
            return res.status(500).json(err);
        })
});

router.post('/reportes', jsonParser, (req, res) => {
    const requiredFields = ["clase", "capitulosLeidos", "visita", "asistenciaAServicio", "maestro", "fecha", "biblias"];
    for (let i = 0; i < requiredFields.length; i++) {
        if (!(requiredFields[i] in req.body)) {
            console.log(`Missing field ${requiredFields[i]}`);
            return res.status(400).send(`Missing field ${requiredFields[i]}`);
        }
    }
    let promise = new Promise(function(resolve, reject) {
        Reportes.create(resolve, reject, {
            _id: req.body._id,
            clase: req.body.alumnos,
            capitulosLeidos: req.body.nombre,
            visita: req.body.fecha,
            asistenciaAServicio: req.body.biblias,
            maestro: req.body.capitulosLeidos,
            fecha: req.body.ofrenda,
            biblias: req.body.visitantes,
        });
    }).then(result => {
        res.status(201).json(result);
    }).catch(err => {
        return res.status(400).send(`Something unexpected occured ${err}`);
    });
});

router.put('/reportes/:_id', jsonParser, (req, res) => {
    let idParam = req.params._id;
    let idBody = req.body._id;
    if (idParam && idBody && idParam == idBody) {
        let promise = new Promise(function(resolve, reject) {
            let updatedReporte = {
                _id: req.body._id,
                clase: req.body.alumnos,
                capitulosLeidos: req.body.nombre,
                visita: req.body.fecha,
                asistenciaAServicio: req.body.biblias,
                maestro: req.body.capitulosLeidos,
                fecha: req.body.ofrenda,
                biblias: req.body.visitantes,
            }
            Reportes.update(resolve, reject, idBody, updatedReporte);
        }).then(result => {
            res.status(204).end();
        }).catch(err => {
            return res.status(500).json(err);
        });

    } else {
        return res.status(400).json({
            err: "Id does not coincide with body"
        });
    }
});

router.delete('/reportes/:_id', jsonParser, (req, res) => {
    if (req.params._id == req.body._id) {
        let promise = new Promise(function(resolve, reject) {
            Reportes.delete(resolve, reject, req.body._id);
        }).then(result => {
            res.status(204).end();
        }).catch(err => {
            return res.status(400).send('Id not found in Products');
        });
    } else {
        return res.status(400).send('Parameter does not coincide with body');
    }
});

module.exports = router;