//Import du package jsonwebtoken 
const jsonWebToken = require('jsonwebtoken');

//Middleware de vérification de validité du token et de sa  transmission aux gestionnairse des routes
module.exports = (req,res,next) => { //Création du middleware et exportation de celui-ci.
    try {
        const token = req.headers.authoriration.split(' ')[1]; //Récupération du token
        const decodedToken = jsonWebToken.verify(token, 'RANDOM_TOKEN_SECRET'); //Décodage du token récuperé
        const userId = decodedToken.userId; ///Récupération de l'userId contenu ds le token décodé
        req.auth = { //Rajout de cet userId à l’objet request qui est transmis aux routes qui seront call par la suite.
            userId: userId
        }
        next(); //Permet de passer à l'exécution
    } catch (error) {
        res.status(401).json({error}) //Erreur 401: Mean ici token non valide
    }
}