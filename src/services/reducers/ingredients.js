import { BASE_URL, createFetchReducer } from "./fetchReducer";

export const {
  fetchReducer: ingredientsReducer,
  getAction: getIngredients }
  = createFetchReducer(`${BASE_URL}ingredients`);