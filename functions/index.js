const functions = require('firebase-functions');
const express = require('express');
const passport = require('passport');
const router = require('./routes/router')
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
const aseos = require("./routes/api/aseo");
const clases = require("./routes/api/clase");
const maestros = require("./routes/api/maestro");
const reportes = require("./routes/api/reporte");
const tesorerias = require("./routes/api/tesoreria");
const visitantes = require("./routes/api/visitante");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://mgmb:nitram17@cemf-vweqn.mongodb.net/cemf-db?retryWrites=true', { useNewUrlParser: true });

app.use("", router);
app.use("/api/", aseos);
app.use("/api/", clases);
app.use("/api/", maestros);
app.use("/api/", reportes);
app.use("/api/", tesorerias);
app.use("/api/", visitantes);

app.use(flash());

app.use(require("express-session")({
    secret: "Una palabra super secrete que mg genero",
    resave: false,
    saveUninitialized: false
}));

app.set('views', __dirname + '/views')
app.set('view engine', 'pug')

/*
app.use(passport.initialize());
require("./config/passport")(passport);
*/

exports.app = functions.https.onRequest(app);