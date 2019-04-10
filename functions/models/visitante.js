const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let VisitanteSchema = new Schema({
    clase: {type: Schema.Types.ObjectId,required: true, ref: 'Clase'},
    nombre: {type: String, required: true, trim: false}
});

const Visitante = mongoose.model("Visitante", VisitanteSchema);

const Visitantes = {
    get : function(resolve, reject){
        Visitante.find()
            .then(visitante => {
                resolve(visitante);
            })
            .catch(err => {
                reject(err);
            });
    },

    getOne : function(resolve, reject, visitanteId){
        Visitante.findById(visitanteId)
            .then(visitante => {
                resolve(visitante);
            })
            .catch(err => {
                reject(err);
            });
    },

    create : function(resolve, reject, newVisitante){
        Visitante.create(newVisitante)
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(err);
            });
    },

    update : function (resolve, reject, visitanteId, updatedVisitante){
        Visitante.findByIdAndUpdate(visitanteId, {$set : updatedVisitante}, {new : true})
        .then(result => {
            resolve(result);
        })
        .catch(err => {
            reject(err);
        })
    },

    delete : function (resolve, reject, visitanteId){
        Visitante.findByIdAndRemove(visitanteId)
        .then(result => {
            resolve(result);
        })
        .catch(err => {
            reject(err);
        })
    }
}

module.exports = Visitantes