var mongose = require('mongoose');
mongose.Promise = global.Promise;

var SchemaTypes = mongose.Schema.Types;

let aseoSchema = new mongose.Schema({
    maestro: {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: 'Maestro'
    },
    monto: {
        type: SchemaTypes.Decimal128,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    }
});

let Aseo = mongose.model('Aseo', aseoSchema);
const aseoC = {};

module.exports = { aseoC, Aseo };