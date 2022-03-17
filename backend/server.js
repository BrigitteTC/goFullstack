//-------------------------------------------------------
//server.js
//
// creation: 17/03/2022
// auteur: btc
//
// creation d'un serveur
//------------------------------------------------------

//importe le package http qui permet de créer le serveur
const http = require("http"); //importe le package http

//Appelle la methode createServer du package http
// et appelle la ft qui reçoit 2 arguments
// la requete et la réponse qu'on note req et res
const server = http.createServer((req, res) => {
  res.end("Voici la réponse du server");
});

//Attente requetes sur port 3000
// ou sur variable d'env process.env.PORT
server.listen(process.env.PORT || 3000); //ecoute port 3000 ou env si 3000 pas dispo
