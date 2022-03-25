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
app.post("/api/stuff", (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: "Objet créé !",
  });
});

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
