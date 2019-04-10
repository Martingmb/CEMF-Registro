const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const Aseos = require('../../models/aseo');

let jsonParser = bodyParser.json();

router.get('/aseos', jsonParser, (req, res) => {
    let promise = new Promise(function (resolve, reject) {
            Aseos.get(resolve, reject);
        })
        .then(aseos => {
            res.json(aseos);
        })
        .catch(err => {
            return res.status(500).json(err);
        })
});

router.get('/aseos/:_id', jsonParser, (req, res) => {
    let promise = new Promise(function (resolve, reject) {
            Aseos.getOne(resolve, reject, req.params._id);
        })
        .then(aseos => {
            res.json(aseos);
        })
        .catch(err => {
            return res.status(500).json(err);
        })
});

router.post('/aseos', jsonParser, (req, res) => {
    const requiredFields = ["maestro", "monto", "fecha"];
    for (let i = 0; i < requiredFields.length; i++) {
        if (!(requiredFields[i] in req.body)) {
            console.log(`Missing field ${requiredFields[i]}`);
            return res.status(400).send(`Missing field ${requiredFields[i]}`);
        }
    }
    let promise = new Promise(function (resolve, reject) {
        Aseos.create(resolve, reject, {
            _id: req.body._id,
            maestro: req.body.maestro,
            monto: req.body.monto,
            fecha: req.body.fecha,
        });
    }).then(result => {
        res.status(201).json(result);
    }).catch(err => {
        return res.status(400).send(`Something unexpected occured ${err}`);
    });
});

router.put('/aseos/:_id', jsonParser, (req, res) => {
    let idParam = req.params._id;
    let idBody = req.body._id;
    if (idParam && idBody && idParam == idBody) {
        let promise = new Promise(function (resolve, reject) {
            let updatedAseo = {
                _id: req.body._id,
                maestro: req.body.maestro,
                monto: req.body.monto,
                fecha: req.body.fecha,
            }
            Aseos.update(resolve, reject, idBody, updatedAseo);
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

router.delete('/aseos/:_id', jsonParser, (req, res) => {
    if (req.params._id == req.body._id) {
        let promise = new Promise(function (resolve, reject) {
            Aseos.delete(resolve, reject, req.body._id);
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