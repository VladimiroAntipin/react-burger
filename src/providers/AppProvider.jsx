import { DndProvider } from "./DndProvider";
import { ReduxProvider } from "./ReduxProvider";

export const AppProvider = ({ children }) => (
  <ReduxProvider>
    <DndProvider>
      {children}
    </DndProvider>
  </ReduxProvider>
);
