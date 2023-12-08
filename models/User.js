const mongoose = require('mongoose');

//Import du plugin validator
const uniqueValidator= require('mongoose-unique-validator');

const userSchema= new mongoose.Schema({
    email: {type: String, required: true, unique: true}, /**unique pe éviter que ce soit impossible de s'inscrire +ieurs x avec le même email. */
    password: {type: String, required: true}
});

//On applique le validator importé au schéma avant d'en faire un model
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);