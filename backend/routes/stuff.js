/*-------------------------------------------------
stuff.js
Date de création: 26 mars 2022
auteur: BTC

Création d'un routeur
-------------------------------------------------
*/
const express = require("express");
const router = express.Router();

const stuffCtrl = require("../controllers/stuff");
const auth = require("../middleware/auth");

//auth dans chaque route permet de vérifier l'authentificatino et de la protéger

router.get("/", auth, stuffCtrl.getAllStuff);
router.post("/", auth, stuffCtrl.createThing);
router.get("/:id", auth, stuffCtrl.getOneThing);
router.put("/:id", auth, stuffCtrl.modifyThing);
router.delete("/:id", auth, stuffCtrl.deleteThing);

module.exports = router;
