/*-------------------------------------------------
stuff.js
Date de création: 26 mars 2022
auteur: BTC

Création d'un routeur
-------------------------------------------------
*/
const express = require("express");

///creation d'un router avec la methode router d'express
const router = express.Router();

//Ajout liens à things
const Thing = require("../models/thing");

//POST
// Middleware POST:
//delete de l'id
// on récupère le body
/*
Ici, vous créez une instance de votre modèle Thing en lui passant un objet JavaScript 
contenant toutes les informations 
requises du corps de requête analysé 
(en ayant supprimé en amont le faux_id envoyé par le front-end).

L'opérateur spread ... est utilisé pour faire une copie de tous les éléments de req.body . 
Pour plus d'informations sur l'opérateur spread, rendez-vous sur la documentation de MDN.

Ce modèle comporte une méthode save() qui enregistre simplement votre Thing dans la base de données.

La méthode save() renvoie une Promise. Ainsi, dans notre bloc then() , 
nous renverrons une réponse de réussite avec un code 201 de réussite. Dans notre bloc catch() , nous renverrons une réponse avec l'erreur générée par Mongoose ainsi qu'un code d'erreur 400.

*/
router.post("/", (req, res, next) => {
  delete req.body._id;
  const thing = new Thing({
    ...req.body,
  });
  thing
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
});

//modification d'un objet
//PUT
router.put("//:id", (req, res, next) => {
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) => res.status(400).json({ error }));
});

//GET pour un seul objet
//findOne récupère un seul objet dont l'id est passé en paramètre
router.get("//:id", (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then((thing) => res.status(200).json(thing))
    .catch((error) => res.status(404).json({ error }));
});

//GET
/*
Désormais, nous pouvons implémenter notre route GET afin qu'elle renvoie tous les Things dans la base de données :
*/
router.get("/", (req, res, next) => {
  Thing.find()
    .then((things) => res.status(200).json(things))
    .catch((error) => res.status(400).json({ error }));
});

//DELETE
router.delete("/:id", (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
});

//o export le router de ce fichier
module.exports = router;
