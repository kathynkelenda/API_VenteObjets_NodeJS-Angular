//impotation d'express (4)
const express = require('express');

//Importation de mongoose
const mongoose = require('mongoose');

//Création de l'application express === Création d'une constante qui contiendra l'application (5) 
const app = express();

//Importation des routeurs
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

//Connexion à la bdd mongoDb
mongoose.connect('mongodb+srv://kathy:kathy1kathy2@donat.ks5vwbi.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  
 // mongodb+srv://<username>:<password>@donat.ks5vwbi.mongodb.net/?retryWrites=true&w=majority
  
//middleware donnant accès au corps de la requête
app.use(express.json()); /* Il intercepte ttes les requêtes ayant un content type json càd qui contiennent du json et
                            met à disposition ce contenu càd ce corps de la requete sur l'objet requete ds req.body.*/

//Ajout du paramètre cors() après installation du module CORS (But = Lever le blocage d'angular par le CORS)                          
var cors = require('cors');
const { signup } = require('./controllers/user');
app.use(cors());

//Ote le CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


//Route principale de l'api = /api/stuff. On enregistre les routes.
app.use('/api/stuff',stuffRoutes) /*Pr cette route, on used le router exposé par stuffRoute qui a été préalablement 
                                   exporté ds le fichier stuff.js */
  //Racine de ttes les routes liées à l'authentification = /api/auth
app.use('/api/auth',userRoutes)


//export de la constante = appli pr pouvoir y acceder depuis les autres fichiers du projet.()
module.exports = app;
