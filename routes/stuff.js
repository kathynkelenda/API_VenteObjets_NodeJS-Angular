//Importation d'express
const express = require('express');

//Création du routeur
const router = express.Router(); /**On créer un routeur avec la meth routeur() d'express */

//Import du contoleur stuff
const stuffContoller = require('../controllers/stuff');

// CREATE  
router.post('/', stuffContoller.createThing); 

// READ ONE 
router.get('/:id', stuffContoller.getOneThing);      

//READ ALL
router.get('/', stuffContoller.getAllThing);

//UPDATE 
router.put('/:id',stuffContoller.modifyThing)

//DELETE
router.delete('/:id',stuffContoller.deleteThing)

//On réexporte le router de ce fichier
module.exports = router