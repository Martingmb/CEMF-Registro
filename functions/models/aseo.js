const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let AseoSchema = new Schema({
    maestro: {type: Schema.Types.ObjectId, required: true, ref: 'Maestro'},
    monto: {type: Schema.Types.Decimal128, required: true},
    fecha: {type: Date, required: true}
});

const Aseo = mongoose.model("Aseo", AseoSchema);

const Aseos = {
    get : function(resolve, reject){
        Aseo.find()
            .then(aseos => {
                resolve(aseos);
            })
            .catch(err => {
                reject(err);
            });
    },

    getOne : function(resolve, reject, AseoId){
        Aseo.findById(AseoId)
            .then(aseo => {
                resolve(aseo);
            })
            .catch(err => {
                reject(err);
            });
    },

    create : function(resolve, reject, newAseo){
        Aseo.create(newAseo)
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(err);
            });
    },

    update : function (resolve, reject, AseoId, updatedAseo){
        Aseo.findByIdAndUpdate(AseoId, {$set : updatedAseo}, {new : true})
        .then(result => {
            resolve(result);
        })
        .catch(err => {
            reject(err);
        })
    },

    delete : function (resolve, reject, AseoId){
        Aseo.findByIdAndRemove(AseoId)
        .then(result => {
            resolve(result);
        })
        .catch(err => {
            reject(err);
        })
    }
}

module.exports = Aseos