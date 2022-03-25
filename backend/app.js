//----------------------------------------------------------------
//app.js
// date de création: 17/03/3033
// auteur: BTC
//-------------------------------------------

// import de express
const express = require("Express");

//mongoose
const mongoose = require("mongoose");

// application
const app = express();

//Ajout liens à things
const Thing = require("./models/thing");

//connexion a mongoDB
//https://cloud.mongodb.com/v2/623a3baa7599ae724eb3224b#clusters
//mongodb+srv://NOMDUTILISATEUR:MOTDEPASSE@cluster0-pme76.mongodb.net/test?retryWrites=true&w=majority
//"mongodb+srv://BTCUser1:BTCUser1Passwd@cluster0-pme76.mongodb.net/test?retryWrites=true&w=majority";
//------------------------------------------------------------------

/*full driver code exemple
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://BTCUser1:<password>@cluster0.wupp6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

"mongodb+srv://BTCUser1:BTCUser1Passwd@cluster0-wupp6.mongodb.net/test?retryWrites=true&w=majority",
remplacé par
 cluster0-shard-00-01.wupp6.mongodb.net:27017 
 "mongodb+srv://BTCUser1:BTCUser1Passwd@cluster0-shard-00-01.wupp6.mongodb.net:27017/test?retryWrites=true&w=majority",
--------------------------------------------------------------------
*/

const uri =
  "mongodb+srv://BTCUser1:BTCUser1Passwd@cluster0.wupp6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

/*const uri =
  "mongodb+srv://BTCUser1:BTCUser1Passwd@cluster0.wupp6.mongodb.net/test?retryWrites=true&w=majority";
  */
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connexion à MongoDB réussie !"))

  .catch((error) => {
    console.error("error= " + error + "  Connexion à MongoDB échouée !");
  });

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

//Utilisation de EXPRESS:
//Ajout use express.json pour capturer les objets json

//Express prend toutes les requêtes qui ont comme Content -
//Type  application / json  et met à disposition leur  body  directement
//sur l'objet req, ce qui nous permet d'écrire le middleware POST suivant:
app.use(express.json());

// Middleware POST:
//delete de l'id
// on récupère le body
/*
Ici, vous créez une instance de votre modèle Thing en lui passant un objet JavaScript 
contenant toutes les informations 
requises du corps de requête analysé 
(en ayant supprimé en amont le faux_id envoyé par le front-end).

L'opérateur spread ... est utilisé pour faire une copie de tous les éléments de req.body . Pour plus d'informations sur l'opérateur spread, rendez-vous sur la documentation de MDN.

Ce modèle comporte une méthode save() qui enregistre simplement votre Thing dans la base de données.

La méthode save() renvoie une Promise. Ainsi, dans notre bloc then() , nous renverrons une réponse de réussite avec un code 201 de réussite. Dans notre bloc catch() , nous renverrons une réponse avec l'erreur générée par Mongoose ainsi qu'un code d'erreur 400.


*/
app.post("/api/stuff", (req, res, next) => {
  delete req.body._id;
  const thing = new Thing({
    ...req.body,
  });
  thing
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
});

//GET pour un seul objet
//findOne récupère un seul objet dont l'id est passé en paramètre
app.get("/api/stuff/:id", (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then((thing) => res.status(200).json(thing))
    .catch((error) => res.status(404).json({ error }));
});

//GET
/*
Désormais, nous pouvons implémenter notre route GET afin qu'elle renvoie tous les Things dans la base de données :
*/
app.get("/api/stuff", (req, res, next) => {
  Thing.find()
    .then((things) => res.status(200).json(things))
    .catch((error) => res.status(400).json({ error }));
});

//export de la fonction pour qu'on puisse y acceder depuis les autres fichiers du projet
// dont le server node.
module.exports = app;
