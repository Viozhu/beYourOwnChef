const { Recipe, Diet } = require("../db");
const axios = require("axios");
const { Op } = require("sequelize");
const { KEY } = require("../../const");

async function getId(req, res, next) {
  const { id } = req.params;
  // console.log(id, " iddddddddddddddddd");

  try {
    if (typeof id === "string") {
      if (id.length < 30) {
        const recipeApi = await axios.get(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${KEY}`
        );
        if (recipeApi.data.id == id) {
          return res.send(recipeApi.data);
        } else {
          return res.send("no se encontró en api");
        }
      } else {
        let recipeBase = await Recipe.findByPk(id, {
          include: [Diet],
        });
        //console.log(recipeBase.dataValues.diets, "recipebase");
        let didi = recipeBase.dataValues.diets;
        let fildidi = didi.map((x) => x.dataValues.name);
        let todo = {
          title: recipeBase.dataValues.title,
          id: recipeBase.dataValues.id,
          summary: recipeBase.dataValues.summary,
          spoonacularScore: recipeBase.dataValues.spoonacularScore,
          healthScore: recipeBase.dataValues.healthScore,
          image: recipeBase.dataValues.image,
          analyzedInstructions: recipeBase.dataValues.analyzedInstructions,
          diets: fildidi,
        };

        if (todo !== null) {
          return res.send(todo);
        } else {
          return res.sendStatus(404);
        }
      }
    } else {
      next();
    }
  } catch (err) {
    res.send(`A recipe with the id ${id} does not exist`);
  }
}

async function searchfood(req, res, next) {
  const { name } = req.query;
  // console.log(name.toLowercase());
  try {
    if (name) {
      const nameMayus = name.charAt(0).toUpperCase() + name.slice(1);

      const nmeapi = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${KEY}&addRecipeInformation=true`
      );
      //console.log(nmeapi.data.results, "gol");
      let todo = [];
      let filapi = await nmeapi.data.results.filter((x) => {
        var aa = x.title.split(" ");

        aa.map((e) => {
          if (e.includes(nameMayus)) {
            todo.push(x);
          }
        });
        //console.log(todo, "todo");
        return todo;
      });
      //console.log(filapi, "miauq");

      const nme = await Recipe.findAll({
        include: [Diet],
        where: {
          title: {
            [Op.like]: `%${name}%`,
          },
        },
      });

      Promise.all([nme, todo])
        .then((response) => {
          let [nmeResp, filapiResp] = response;
          //  console.log(nmeapiResp.data, "ggg");
          let fil = nmeResp.map((x) => {
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
          //console.log(nmeapiResp.data.results, "miau");
          return res.send(fil.concat(filapiResp));
        })
        .catch((err) => console.log(err));
    }
  } catch (err) {
    res.send(`A recipe with the name ${name} does not exist`);
  }
}

module.exports = {
  getId,
  searchfood,
};
