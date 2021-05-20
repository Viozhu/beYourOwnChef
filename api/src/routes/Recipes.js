const { Router } = require("express");
const router = Router();
const { getId, searchfood } = require("../Controllers/Recipes");

router.get("/:id?", getId);

router.get("/", searchfood);

module.exports = router;
