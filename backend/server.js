//goFullstack

//-------------------------------------------------------
//server.js
//
// creation: 17/03/2022
// auteur: btc
//
// creation d'un serveur
//------------------------------------------------------

//importe le package http qui permet de créer le serveur
//const http = require("http"); //importe le package http
//const app = require("./app"); //apporte le app.js

//On dit sur quel port on doit tourner
//app.set("port", process.env.PORT || 3000);

//Appelle la methode createServer du package http
// et appelle la ft qui reçoit 2 arguments
// la requete et la réponse qu'on note req et res
//const server = http.createServer(app);

//Attente requetes sur port 3000
// ou sur variable d'env process.env.PORT
//server.listen(process.env.PORT || 3000); //ecoute port 3000 ou env si 3000 pas dispo
//--------------------------------------------------------
//22 mars 2022: modifs suite à l'installation de express:

const http = require("http");
const app = require("./app");

//fonction normalizePort renvoie un port valide, qu'il soit fourni sous
//la forme d'un numéro ou d'une chaîne;
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

//la fonction errorHandler  recherche les différentes erreurs
//et les gère de manière appropriée.Elle est ensuite enregistrée dans le serveur;

const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on("error", errorHandler);

//un écouteur d'évènements est également enregistré,
//consignant le port ou le canal nommé sur lequel le serveur s'exécute dans la console.

server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});

server.listen(port);
