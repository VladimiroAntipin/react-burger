import { createFetchReducer } from "./fetchReducer";

const ingredientsUrl = "https://norma.nomoreparties.space/api/ingredients";

export const {
  fetchReducer: ingredientsReducer,
  getAction: getIngredients }
  = createFetchReducer(ingredientsUrl);