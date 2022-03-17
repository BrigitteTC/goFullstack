//----------------------------------------------------------------
//app.js
// date de création: 17/03/3033
// auteur: BTC
//-------------------------------------------

// import de express
const express = require("Express");

// application
const app = express();

// Premier middleware
//next permet d'envoyer la réponse et de terminer la requete
app.use((req, res, next) => {
  console.log("requete reçue");
  next();
});

//middleware suivant
app.use((req, res, next) => {
  res.status(201);
  next();
});

//Traitement de la requete
app.use((req, res, next) => {
  res.json({ message: "requete bien reçue" });
  next();
});

//middleware suivant: pas de next car c'est le dernier
app.use((req, res) => {
  console.log("réponse envoyée avec succes");
});

//export de la fonction pour qu'on puisse y acceder depuis les autres fichiers du projet
// dont le server node.
module.exports = app;
