import { node } from "prop-types";
import { useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";

export const Portal = ({ children }) => {
  const [container] = useState(() => document.createElement("div"));

  useLayoutEffect(() => {
    document.body.append(container);

    return () => container.remove();
  }, [container]);

  return createPortal(children, container);
};

Portal.propTypes = {
  children: node,
}