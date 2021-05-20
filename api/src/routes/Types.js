const { Router } = require("express");
const { diet } = require("../Controllers/Typeofdiet");
const router = Router();

router.get("/", diet);

module.exports = router;
