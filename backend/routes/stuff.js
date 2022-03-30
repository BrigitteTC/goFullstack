//gofullstack

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
const multer = require("../middleware/multer-config");

//auth dans chaque route permet de vérifier l'authentification et de la protéger

router.post("/", auth, multer, stuffCtrl.createThing);
router.put("/:id", auth, multer, stuffCtrl.modifyThing);

router.get("/", auth, stuffCtrl.getAllStuff);
router.get("/:id", auth, stuffCtrl.getOneThing);

router.delete("/:id", auth, stuffCtrl.deleteThing);

/*
//Routes sans sécurité
router.get("/", stuffCtrl.getAllStuff);
router.post("/", stuffCtrl.createThing);
router.get("/:id", stuffCtrl.getOneThing);
router.put("/:id", stuffCtrl.modifyThing);
router.delete("/:id", stuffCtrl.deleteThing);
*/

module.exports = router;
