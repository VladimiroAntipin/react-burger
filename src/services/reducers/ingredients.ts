import { Ingredient } from "../../utils/types";
import { createFetchReducer } from "./fetchReducer";

export const { fetchReducer: ingredientsReducer, getAction: getIngredients } =
  createFetchReducer<"ingredients", { data: readonly Ingredient[] }>(
    `ingredients`
  );