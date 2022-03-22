//----------------------------------------------------------------
//app.js
// date de création: 17/03/3033
// auteur: BTC
//-------------------------------------------

// import de express
const express = require("Express");

// application
const app = express();

/* premiers middleware abandonnés pour la nouvelle version du 22 mars 2022
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

*/

//Nouvelle version du middleware du 22 mars 2022

app.use("/api/stuff", (req, res, next) => {
  const stuff = [
    {
      _id: "oeihfzeoi",
      title: "Mon premier objet",
      description: "Les infos de mon premier objet",
      imageUrl:
        "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
      price: 4900,
      userId: "qsomihvqios",
    },
    {
      _id: "oeihfzeomoihi",
      title: "Mon deuxième objet",
      description: "Les infos de mon deuxième objet",
      imageUrl:
        "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
      price: 2900,
      userId: "qsomihvqios",
    },
  ];
  res.status(200).json(stuff);
});

//export de la fonction pour qu'on puisse y acceder depuis les autres fichiers du projet
// dont le server node.
module.exports = app;
