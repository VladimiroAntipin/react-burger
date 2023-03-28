import { Ingredient } from "../../utils/types";
import { IngredientDetailsAction, INGREDIENT_DETAILS_MODAL_CLOSE, INGREDIENT_DETAILS_MODAL_OPEN } from "../actions/ingredientDetails";

type State = {
  data: null | Ingredient;
};

export const initialState = {
  data: null,
};

export const ingredientDetailsReducer = (
  state: State = initialState,
  action: IngredientDetailsAction
): State => {
  switch (action.type) {
    case INGREDIENT_DETAILS_MODAL_CLOSE: {
      return {
        data: null,
      };
    }

    case INGREDIENT_DETAILS_MODAL_OPEN: {
      return {
        data: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};