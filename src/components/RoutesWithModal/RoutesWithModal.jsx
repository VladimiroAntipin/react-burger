import { node } from "prop-types";
import React, { cloneElement, isValidElement } from "react";
import { Routes } from "react-router-dom";
import { useModalId } from "../../hooks/useModalId";

export const RoutesWithModal = ({ children }) => {
  const modalId = useModalId();
  const childrenArray = React.Children.toArray(children).filter(isValidElement);

  const modalPath = childrenArray.find(
    (children) =>
      children.props.modalId === modalId && !children.props.modalHandler
  )?.props?.path;

  const resultChildrens = childrenArray.reduce((showedRoutes, children) => {
    if (modalId === children.props.modalId && children.props.modalHandler) {
      const element = cloneElement(children, {
        ...children.props,
        path: modalPath,
      });
      showedRoutes.push(element);
      return showedRoutes;
    }
    if (modalId === children.props.modalId && !children.props.modalHandler) {
      return showedRoutes;
    }

    showedRoutes.push(children);
    return showedRoutes;
  }, []);

  return <Routes>{resultChildrens}</Routes>;
};

RoutesWithModal.propTypes = {
  children: node.isRequired,
};