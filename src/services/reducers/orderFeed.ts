import { FeedState } from "../../utils/types";
import { OrderFeedAction } from "../actions/wsActions";

export const initialState: FeedState = {
  wsConnected: false,
  wsError: null,
  orderFeedData: null,
  isPageLoading: true,
};

export const orderFeedReducer = (
  state: FeedState = initialState,
  action: OrderFeedAction
): FeedState => {
  switch (action.type) {
    case "orderFeed/connect":
      return {
        ...state,
        wsError: null,
        wsConnected: true,
      };

    case "orderFeed/error":
      return {
        ...state,
        wsError: true,
        wsConnected: false,
      };

    case "orderFeed/close":
      return {
        ...state,
        wsError: null,
        wsConnected: false,
      };

    case "orderFeed/update":
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