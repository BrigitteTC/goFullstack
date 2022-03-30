/*----------------------------------------
controllers/stuff.js
creation: 26/03/2022
auteur BTC
-------------------------------------------
*/

const Thing = require("../models/thing");

//-----------------------------------------------------------------------------------

// Creation d'un objet = POST

exports.createThing = (req, res, next) => {
  const thingObject = JSON.parse(req.body.thing);
  delete thingObject._id; //on supprime l'ID du thing enregistré
  const thing = new Thing({
    ...thingObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`, // Url de l'image: protocole, nom du host: = server et Url de l'image
  });
  thing
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

//--------------------------------------------------------------

//Récupération 1 objet = GET
exports.getOneThing = (req, res, next) => {
  Thing.findOne({
    _id: req.params.id,
  })
    .then((thing) => {
      res.status(200).json(thing);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

//--------------------------------------------------------------

//Modification d'un objet = PUT
// 2 cas:
//    1: L'utilisateur modifie les infos
//    2: l'utilisateur modifie l'image = nouvelle image à traiter..
exports.modifyThing = (req, res, next) => {
  const thingObject = req.file //Test si nouvelle image ou pas
    ? //1ier cas: nouvelle image on récupère son URL
      {
        ...JSON.parse(req.body.thing),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : //2ieme cas: pas de nouvelle image: copie du body
      { ...req.body };
  Thing.updateOne(
    { _id: req.params.id },
    { ...thingObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

//--------------------------------------------------------------
//Suppression d'un objet = DELETE
// Première version sans vérifier l'ID de l'utilisateur
///*
exports.deleteThing = (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: "Deleted!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
//*/

//Suppression d'un objet
// avec vérification de l'ID de l'utilisateur avant de supprimer l'objet
/*
exports.deleteThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id }).then((thing) => {
    if (!thing) {
      res.status(404).json({
        error: new Error("No such Thing!"),
      });
    }
    if (thing.userId !== req.auth.userId) {
      res.status(400).json({
        error: new Error("Unauthorized request!"),
      });
    }
    Thing.deleteOne({ _id: req.params.id })
      .then(() => {
        res.status(200).json({
          message: "Deleted!",
        });
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  });
};

*/

//--------------------------------------------------------------
//Extraction de tous les objets. GET
exports.getAllStuff = (req, res, next) => {
  Thing.find()
    .then((things) => {
      res.status(200).json(things);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
