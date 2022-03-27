/*
------------------------------------------
user.js
Date de création: 27/03/2022
auteur BTC

controleur pour les users
-----------------------------------------
*/

//package de cryptage
const bcrypt = require("bcrypt");
//modele users
const User = require("../models/User");

// ft signup pour enregistrement de nouveaux utilisateurs
exports.signup = (req, res, next) => {
  //hash du mot de passe
  //10 tours pour créer un passwd sécurisé
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créee" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error })); //500 = error serveur
};

// ft login pour connecter les utilisateurs.
exports.login = (req, res, next) => {};
