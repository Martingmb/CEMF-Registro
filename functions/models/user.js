const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const options = {
    discriminatorKey: 'usercemf', // our discriminator key, could be anything
};


var UserSchema = new Schema({
    username: { type: String, unique: true, required: true, trim: true },
    password: { type: String, unique: false, required: true, trim: true },
    name: { type: String, unique: false, required: true, trim: false },
    title: { type: String, unique: false, required: false, trim: false },
    type: { type: String, required: false },
    clase: { type: Schema.Types.String, unique: false, required: false, trim: false }
}, options);

UserSchema.plugin(passportLocalMongoose);

module.exports = User = mongoose.model("User", UserSchema);