const initialState = {
  status: "STALE",
};

export const orderObjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SEND_ORDER_FAILED": {
      return {
        status: "FAILED"
      }
    }
    case "SEND_ORDER_IS_LOADING": {
      return {
        status: "LOADING"
      }
    }
    case "SEND_ORDER_STALE": {
      return {
        status: "STALE"
      }
    }
    case "SEND_ORDER_SUCCESS": {
      return {
        status: "SUCCESS",
        data: action.payload,
      }
    }
    default: {
      return state
    }
  }
}

export const makeOrder = (ingredientsIds) => async (dispatch) => {
  dispatch({
    type: "SEND_ORDER_IS_LOADING",
  });

  const result = await fetch("https://norma.nomoreparties.space/api/orders", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ ingredients: ingredientsIds }),
  })
    .then((res) => res.json())
    .catch(() => null);

  if (!result || !result.success) {
    dispatch({
      type: "SEND_ORDER_FAILED",
    });
    return result;
  }
  dispatch({
    type: "SEND_ORDER_SUCCESS",
    payload: result,
  });
};
