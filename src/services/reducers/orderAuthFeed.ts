import { FeedState } from "../../utils/types";
import { OrderHistoryAction } from "../actions/wsAuthActions";

export const initialState: FeedState = {
  wsConnected: false,
  wsError: null,
  orderFeedData: null,
  isPageLoading: true,
};

export const orderAuthFeedReducer = (
  state = initialState,
  action: OrderHistoryAction
): FeedState => {
  switch (action.type) {
    case "orderHistory/connect":
      return {
        ...state,
        wsError: null,
        wsConnected: true,
      };

    case "orderHistory/error":
      console.log(action.payload);
      return {
        ...state,
        wsError: true,
        wsConnected: false,
      };

    case "orderHistory/close":
      return {
        ...state,
        wsError: null,
        wsConnected: false,
      };

    case "orderHistory/update":
      return {
        ...state,
        wsError: null,
        orderFeedData: action.payload,
        isPageLoading: false,
      };
    default:
      return state;
  }
};