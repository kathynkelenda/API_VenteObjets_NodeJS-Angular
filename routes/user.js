//Import d'espress, création de la route et import de son contrôleur
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user')


//Ce sont des routes post car le frontend va envoyer l'email et le mot de passe.
router.post('/signup', userController.signup);
router.post('/login', userController.login);

module.exports = router;