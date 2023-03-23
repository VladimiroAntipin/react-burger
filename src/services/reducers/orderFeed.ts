import { FeedState } from "../../utils/types";

import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
} from "../actions/wsActions";

import { WsActions } from "../actions/wsActions";

const initialState: FeedState = {
  wsConnected: false,
  wsError: null,
  orderFeedData: null,
  isPageLoading: true,
};

export const orderFeedReducer = (
  state: FeedState = initialState,
  action: WsActions
): FeedState => {
  switch (action.type) {
    case WS_CONNECTION_START:
      return {
        ...state,
        isPageLoading: true,
      };
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsError: null,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsError: true,
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsError: null,
        wsConnected: false,
      };

    case WS_GET_MESSAGE:
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