//Import du package mongoose
const mongoose = require('mongoose');

//Création du schéma de données
const thingSchema = new mongoose.Schema({
    title: {type:String, required:true},
    description: {type:String, required:true},
    imageUrl: {type:String, required:true},
    price: {type:Number, required:true},
    userId: {type:String, required:true}  
})

//Exportons ce model
module.exports = mongoose.model('Thing', thingSchema)