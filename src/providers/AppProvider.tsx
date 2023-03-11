import { DndProvider } from "./DndProvider";
import { ReduxProvider } from "./ReduxProvider";
import { ProviderProps } from "../utils/types";

export const AppProvider = ({ children }: ProviderProps) => (
  <ReduxProvider>
    <DndProvider>
      {children}
    </DndProvider>
  </ReduxProvider>
);
