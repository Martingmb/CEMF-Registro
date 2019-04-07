var mongose = require('mongoose');
mongose.Promise = global.Promise;

let maestroSchema = new mongose.Schema({
    usuario: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    contrasena: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    nombre: {
        type: String,
        unique: false,
        required: true,
        trim: false
    },
    clase: {
        type: mongose.Schema.Types.ObjectId,
        required: true,
        ref: 'Clases'
    }
});

let Maestro = mongose.model('Maestro', maestroSchema);

const maestroDB = {};

module.exports = { maestroDB, Maestro };