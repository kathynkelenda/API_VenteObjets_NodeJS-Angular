//Import de multer
const multer = require('multer');

//Préparation d'un dictionnaire pr les mime type
const MIME_TYPES = {
    "image/jpg": 'jpg',
    "image/jpeg": 'jpg',
    "image/png": 'png'
}

//Création d'un objet de configuration pr multer 
const storage = multer.diskStorage({
    destination: (req, file, callback) => {      //Explik à multer ds quel dossier enregistrer les fichiers
        callback(null, 'images') //null pr dire k'il n'ya pas eu d'erreur à ce niveau, images = nom du dossier contenant les fichiers 
    },
    filename: (req, file,callback) => { // Dit à multer quel nom de fichier utiliser(car on ne peut used celui d'origine car 2 fichiers could have the same name par ex)
        const name = file.originalname.split(' ').join('_');
        //Génération du nom de fichier
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
})

module.exports = multer({storage}).single('image');