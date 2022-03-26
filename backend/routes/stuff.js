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

router.get("/", stuffCtrl.getAllStuff);
router.post("/", stuffCtrl.createThing);
router.get("/:id", stuffCtrl.getOneThing);
router.put("/:id", stuffCtrl.modifyThing);
router.delete("/:id", stuffCtrl.deleteThing);

module.exports = router;
