import { node } from "prop-types";
import { useState } from "react";
import { createPortal } from "react-dom";

export const Portal = ({ children }) => {
  const [container] = useState(() => document.querySelector("#modals"));

  return createPortal(children, container);
};

Portal.propTypes = {
  children: node.isRequired,
};
