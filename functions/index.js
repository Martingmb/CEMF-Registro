const functions = require('firebase-functions');
const express = require('express');
const consolidate = require('consolidate');
const passport = require('passport');
const router = require('./routes/router')
var passportLocalMongoose = require('passport-local-mongoose');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var users = require('./models/admin');
var flash = require('connect-flash');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const app = express();
mongoose.connect('mongodb+srv://mgmb:nitram17@cemf-vweqn.mongodb.net/cemf-db?retryWrites=true', { useNewUrlParser: true });

app.use(bodyParser.json(), router);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(require("express-session")({
    secret: "Una palabra super secrete que mg genero",
    resave: false,
    saveUninitialized: false
}));

app.set('views', __dirname + '/views')
app.set('view engine', 'pug')

passport.use(new LocalStrategy(users.admin.authenticate()));

passport.serializeUser(users.admin);
passport.deserializeUser(users.admin);

app.post('/m/registro', (request, response) => {
    console.log("Entre al post")
    users.admin.register(new users.admin({
        username: request.body.username,
        password: request.body.password,
        name: request.body.name,
        title: request.body.title
    }), request.body.password, (error, user) => {
        if (error) {
            console.log("Falle por esto >>>>> ", error);
            console.log(request.body)
            return response.render('adminfail');
        }

        passport.authenticate("local")(request, response, () => {
            response.redirect('/login');
        })

    })
})


app.post('/login', (req, res) => passport.authenticate('local', {
    successRedirect: '/adminsuccess',
    failureRedirect: '/test',
    failureFlash: true
})(req, res));


exports.app = functions.https.onRequest(app);