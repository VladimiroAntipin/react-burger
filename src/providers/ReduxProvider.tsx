import { Provider } from "react-redux";
import { store } from "../services/store";
import { ProviderProps } from "../utils/types";

export const ReduxProvider = ({ children }: ProviderProps) => (
  <Provider store={store}>
    {children}
  </Provider>
);