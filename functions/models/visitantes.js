var mongose = require('mongoose');
mongose.Promise = global.Promise;

let visitantesSchema = new mongose.Schema({
    clase: {
        type: mongose.Schema.Types.ObjectId,
        required: true,
        ref: 'Clases'
    },
    nombre: {
        type: String,
        required: true,
        trim: false
    }
});

let Visitantes = mongose.model('Visitantes', visitantesSchema);
const visitantesC = {};

module.exports = { visitantesC, Visitantes };