/*-----------------------------------------------------------------------------
multer-config.js
Date de création: 30/03/2022
Auteur: BTC

Gère les fichiers et permet leur téléchargement
--------------------------------------------------------------------------------
*/

const multer = require("multer");

/*
 constante dictionnaire de type MIME 
pour résoudre l'extension de fichier
en ft du dossier de stockage.
*/

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

/*----------------------------------------------------------------
//Fonction permet le stockage sur le disque
Nous créons une constante storage , 
à passer à multer comme configuration, 
qui contient la logique nécessaire pour indiquer à multer où enregistrer les fichiers entrants :

la fonction destination indique à multer d'enregistrer les fichiers dans le dossier images ;

la fonction filename indique à multer d'utiliser le nom d'origine, 
de remplacer les espaces par des underscores 
et d'ajouter un timestamp Date.now() comme nom de fichier. 
---------------------------------------------------------------------*/
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    //1ier argument = la callback
    callback(null, "images"); // null: pas d'erreur  images= nom du dossier de stockage
  },

  //2ieme argument  : nom de fichier à utiliser
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_"); //nom d'origine avec blancs remplacé par "_"
    const extension = MIME_TYPES[file.mimetype]; //ajout de l'extension en ft du dossier
    callback(null, name + Date.now() + "." + extension); // appel callback : null : pas d'erreur,
    //nom + date+ extension
  },
});

//export du multer  avec methode .single = fichier unique
module.exports = multer({ storage: storage }).single("image");
