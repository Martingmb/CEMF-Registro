const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const Maestros = require('../../models/maestro');

let jsonParser = bodyParser.json();

router.get('/maestros', jsonParser, (req, res) => {
    let promise = new Promise(function (resolve, reject) {
            Maestros.get(resolve, reject);
        })
        .then(maestros => {
            res.json(maestros);
        })
        .catch(err => {
            return res.status(500).json(err);
        })
});

router.get('/maestros/:_id', jsonParser, (req, res) => {
    let promise = new Promise(function (resolve, reject) {
            Maestros.getOne(resolve, reject, req.params._id);
        })
        .then(maestro => {
            res.json(maestro);
        })
        .catch(err => {
            return res.status(500).json(err);
        })
});

router.post('/maestros', jsonParser, (req, res) => {
    const requiredFields = ["usuario", "nombre", "clase"];
    for (let i = 0; i < requiredFields.length; i++) {
        if (!(requiredFields[i] in req.body)) {
            console.log(`Missing field ${requiredFields[i]}`);
            return res.status(400).send(`Missing field ${requiredFields[i]}`);
        }
    }
    let promise = new Promise(function (resolve, reject) {
        Maestros.create(resolve, reject, {
            _id: req.body._id,
            usuario: req.body.usuario,
            nombre: req.body.nombre,
            clase: req.body.clase,
        });
    }).then(result => {
        res.status(201).json(result);
    }).catch(err => {
        return res.status(400).send(`Something unexpected occured ${err}`);
    });
});

router.put('/maestros/:_id', jsonParser, (req, res) => {
    let idParam = req.params._id;
    let idBody = req.body._id;
    if (idParam && idBody && idParam == idBody) {
        let promise = new Promise(function (resolve, reject) {
            let updatedMaestro = {
                _id: req.body._id,
                usuario: req.body.usuario,
                nombre: req.body.nombre,
                clase: req.body.clase,
            }
            Maestros.update(resolve, reject, idBody, updatedMaestro);
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

router.delete('/maestros/:_id', jsonParser, (req, res) => {
    if (req.params._id == req.body._id) {
        let promise = new Promise(function (resolve, reject) {
            Maestros.delete(resolve, reject, req.body._id);
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