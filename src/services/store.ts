import { applyMiddleware, legacy_createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { rootReducer } from "./reducers";

export const store = legacy_createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(thunk))
);

export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;