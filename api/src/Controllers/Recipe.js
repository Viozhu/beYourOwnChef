const { Recipe, Diet } = require("../db");
const axios = require("axios");
const { BASE_URL } = require("../../const");
const { v4: uuidv4 } = require("uuid");

function getRecipe(req, res, next) {
  const recipeApi = axios.get(`${BASE_URL}`);
  const recipeBase = Recipe.findAll({
    include: [Diet],
  });

  Promise.all([recipeApi, recipeBase])
    .then((response) => {
      let [recipeApiResp, recipeBaseResp] = response;
      let fil = recipeBaseResp.map((x) => {
        let orderdiet = x.dataValues.diets.map((e) => {
          return e.dataValues.name;
        });

        return {
          title: x.dataValues.title,
          id: x.dataValues.id,
          summary: x.dataValues.summary,
          spoonacularScore: x.dataValues.spoonacularScore,
          analyzedInstructions: x.dataValues.analyzedInstructions,
          diets: orderdiet,
          image: x.dataValues.image,
        };
      });

      // console.log(
      //   recipeBaseResp[0].dataValues.diets[0].dataValues.name,
      //   "rereer"
      // );
      return res.send(fil.concat(recipeApiResp.data.results));
    })
    .catch((err) => next(err));
}

async function addRecipe(req, res, next) {
  const id = uuidv4();
  const {
    title,
    summary,
    spoonacularScore,
    healthScore,
    analyzedInstructions,
    diets,
    image,
  } = req.body;

  //console.log(diets, "asdasd");
  if (diets.length === 0) return res.send({ error: 500 });
  try {
    const createdRecipe = await Recipe.create({
      id,
      title,
      summary,
      spoonacularScore,
      healthScore,
      analyzedInstructions,
      diets,
      image,
    });
    await createdRecipe.addDiet(diets);
    //console.log(createdRecipe, "crere");
    res.json(createdRecipe);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getRecipe,
  addRecipe,
};
