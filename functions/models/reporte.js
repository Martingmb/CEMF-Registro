const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

let ReporteSchema = new Schema({
    clase: { type: Schema.Types.ObjectId, required: true, ref: 'Clase' },
    capitulosLeidos: { type: Number, required: true },
    visita: { type: Boolean, required: false },
    asistenciaAServicio: { type: Boolean, required: true, trim: false },
    maestro: { type: Schema.Types.ObjectId, ref: 'Maestro' },
    fecha: { type: Date, unique: true, required: true }
});

const Reporte = mongoose.model("Reporte", ReporteSchema, "Reporte del Maestro");

const Reportes = {
    get: function(resolve, reject) {
        Reporte.find()
            .then(reportes => {
                resolve(reportes);
            })
            .catch(err => {
                reject(err);
            });
    },

    getOne: function(resolve, reject, ReporteId) {
        Reporte.findById(ReporteId)
            .then(reporte => {
                resolve(reporte);
            })
            .catch(err => {
                reject(err);
            });
    },

    create: function(resolve, reject, newReporte) {
        Reporte.create(newReporte)
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(err);
            });
    },

    update: function(resolve, reject, ReporteId, updatedReporte) {
        Reporte.findByIdAndUpdate(ReporteId, { $set: updatedReporte }, { new: true })
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(err);
            })
    },

    delete: function(resolve, reject, ReporteId) {
        Reporte.findByIdAndRemove(ReporteId)
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(err);
            })
    }
}

module.exports = Reportes;