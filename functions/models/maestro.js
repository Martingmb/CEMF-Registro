const mongoose = require('mongoose');
const User = require('./user');
const Schema = mongoose.Schema;
const options = {
    discriminatorKey: 'usercemf', // our discriminator key, could be anything
};

let Maestro = User.discriminator('Maestro', new mongoose.Schema({
    clase: { type: Schema.Types.String, required: true, ref: 'Clase' }
}, options))

const Maestros = {
    get: function(resolve, reject) {
        Maestro.find()
            .then(maestros => {
                resolve(maestros);
            })
            .catch(err => {
                reject(err);
            });
    },

    getOne: function(resolve, reject, MaestroId) {
        Maestro.findById(MaestroId)
            .then(maestro => {
                resolve(maestro);
            })
            .catch(err => {
                reject(err);
            });
    },

    create: function(resolve, reject, newMaestro) {
        Maestro.create(newMaestro)
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(err);
            });
    },

    update: function(resolve, reject, MaestroId, updatedMaestro) {
        Maestro.findByIdAndUpdate(MaestroId, { $set: updatedMaestro }, { new: true })
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(err);
            })
    },

    delete: function(resolve, reject, MaestroId) {
        Maestro.findByIdAndRemove(MaestroId)
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(err);
            })
    }
}

module.exports = Maestros