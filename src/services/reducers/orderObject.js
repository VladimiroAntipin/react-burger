import { SEND_ORDER_FAILED } from "../actions/orderObject";
import { SEND_ORDER_IS_LOADING } from "../actions/orderObject";
import { SEND_ORDER_STALE } from "../actions/orderObject";
import { SEND_ORDER_SUCCESS } from "../actions/orderObject";

const initialState = {
  status: "STALE",
};

export const orderObjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_ORDER_FAILED: {
      return {
        status: "FAILED"
      }
    }
    case SEND_ORDER_IS_LOADING: {
      return {
        status: "LOADING"
      }
    }
    case SEND_ORDER_STALE: {
      return {
        status: "STALE"
      }
    }
    case SEND_ORDER_SUCCESS: {
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