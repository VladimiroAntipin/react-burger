import { FeedState } from "../../utils/types";

import {
  WS_AUTH_CONNECTION_CLOSED,
  WS_AUTH_CONNECTION_ERROR,
  WS_AUTH_CONNECTION_START,
  WS_AUTH_CONNECTION_SUCCESS,
  WS_AUTH_GET_MESSAGE,
  WsAuthActions,
} from "../actions/wsAuthActions";

export const initialState: FeedState = {
  wsConnected: false,
  wsError: null,
  orderFeedData: null,
  isPageLoading: true,
};

export const orderAuthFeedReducer = (
  state = initialState,
  action: WsAuthActions
): FeedState => {
  switch (action.type) {
    case WS_AUTH_CONNECTION_START:
      return {
        ...state,
        isPageLoading: true,
      };
    case WS_AUTH_CONNECTION_SUCCESS:
      return {
        ...state,
        wsError: null,
        wsConnected: true,
      };

    case WS_AUTH_CONNECTION_ERROR:
      console.log(action.payload);
      return {
        ...state,
        wsError: true,
        wsConnected: false,
      };

    case WS_AUTH_CONNECTION_CLOSED:
      return {
        ...state,
        wsError: null,
        wsConnected: false,
      };

    case WS_AUTH_GET_MESSAGE:
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