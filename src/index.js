import { createRoot } from "react-dom/client";
import App from "./components/App/App";

const rootElement = document.querySelector("#root");

if (!rootElement) {
  throw new Error("no root element");
}

const root = createRoot(rootElement);

root.render(<App />);