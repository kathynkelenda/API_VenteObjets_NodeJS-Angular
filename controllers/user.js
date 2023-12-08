//Import du model
const userSchema = require('../models/User');

//Import dup package bcrypt
const bcrypt = require('bcrypt');

//Import du package de création + vérification des tokens
const jsonWebToken = require('jsonwebtoken');

//Enregistrement d'un nouvel utilisateur
exports.signup =(req, res, next) => {
    //hasher le mdp
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            user = new userSchema({
                email: req.body.email,   
                password: hash      
            })
            user.save()
                .then(() => res.status(201).json({message: 'Utilisateur créé'}))
                .catch(error => res.status(400).json({error})) 
        })
        .catch(error => res.status(500).json({error}));
        
}


/*Pour connecter un user existant. 
    Vérifie si l'user existe ds la bdd et si le mdp transmis par le client correspont à cet user. */
 exports.login = (req, res, next) => {

    userSchema.findOne({email: req.body.email})
           .then(user => { /** On récupère la valeur trouvée par notre requete*/

             if(user === null) { /** Si valeur nulle, user not find ds bdd*/
                 return res.status(401).json({message: 'Vérifier paire identifiant/mdp'}) /** Message pas précis car le client ne doit pas savoir k l'user is enregistrée car c'est une fuite de donnée. Et personne ne doit pouvoir vérifier qu'une autre personne est inscrite sur le site */
             }else { /*Si la valeur existe càd k l'user es enregistré ds la bdd, on va comparer le mdp de la bdd 
                     avec celui qui ns été transmis. Ns allons pr cela utiliser la meth compare() de bcrypt. */
                 bcrypt.compare(req.body.password, user.password) //(mdp transmis par le client, mdp stockée ds la bdd)
                   .then( valid => {
                     if(!valid) { //Erreur d'authentification, mdp transmis par le client est incorrect.
                        return res.status(401).json({message: 'Vérifier paire identifiant/mdp'}) //On retourne exactement le même message que le précédant pr k personne ne sache s'il n'est pas inscris ou si le mdp est incorrecte.*/
                    }else{ //IF MDP CORRECT
                        res.status(200).json({ /*Contient les infos nécessaires à l'authentification qui seront émises par la suite par le client*/
                            userId: user._id,
                            // Au lieu d'envoyer only une string par token: 'TOKEN', on va:
                            token: jsonWebToken.sign(// 
                                {userId:user._id},      //Payload ici is Id de l'utilisateur
                                'RANDOM_TOKEN_SECRET', //Clé sècrete pr l'encodage
                                {expiresIn: '24h'}     //Delais au bout duquel le token expire
                            )
                        })
                    }
                    })
                   .catch(error => res.status(500).json({error})) //500 car is une erreur de traintement. Isn't pr dire k mdp invalide.
             }
          })
           .catch(error => res.status(500).json({error})); 
     }


     

// exports.login = (req,res,next) => {
//     User.findOne({ email: req.body.email})
//      .then(user => {
//         if(user === null){
//             res.status(401).json({message: 'identifiant/mdp non existant ds la bdd'})
//         }else{
//             bcrypt.compare(req.body.password, user.password)
//              .then(valid => {
//                 if(!valid) {
//                     res.status(401).json({message: 'mdp entrée est incorrecte'})
//                 }else {
//                     res.status(200).json({
//                         userId: user._id,
//                         token: 'TOKEN'
//                     })
//                 }
//             })
//              .catch(error => res.status(500).json({error})) //erreur de traitement
//         }
//      })
//      .catch(error => res.status(500).json({error}))
// }