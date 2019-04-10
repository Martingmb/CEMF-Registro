const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MaestroSchema = new Schema({
    usuario: {type: String, unique: true, required: true, trim: true},
    contrasena: {type: String, unique: true, required: true, trim: true},
    nombre: {type: String, unique: false, required: true, trim: false},
    clase: {type: Schema.Types.ObjectId, required: true, ref: 'Clase'}
});

const Maestro = mongoose.model("Maestro", MaestroSchema);

const Maestros = {
    get : function(resolve, reject){
        Maestro.find()
            .then(maestros => {
                resolve(maestros);
            })
            .catch(err => {
                reject(err);
            });
    },

    getOne : function(resolve, reject, MaestroId){
        Maestro.findById(MaestroId)
            .then(maestro => {
                resolve(maestro);
            })
            .catch(err => {
                reject(err);
            });
    },

    create : function(resolve, reject, newMaestro){
        Maestro.create(newMaestro)
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(err);
            });
    },

    update : function (resolve, reject, MaestroId, updatedMaestro){
        Maestro.findByIdAndUpdate(MaestroId, {$set : updatedMaestro}, {new : true})
        .then(result => {
            resolve(result);
        })
        .catch(err => {
            reject(err);
        })
    },

    delete : function (resolve, reject, MaestroId){
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