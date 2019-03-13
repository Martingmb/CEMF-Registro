var moongose = require('mongoose')
var bcrypt = require('bcrypt')
var passportLocalMongoose = require('passport-local-mongoose')

var adminSchema = new moongose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    name: {
        type: String,
        unique: false,
        required: true,
        trim: false
    },
    title: {
        type: String,
        unique: false,
        required: false,
        trim: false
    }
})

adminSchema.plugin(passportLocalMongoose);

var admin = moongose.model('admin', adminSchema);
module.exports.admin = admin;