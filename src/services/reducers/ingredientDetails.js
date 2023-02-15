import {
  INGREDIENT_DETAILS_MODAL_OPEN,
  INGREDIENT_DETAILS_MODAL_CLOSE
} from "../actions/ingredientDetails";

const initialState = {
  data: null,
};

export const ingredientDetailsReducer = (state = initialState, action) => {
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
