import { applyMiddleware, legacy_createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { socketMiddleware } from "./middlewares/socketMiddleware";
import { rootReducer } from "./reducers";

export const store = legacy_createStore(
  rootReducer,
  {},
  composeWithDevTools(
    applyMiddleware(thunk, socketMiddleware)
  )
);

export type AppStore = ReturnType<typeof store.getState>;
export type AppAction = typeof store extends Store<any, infer Action>
  ? Action
  : never;
export type AppDispatch = typeof store.dispatch;