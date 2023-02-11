const initialState = {
  status: "CLOSED",
};

export const ingredientDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INGREDIENT_DETAILS_MODAL_CLOSE": {
      return {
        status: "CLOSED"
      }
    }

    case "INGREDIENT_DETAILS_MODAL_OPEN": {
      return {
        status: "OPENED",
        data: action.payload
      }
    }
    default: {
      return state
    }
  }
}