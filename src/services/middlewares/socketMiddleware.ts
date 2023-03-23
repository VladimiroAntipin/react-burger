import { Middleware } from "redux";
import { isObject } from "../../utils/typesChecks";

import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
} from "../actions/wsActions";

export const socketMiddleware = (wsUrl: string): Middleware => {
  return (store) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;

      if (type === WS_CONNECTION_START) {
        socket = new WebSocket(wsUrl);
        socket.onopen = (event) => {
          dispatch({ type: WS_CONNECTION_SUCCESS, payload: event });
        };

        socket.onerror = (event) => {
          console.error(event);
          dispatch({ type: WS_CONNECTION_ERROR, payload: event });
        };

        socket.onmessage = (event: MessageEvent<string>) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          if (isObject(parsedData) && "success" in parsedData) {
            delete parsedData.success;
          }

          dispatch({ type: WS_GET_MESSAGE, payload: parsedData });
        };

        socket.onclose = (event) => {
          dispatch({ type: WS_CONNECTION_CLOSED, payload: event });
        };
      }

      if (socket && type === WS_SEND_MESSAGE) {
        const message = { ...payload };
        socket.send(JSON.stringify(message));
      }

      next(action);
    };
  };
};