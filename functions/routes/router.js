const express = require('express');
const router = express.Router();

router.get('/test', (req, res, next) => {
    res.send('Hello there you have connected succesfully')
    console.log("Entre a la funcion de test")
})

router.get('/test2', (req, res, next) => {
    res.render('index', { title: 'Home' });
})

router.get('/test3', (req, res, next) => {
    res.render('maestros', { title: 'Home' });
})

router.get('/maestro', (req, res, next) => {
    res.render('maestros', { title: 'Home' });
})

router.get('/reporteSemanal', (req, res, next) => {
    res.render('reporteSemanal', { title: 'Home' });
})

router.get('/reporteMaestro', (req, res, next) => {
    res.render('reporteMaestro', { title: 'Home' });
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
    res.send({
        status: "This is the session object",
        session: req.session
    })

    //res.render('directiva', { title: 'Directiva' });
})

router.get('/registroTesoreria', (req, res, next) => {
    res.render('registroTesoreria', { title: 'Login' });
})

router.get('/registroSalon', (req, res, next) => {
    res.render('registroSalon', { title: 'Login' });
})

router.get('/generarReporte', (req, res, next) => {
    res.render('generarReporte', { title: 'Login' });
})


//Post methods



module.exports = router;