import { Provider } from "react-redux";
import { store } from "../services/store";

export const ReduxProvider = ({ children }) => (
  <Provider store={store}>
    {children}
  </Provider>
);