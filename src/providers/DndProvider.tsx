import { DndProvider as RDndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ProviderProps } from "../utils/types";

export const DndProvider = ({ children }: ProviderProps) => (
  <RDndProvider backend={HTML5Backend}>
    {children}
  </RDndProvider>
);