import { IngredientType } from "../../utils/types";

export const CONSTRUCTOR_ADD_INGREDIENT = "CONSTRUCTOR_ADD_INGREDIENT";
export const CONSTRUCTOR_DELETE_INGREDIENT = "CONSTRUCTOR_DELETE_INGREDIENT";
export const CONSTRUCTOR_MOVE_INGREDIENT = "CONSTRUCTOR_MOVE_INGREDIENT";
export const CONSTRUCTOR_RESET_INGREDIENT = "CONSTRUCTOR_RESET_INGREDIENT";

export type BurgerConstructorAction =
  | {
      type: typeof CONSTRUCTOR_ADD_INGREDIENT;
      payload: { ingredientId: string; type: IngredientType };
    }
  | {
      type: typeof CONSTRUCTOR_DELETE_INGREDIENT;
      payload: { index: number };
    }
  | {
      type: typeof CONSTRUCTOR_MOVE_INGREDIENT;
      payload: [number, number];
    }
  | {
      type: typeof CONSTRUCTOR_RESET_INGREDIENT;
    };