var mongose = require('mongoose');
mongose.Promise = global.Promise;

let reporteMaestroSchema = new mongose.Schema({
    clase: {
        type: mongose.Schema.Types.ObjectId,
        required: true,
        ref: 'Clases'
    },
    capitulosLeidos: {
        type: Number,
        required: true
    },
    visita: {
        type: Boolean,
        required: false
    },
    asistenciaAServicio: {
        type: Boolean,
        required: true,
        trim: false
    },
    maestro: {
        type: mongose.Schema.Types.ObjectId,
        ref: 'Maestro'
    },
    fecha: {
        type: Date,
        unique: true,
        required: true
    },
    biblias: {
        type: Number,
        required: true
    }
});

const reporteMaestroC = {};

let reporteMaestro = mongose.model('Reporte Maestro', reporteMaestroSchema);

module.exports = { reporteMaestroC, reporteMaestroSchema };