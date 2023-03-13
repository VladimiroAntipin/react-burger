import { PropsWithChildren, useState } from "react";
import { createPortal } from "react-dom";

export const Portal = ({ children }: PropsWithChildren) => {
  const [container]= useState(() => document.querySelector("#modals"));
  if (!container){
    console.error('container should exist')
    throw new Error()
  }

  return createPortal(children, container);
};