var mongose = require('mongoose');
var bcrypt = require('bcrypt');
mongose.Promise = global.Promise;
var passportLocalMongoose = require('passport-local-mongoose');

var adminSchema = new mongose.Schema({
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

const adminC = {}

var Admin = mongose.model('Admin', adminSchema);



module.exports = { adminC, Admin };