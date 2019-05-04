const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
    username: { type: String, unique: true, required: true, trim: true },
    password: { type: String, unique: true, required: true, trim: true },
    name: { type: String, unique: false, required: true, trim: false },
    title: { type: String, unique: false, required: false, trim: false },
    type: { type: String, required: false }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = User = mongoose.model("User", UserSchema);