const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const Tesorerias = require('../../models/tesoreria');

let jsonParser = bodyParser.json();

router.get('/tesorerias', jsonParser, (req, res) => {
    let promise = new Promise(function (resolve, reject) {
            Tesorerias.get(resolve, reject);
        })
        .then(clases => {
            res.json(clases);
        })
        .catch(err => {
            return res.status(500).json(err);
        })
});

router.get('/tesorerias/:_id', jsonParser, (req, res) => {
    let promise = new Promise(function (resolve, reject) {
            Tesorerias.getOne(resolve, reject, req.params._id);
        })
        .then(clase => {
            res.json(clase);
        })
        .catch(err => {
            return res.status(500).json(err);
        })
});

router.post('/tesorerias', jsonParser, (req, res) => {
    const requiredFields = ["monto", "razon", "tipoDeGasto", "fecha"];
    for (let i = 0; i < requiredFields.length; i++) {
        if (!(requiredFields[i] in req.body)) {
            console.log(`Missing field ${requiredFields[i]}`);
            return res.status(400).send(`Missing field ${requiredFields[i]}`);
        }
    }
    let promise = new Promise(function (resolve, reject) {
        Tesorerias.create(resolve, reject, {
            _id: req.body._id,
            monto: req.body.alumnos,
            razon: req.body.nombre,
            tipoDeGasto: req.body.fecha,
            fecha: req.body.biblias,
        });
    }).then(result => {
        res.status(201).json(result);
    }).catch(err => {
        return res.status(400).send(`Something unexpected occured ${err}`);
    });
});

router.put('/tesorerias/:_id', jsonParser, (req, res) => {
    let idParam = req.params._id;
    let idBody = req.body._id;
    if (idParam && idBody && idParam == idBody) {
        let promise = new Promise(function (resolve, reject) {
            let updatedTesoreria = {
                _id: req.body._id,
                monto: req.body.alumnos,
                razon: req.body.nombre,
                tipoDeGasto: req.body.fecha,
                fecha: req.body.biblias,
            }
            Tesorerias.update(resolve, reject, idBody, updatedTesoreria);
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

router.delete('/tesorerias/:_id', jsonParser, (req, res) => {
    if (req.params._id == req.body._id) {
        let promise = new Promise(function (resolve, reject) {
            Tesorerias.delete(resolve, reject, req.body._id);
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