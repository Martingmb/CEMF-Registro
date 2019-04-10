const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const Clases = require('../../models/clase');

let jsonParser = bodyParser.json();

router.get('/clases', jsonParser, (req, res) => {
    let promise = new Promise(function (resolve, reject) {
            Clases.get(resolve, reject);
        })
        .then(clases => {
            res.json(clases);
        })
        .catch(err => {
            return res.status(500).json(err);
        })
});

router.get('/clases/:_id', jsonParser, (req, res) => {
    let promise = new Promise(function (resolve, reject) {
            Clases.getOne(resolve, reject, req.params._id);
        })
        .then(clase => {
            res.json(clase);
        })
        .catch(err => {
            return res.status(500).json(err);
        })
});

router.post('/clases', jsonParser, (req, res) => {
    const requiredFields = ["alumnos", "nombre", "fecha", "biblias", "capitulosLeidos", "ofrenda", "visitantes", "aseo", "clase"];
    for (let i = 0; i < requiredFields.length; i++) {
        if (!(requiredFields[i] in req.body)) {
            console.log(`Missing field ${requiredFields[i]}`);
            return res.status(400).send(`Missing field ${requiredFields[i]}`);
        }
    }
    let promise = new Promise(function (resolve, reject) {
        Clases.create(resolve, reject, {
            _id: req.body._id,
            alumnos: req.body.alumnos,
            nombre: req.body.nombre,
            fecha: req.body.fecha,
            biblias: req.body.biblias,
            capitulosLeidos: req.body.capitulosLeidos,
            ofrenda: req.body.ofrenda,
            visitantes: req.body.visitantes,
            aseo: req.body.aseo,
            clase: req.body.clase,
        });
    }).then(result => {
        res.status(201).json(result);
    }).catch(err => {
        return res.status(400).send(`Something unexpected occured ${err}`);
    });
});

router.put('/clases/:_id', jsonParser, (req, res) => {
    let idParam = req.params._id;
    let idBody = req.body._id;
    if (idParam && idBody && idParam == idBody) {
        let promise = new Promise(function (resolve, reject) {
            let updatedClase = {
                _id: req.body._id,
                alumnos: req.body.alumnos,
                nombre: req.body.nombre,
                fecha: req.body.fecha,
                biblias: req.body.biblias,
                capitulosLeidos: req.body.capitulosLeidos,
                ofrenda: req.body.ofrenda,
                visitantes: req.body.visitantes,
                aseo: req.body.aseo,
                clase: req.body.clase,
            }
            Clases.update(resolve, reject, idBody, updatedClase);
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

router.delete('/clases/:_id', jsonParser, (req, res) => {
    if (req.params._id == req.body._id) {
        let promise = new Promise(function (resolve, reject) {
            Clases.delete(resolve, reject, req.body._id);
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