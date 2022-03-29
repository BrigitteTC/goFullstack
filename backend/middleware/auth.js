/*----------------------------------------
middleware/auth.js
Date de création: 28/03/2022
auteur: BTC

Gestion authentification des utilisateurs
pour protéger les routes sensibles
------------------------------------------------*/
//jsonwebtoken pour vérifier les token

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    //on récupère le token dans le header = 2ieme elt du header apres le bearer
    const token = req.headers.authorization.split("")[1];

    // on décode le token avec verify et clé secrete
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;

    // verif userId de la requete correspond à celui du token
    if (req.boby.userId && req.body.userId !== userId) {
      //on retourne une erreur car user ID non reconnu
      throw "User ID non valable";
    } else {
      // tout va bien on peut passer la requete on passe à la suite
      next();
    }
  } catch (error) {
    res.status(403).json({ error: error | "requete non authentifiee!" });
  }
};
