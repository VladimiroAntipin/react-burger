import { ThunkAction } from "redux-thunk";
import { fetchEnchanced } from "../../utils/fetchWithRefreshToken";
import { OrderResponse } from "../../utils/types";
import { BASE_URL } from "../reducers/fetchReducer";

export const SEND_ORDER_FAILED = "SEND_ORDER_FAILED";
export const SEND_ORDER_IS_LOADING = "SEND_ORDER_IS_LOADING";
export const CLEAR_ORDER = "CLEAR_ORDER";
export const SEND_ORDER_SUCCESS = "SEND_ORDER_SUCCESS";

export type OrderAction =
  | {
    type: typeof SEND_ORDER_IS_LOADING;
  }
  | {
    type: typeof SEND_ORDER_FAILED;
    payload: unknown;
  }
  | {
    type: typeof SEND_ORDER_SUCCESS;
    payload: OrderResponse;
  }
  | {
    type: typeof CLEAR_ORDER;
  };

export const makeOrder =
  (
    ingredientsIds: string[]
  ): ThunkAction<unknown, unknown, unknown, OrderAction> =>
    async (dispatch) => {
      try {
        dispatch({
          type: SEND_ORDER_IS_LOADING,
        });

        const result = await fetchEnchanced<OrderResponse>(`${BASE_URL}orders`, {
          method: "POST",
          json: { ingredients: ingredientsIds },
        });

        if (!result || !result.success) {
          dispatch({
            type: SEND_ORDER_FAILED,
            payload: result,
          });
          return result;
        }
        dispatch({
          type: SEND_ORDER_SUCCESS,
          payload: result,
        });
      } catch (err) {
        console.error(err);
      }
    };