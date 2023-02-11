import { DndProvider as RDndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const DndProvider = ({ children }) => (
  <RDndProvider backend={HTML5Backend}>
    {children}
  </RDndProvider>
);