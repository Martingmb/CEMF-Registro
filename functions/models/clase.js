const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ClaseSchema = new Schema({
    alumnos: {type: Number, required: true},
    nombre: {type: [{type: Schema.Types.ObjectId, ref: 'Maestro'}], required: true},
    fecha: {type: Date, unique: true, required: true},
    biblias: {type: Number,required: true},
    capitulosLeidos: { type: Number, required: true},
    ofrenda: {type: Schema.Types.Decimal128, required: true},
    visitantes: {type: Number, required: true},
    aseo: [{type: Schema.Types.ObjectId, ref: 'Aseo'}],
    clase: {type: String, unique: false, required: true, trim: false}
});

const Clase = mongoose.model("Clase", ClaseSchema);

const Clases = {
    get : function(resolve, reject){
        Clase.find()
            .then(clases => {
                resolve(clases);
            })
            .catch(err => {
                reject(err);
            });
    },

    getOne : function(resolve, reject, ClaseId){
        Clase.findById(ClaseId)
            .then(clase => {
                resolve(clase);
            })
            .catch(err => {
                reject(err);
            });
    },

    create : function(resolve, reject, newClase){
        Clase.create(newClase)
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(err);
            });
    },

    update : function (resolve, reject, ClaseId, updatedClase){
        Clase.findByIdAndUpdate(ClaseId, {$set : updatedClase}, {new : true})
        .then(result => {
            resolve(result);
        })
        .catch(err => {
            reject(err);
        })
    },

    delete : function (resolve, reject, ClaseId){
        Clase.findByIdAndRemove(ClaseId)
        .then(result => {
            resolve(result);
        })
        .catch(err => {
            reject(err);
        })
    }
}

module.exports = Clases