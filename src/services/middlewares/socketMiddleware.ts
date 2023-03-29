import { Middleware } from "redux";
import { isObject } from "../../utils/typesChecks";

export type WsConnectAction = {
  type: "WS_CONNECT";
  payload: {
    url: string;
    actionPrefix: string;
  };
};

export type CreateWsActions<Prefix extends string, Data, Err = unknown> =
  | {
      type: `${Prefix}/connect`;
    }
  | {
      type: `${Prefix}/error`;
      payload: Err;
    }
  | {
      type: `${Prefix}/close`;
    }
  | {
      type: `${Prefix}/update`;
      payload: Data;
    };

const createActionType =
  (actionPrefix: string) =>
  (actionName: "connect" | "error" | "close" | "update") =>
    [actionPrefix, actionName].join("/");

export const socketMiddleware: Middleware = (store) => {
  const { dispatch } = store;
  const webSockets = new Map<string, WebSocket>();

  return (next) => (action) => {
    if (action.type !== "WS_CONNECT") {
      return next(action);
    }
    const {
      payload: { actionPrefix, url },
    } = action as WsConnectAction;

    if (webSockets.has(actionPrefix)) {
      return next(action);
    }
    const socket = new WebSocket(url);
    webSockets.set(actionPrefix, socket);
    const actionType = createActionType(actionPrefix);

    socket.onopen = (event) => {
      dispatch({ type: actionType("connect") });
    };

    socket.onerror = (event) => {
      console.error(event);
      dispatch({ type: actionType("error"), payload: event });
    };

    socket.onmessage = (event: MessageEvent<string>) => {
      const { data } = event;
      const parsedData = JSON.parse(data);
      if (isObject(parsedData) && "success" in parsedData) {
        delete parsedData.success;
      }

      dispatch({ type: actionType("update"), payload: parsedData });
    };

    socket.onclose = (event) => {
      dispatch({ type: actionType("close") });
    };

    next(action);
  };
};