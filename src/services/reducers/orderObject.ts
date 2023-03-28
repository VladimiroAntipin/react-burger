import { OrderResponse } from "../../utils/types";

import {
  CLEAR_ORDER,
  OrderAction,
  SEND_ORDER_FAILED,
  SEND_ORDER_IS_LOADING,
  SEND_ORDER_SUCCESS
} from "../actions/orderObject";

export const initialState = {
  data: null,
  isLoading: false,
  error: null,
};

type OrderState = {
  data: null | OrderResponse;
  isLoading: boolean;
  error: null | unknown;
};

export const orderReducer = (
  state: OrderState = initialState,
  action: OrderAction
): OrderState => {
  switch (action.type) {
    case SEND_ORDER_IS_LOADING: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }
    case SEND_ORDER_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        error: null,
      };
    }
    case SEND_ORDER_FAILED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }
    case CLEAR_ORDER: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};