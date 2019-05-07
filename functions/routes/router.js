const express = require('express');
const router = express.Router();
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const { DATABASE_URL, PORT } = require('../config');
const mongoose = require('mongoose');

mongoose.connect(DATABASE_URL, { useNewUrlParser: true });


router.get('/maestro/:id', (req, res, next) => {

    let store = new MongoStore({
        mongooseConnection: mongoose.connection
    })

    store.get(req.params.id, (err, user) => {
        if (err) {
            throw err;
        }

        req.sessionID = req.params.id;

        req.session.save(err => {
            res.render('maestros', { title: 'Maestro', titulo: user.cookie.title, name: user.cookie.name, maestro: req.params.id, session: req.params.id });
        })

    })

})

router.get('/reporteSemanal', (req, res, next) => {
    res.send('You are not authorized to see this page');
})

router.get('/reporteSemanal/:id', (req, res, next) => {
    res.render('reporteSemanal', { title: 'Home', maestro: req.params.id });
})


router.get('/reporteMaestro', (req, res, next) => {
    res.send('You are not authorized to see this page');
})

router.get('/reporteMaestro/:id', (req, res, next) => {
    res.render('reporteMaestro', { title: 'Home', maestro: req.params.id });
})


router.get('/m/registro', (req, res, next) => {
    res.render('admin', { title: "Registro" });
})

router.get('/', (req, res, next) => {
    res.render('index', { title: 'Home' });
})

router.get('/login', (req, res, next) => {
    res.render('login', { title: 'Login' });
})

router.get('/directiva', (req, res, next) => {
    res.send("You are not authorized to see this page!");
})

router.get('/directiva/:id', (req, res, next) => {


    let store = new MongoStore({
        mongooseConnection: mongoose.connection
    })

    store.get(req.params.id, (err, user) => {
        if (err) {
            throw err;
        }

        req.sessionID = req.params.id;

        req.session.save(err => {
            res.render('directiva', { title: 'Directiva', titulo: user.cookie.title, name: user.cookie.name, directivo: req.params.id });
        })

    })


})

router.get('/registroTesoreria/:id', (req, res, next) => {
    res.render('registroTesoreria', { title: 'Login', directivo: req.params.id });
})

router.get('/registroSalon/:id', (req, res, next) => {
    res.render('registroSalon', { title: 'Login', directivo: req.params.id });
})

router.get('/generarReporte', (req, res, next) => {
    res.render('generarReporte', { title: 'Login' });
})


router.get('/reporteAseo/:id', (req, res, next) => {
    res.render('registroAseo', { title: 'Aseo', maestro: req.params.id })
})


//Post methods



module.exports = router;