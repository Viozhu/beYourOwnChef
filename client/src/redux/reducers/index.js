import { GET_RECIPE_QUERY, GET_RECIPE_ID } from "../actions/index";

const initialState = {
  recipe: [],
  recipeDetail: {},
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPE_QUERY:
      console.log(action.payload.data, "aaaa");
      return { ...state, recipe: action.payload.data };

    case GET_RECIPE_ID:
      return {
        ...state,
        recipeDetail: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
}
