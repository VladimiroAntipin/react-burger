import { applyMiddleware, legacy_createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { socketUserMiddleware } from "./middlewares/socketAuthMiddleware";
import { socketMiddleware } from "./middlewares/socketMiddleware";
import { rootReducer } from "./reducers";

const WSS_URL = "wss://norma.nomoreparties.space";

export const store = legacy_createStore(
  rootReducer,
  {},
  composeWithDevTools(
    applyMiddleware(
      thunk,
      socketMiddleware(`${WSS_URL}/orders/all`),
      socketUserMiddleware(`${WSS_URL}/orders`)
    )
  )
);

export type AppStore = ReturnType<typeof store.getState>;
export type AppAction = typeof store extends Store<any, infer Action>
  ? Action
  : never;
export type AppDispatch = typeof store.dispatch;