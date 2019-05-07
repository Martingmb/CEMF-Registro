const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TesoreriaSchema = new Schema({
    directivo: { type: Schema.Types.ObjectId, required: true },
    monto: { type: Schema.Types.Decimal128, required: true },
    razon: { type: String, required: true },
    tipoDeGasto: { type: String, required: true },
    fecha: { type: Date, required: true }
});

const Tesoreria = mongoose.model("Tesoreria", TesoreriaSchema);

const Tesorerias = {
    get: function(resolve, reject) {
        Tesoreria.find()
            .then(tesoreria => {
                resolve(tesoreria);
            })
            .catch(err => {
                reject(err);
            });
    },

    getOne: function(resolve, reject, tesoreriaId) {
        Tesoreria.findById(tesoreriaId)
            .then(tesoreria => {
                resolve(tesoreria);
            })
            .catch(err => {
                reject(err);
            });
    },

    create: function(resolve, reject, newTesoreria) {
        Tesoreria.create(newTesoreria)
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(err);
            });
    },

    update: function(resolve, reject, tesoreriaId, updatedTesoreria) {
        Tesoreria.findByIdAndUpdate(tesoreriaId, { $set: updatedTesoreria }, { new: true })
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(err);
            })
    },

    delete: function(resolve, reject, tesoreriaId) {
        Tesoreria.findByIdAndRemove(tesoreriaId)
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(err);
            })
    }
}

module.exports = Tesorerias