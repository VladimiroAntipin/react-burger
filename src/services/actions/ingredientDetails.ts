import { Ingredient } from "../../utils/types";

export const INGREDIENT_DETAILS_MODAL_CLOSE = "INGREDIENT_DETAILS_MODAL_CLOSE";
export const INGREDIENT_DETAILS_MODAL_OPEN = "INGREDIENT_DETAILS_MODAL_OPEN";

export type IngredientDetailsAction =
  | {
      type: typeof INGREDIENT_DETAILS_MODAL_CLOSE;
    }
  | {
      type: typeof INGREDIENT_DETAILS_MODAL_OPEN;
      payload: Ingredient;
    };