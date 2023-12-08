//Importation d'express
const express = require('express');

//Import middleware d'authentification
const auth = require('../middleware/auth')

//Création du routeur
const router = express.Router(); /**On créer un routeur avec la meth routeur() d'express */

//Import du contoleur stuff
const stuffContoller = require('../controllers/stuff');

/*auth : Le situer impérativement avant le gestionnaire de route sinon ce dernier sera call en 1er et ne pourra pas 
used le travail do par auth. On rajoute auth sur ttes les routes car ttes ont besoin d'être authentifiées. Le middleware 
auth est importé ds le routeur pr etre exécuté avant les gestionnaires de nos routes.*/
  // CREATE  
router.post('/', auth, stuffContoller.createThing); 

  // READ ONE 
router.get('/:id', auth,  stuffContoller.getOneThing);      

  //READ ALL
router.get('/', auth, stuffContoller.getAllThing);

  //UPDATE 
router.put('/:id', auth, stuffContoller.modifyThing)

  //DELETE
router.delete('/:id', auth, stuffContoller.deleteThing)

//On réexporte le router de ce fichier
module.exports = router