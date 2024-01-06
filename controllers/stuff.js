//Import du model
const thingSchema = require('../models/Thing');

    /*Les fxions portent des noms sémantiques càd expliquant clairement ce que la fxion va faire.*/

//POST
exports.createThing = (req,res,next)=>{
   //On parse l'objet
    const thingObject = JSON.parse(req.body.thing);
    //On y supprimer l'id car sera généré automatiquement par la bdd
    delete thingObject._id;
    //On y supprime l'id du créateur de l'objet. On va used l'userId du token d'auth
    delete thingObject._userId;

    //Création de l'objet
    const thing = new thingSchema({
      ...thingObject,
      //Extraction de l'userId de l'objet requete
      userId: req.auth.userId,
      //Génération de l'url de l'image
      imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }) ;

    //Enregistrement ds la bdd
    thing.save()
     .then(()=>{res.status(201).json({message: 'Objet enregistré'})})
     .catch(error => res.status(400).json({error}))
      
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

