//Import du model
const thingSchema = require('../models/Thing');

    /*Les fxions portent des noms sémantiques càd expliquant clairement ce que la fxion va faire.*/

//POST
exports.createThing = (req,res,next)=>{

    delete req.body._id; //On supprime d'abord l'id car le frontend actuel contient un id, alors que ce dernier sera généré automatiquement par mongo.
    
    //Les requetes arrivant à cette route ont ds leur corps ttes les infos du nouvel élément qui sera ajouté à la bdd
    const thing = new thingSchema({
        // title: req.body.title,
        // descrption: req.body.description,
        // imageUrl: req.body.imageUrl,
        // price: req.body.price,
        // userId: req.body.userId,
         ...req.body //Raccourci qui copie ts les éléments contenus ds le corps de la requête.     
    });

    //Enregistrement ds la bdd
    thing.save()
        .then( () => { res.status(201).json({message: 'Objet enregistré'}) })
        .catch( (error) => {
          /*console.log(error);*/
          res.status(400).json({error: error}) 
        })
}

//GET ONE
exports.getOneThing = (req,res,next) =>{
    thingSchema.findOne({_id: req.params.id})
      .then(thing => res.status(200).json(thing))
      .catch(error => res.status(404).json({erreur}));
    //req.params.id
  }

  //GET ALL
  exports.getAllThing = (req, res, next) => {
    thingSchema.find()   //La meth find( ) permet de récuperer tous les éléments
        .then( things => res.status(200).json(things) )   //Récupère le tableau de tous les éléments retourné par la bdd
        .catch( error => res.status(400).json({error}))  //Affiche l'erreur si existe
  }


  //DELETE
  exports.deleteThing = (req,res,next) => {
    thingSchema.deleteOne({_id: req.params.id})
      .then(()=> res.status(200).json({message:'Objet supprimé'}))
      .catch(error => res.status(400).json({error}))
  }

  //UPDATE
  exports.modifyThing = (req,res,next) => {
    thingSchema.updateOne({ _id: req.params.id},{...req.body,_id: req.params.id})
      .then( () => res.status(200).json({message: 'Objet modifié'}))
      .catch(error => res.status(400).json({error}))
  }

