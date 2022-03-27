//----------------------------------------------------------------
//app.js
// date de création: 17/03/3033
// auteur: BTC
//-------------------------------------------

// import de express
const express = require("Express");
const bodyParser = require("body-parser");

//mongoose
const mongoose = require("mongoose");

//routes
const stuffRoutes = require("./routes/stuff");
const userRoutes = require("./routes/user");

// application
const app = express();

//connexion a mongoDB

const uri =
  "mongodb+srv://BTCUser1:BTCUser1Passwd@cluster0.wupp6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connexion à MongoDB réussie !"))

  .catch((error) => {
    console.error("error= " + error + "  Connexion à MongoDB échouée !");
  });

//Nouvelle version du middleware du 22 mars 2022

// ajout du middleware général
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());

//Utilisation de EXPRESS:
//Ajout use express.json pour capturer les objets json

//Express prend toutes les requêtes qui ont comme Content -
//Type  application / json  et met à disposition leur  body  directement
//sur l'objet req, ce qui nous permet d'écrire le middleware POST suivant:
app.use(express.json());

app.use("/api/stuff", stuffRoutes);

//app.use pour enregistrer les routes
///api/auth = route attendue par le front end pour authentification
app.use("/api/auth", userRoutes);

//export de la fonction pour qu'on puisse y acceder depuis les autres fichiers du projet
// dont le server node.
module.exports = app;
