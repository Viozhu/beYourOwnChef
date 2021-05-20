const { Router } = require("express");
const { getRecipe, addRecipe } = require("../Controllers/Recipe");
const router = Router();

router.get("/", getRecipe);
router.post("/", addRecipe);

module.exports = router;
