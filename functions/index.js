const functions = require('firebase-functions');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const router = require('./routes/router')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo')(session);
const { DATABASE_URL, PORT } = require('./config');
const reporteSemanal = require('./routes/api/reporteSemanal');
const reporteMaestro = require('./routes/api/reporteMaestro');
const aseos = require("./routes/api/aseo");
const clases = require("./routes/api/clase");
const maestros = require("./routes/api/maestro");
const reportes = require("./routes/api/reporte");
const tesorerias = require("./routes/api/tesoreria");
const visitantes = require("./routes/api/visitante");
const registro = require("./routes/api/user");
const login = require("./routes/api/login");
const User = require('./models/user');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(DATABASE_URL, { useNewUrlParser: true });

const db = mongoose.connection;

app.use(session({
    name: 'session-id',
    secret: '123-456-789',
    saveUninitialized: true,
    expires: false,
    secure: false,
    store: new MongoStore({
        mongooseConnection: db,
        ttl: 10 * 60,
        autoRemove: 'interval',
        autoRemoveInterval: 10
    })
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect(DATABASE_URL, { useNewUrlParser: true });

app.use("", router);
app.use("", reporteSemanal);
app.use("", reporteMaestro);
app.use("", registro);
app.use("", login);
app.use("/api/", aseos);
app.use("/api/", clases);
app.use("/api/", maestros);
app.use("/api/", reportes);
app.use("/api/", tesorerias);
app.use("/api/", visitantes);

app.set('views', __dirname + '/views')
app.set('view engine', 'pug')

/*
app.use(passport.initialize());
require("./config/passport")(passport);
*/

exports.app = functions.https.onRequest(app);