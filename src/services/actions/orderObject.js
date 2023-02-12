import { BASE_URL } from "../reducers/fetchReducer";
import { checkResponse } from "../../utils/checkResponse";

export const SEND_ORDER_FAILED = "SEND_ORDER_FAILED";
export const SEND_ORDER_IS_LOADING = "SEND_ORDER_IS_LOADING";
export const SEND_ORDER_STALE = "SEND_ORDER_STALE";
export const SEND_ORDER_SUCCESS = "SEND_ORDER_SUCCESS";

export const makeOrder = (ingredientsIds) => async (dispatch) => {
    dispatch({
      type: SEND_ORDER_IS_LOADING,
    });
  
    const result = await fetch(`${BASE_URL}orders`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ ingredients: ingredientsIds }),
    })
      .then(checkResponse);
  
    if (!result || !result.success) {
      dispatch({
        type: SEND_ORDER_FAILED,
      });
      return result;
    }
    dispatch({
      type: SEND_ORDER_SUCCESS,
      payload: result,
    });
  };
  