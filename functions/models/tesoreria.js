var mongose = require('mongoose');
mongose.Promise = global.Promise;

var SchemaTypes = mongose.Schema.Types;
let tesoreriaSchema = new mongose.Schema({
    monto: {
        type: SchemaTypes.Decimal128,
        required: true
    },
    razon: {
        type: String,
        required: true
    },
    tipoDeGasto: {
        type: Number,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    }
});

let Tesoreria = mongose.model('Tesoreria', tesoreriaSchema);

const tesoreriaC = {};

module.exports = { Tesoreria, tesoreriaC };