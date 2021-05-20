import axios from "axios";

// export const GET_ALL_RECIPE = "GET_ALL_RECIPE";
// export const ADD_RECIPE = "ADD_RECIPE";
export const GET_RECIPE_QUERY = "GET_RECIPE_QUERY";
export const GET_RECIPE_ID = "GET_RECIPE_ID";
// export const GET_DETAIL = "GET_DETAIL";

export function getRecipeQuery(name) {
  return function (dispatch) {
    return axios
      .get(`http://localhost:3001/recipes?name=${name}`)
      .then((json) =>
        dispatch({
          type: GET_RECIPE_QUERY,
          payload: json,
        })
      );
  };
}

export function getRecipeID(id) {
  return function (dispatch) {
    return axios.get(`http://localhost:3001/recipes/${id}`).then((json) =>
      dispatch({
        type: GET_RECIPE_ID,
        payload: json,
      })
    );
  };
}

// export function addRecipe(payload) {
//   return {
//     type: ADD_RECIPE,
//     payload: {
//       name: payload.title,
//       summary: payload.summary,
//       spoonacularScore: payload.spoonacularScore,
//       healthScore: payload.healthScore,
//       analyzedInstructions: payload.analyzedInstructions,
//     },
//   };
// }
