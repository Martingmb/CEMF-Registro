var mongose = require('mongoose');
mongose.Promise = global.Promise;

var SchemaTypes = mongose.Schema.Types;
let claseSchema = new mongose.Schema({
    alumnos: {
        type: Number,
        required: true
    },
    nombre: {
        type: [{
            type: mongose.Schema.Types.ObjectId,
            ref: 'Maestro'
        }],
        required: true,
    },
    fecha: {
        type: Date,
        unique: true,
        required: true
    },
    biblias: {
        type: Number,
        required: true
    },
    capitulosLeidos: {
        type: Number,
        required: true
    },
    ofrenda = {
        type: SchemaTypes.Decimal128,
        required: true
    },
    visitantes = {
        type: Number,
        required: true
    },
    aseo = [{
        type: SchemaTypes.ObjectId,
        ref: 'Aseo'
    }],
    clase: {
        type: String,
        unique: false,
        required: true,
        trim: false
    }
});

let Clases = mongose.model('Clases', claseSchema);

const claseC = {};

module.exports = { claseC, Clases };