import {
  SEND_ORDER_FAILED,
  SEND_ORDER_IS_LOADING,
  SEND_ORDER_SUCCESS,
  CLEAR_ORDER
} from "../actions/orderObject";

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};

export const orderReducer = (state = initialState, action) => {
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