const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const Visitantes = require('../../models/visitante');

let jsonParser = bodyParser.json();

router.get('/visitantes', jsonParser, (req, res) => {
    let promise = new Promise(function (resolve, reject) {
            Visitantes.get(resolve, reject);
        })
        .then(clases => {
            res.json(clases);
        })
        .catch(err => {
            return res.status(500).json(err);
        })
});

router.get('/visitantes/:_id', jsonParser, (req, res) => {
    let promise = new Promise(function (resolve, reject) {
            Visitantes.getOne(resolve, reject, req.params._id);
        })
        .then(clase => {
            res.json(clase);
        })
        .catch(err => {
            return res.status(500).json(err);
        })
});

router.post('/visitantes', jsonParser, (req, res) => {
    const requiredFields = ["nombre", "clase"];
    for (let i = 0; i < requiredFields.length; i++) {
        if (!(requiredFields[i] in req.body)) {
            console.log(`Missing field ${requiredFields[i]}`);
            return res.status(400).send(`Missing field ${requiredFields[i]}`);
        }
    }
    let promise = new Promise(function (resolve, reject) {
        Visitantes.create(resolve, reject, {
            _id: req.body._id,
            clase: req.body.alumnos,
            nombre: req.body.nombre,
        });
    }).then(result => {
        res.status(201).json(result);
    }).catch(err => {
        return res.status(400).send(`Something unexpected occured ${err}`);
    });
});

router.put('/visitantes/:_id', jsonParser, (req, res) => {
    let idParam = req.params._id;
    let idBody = req.body._id;
    if (idParam && idBody && idParam == idBody) {
        let promise = new Promise(function (resolve, reject) {
            let updatedVisitante = {
                _id: req.body._id,
                nombre: req.body.nombre,
                clase: req.body.clase,
            }
            Visitantes.update(resolve, reject, idBody, updatedVisitante);
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

router.delete('/visitantes/:_id', jsonParser, (req, res) => {
    if (req.params._id == req.body._id) {
        let promise = new Promise(function (resolve, reject) {
            Visitantes.delete(resolve, reject, req.body._id);
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