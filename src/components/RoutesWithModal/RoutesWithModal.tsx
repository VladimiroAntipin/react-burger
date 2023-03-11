import React, { createElement, isValidElement, PropsWithChildren, ReactElement } from "react";
import { IndexRouteProps, LayoutRouteProps, PathRouteProps, Route, Routes } from "react-router-dom";
import { useModalId } from "../../hooks/useModalId";
import { get, isString } from "../../utils/typesChecks";


const transformToRoute = (
  element: ReactElement,
  overrideProps?: Record<string, unknown>
) =>
  createElement(Route, {
    ...element.props,
    ...(overrideProps ?? {}),
  });

const _RoutesWithModal = ({ children: _children }: PropsWithChildren) => {
  const modalId = useModalId();
  const childrenArray =
    React.Children.toArray(_children).filter(isValidElement);

  const modalPath = get(
    childrenArray.find(
      (children) =>
        get(children.props, "modalId") === modalId &&
        !get(children.props, "modalHandler")
    )?.props,
    "path"
  );

  const resultChildren = childrenArray.reduce(
    (showedRoutes, children, index) => {
      if (
        modalId === get(children.props, "modalId") &&
        get(children.props, "modalHandler")
      ) {
        const element = transformToRoute(children, {
          path: isString(modalPath) ? modalPath : undefined,
          key: index,
        });
        showedRoutes.push(element);
        return showedRoutes;
      }
      if (
        modalId === get(children.props, "modalId") &&
        !get(children.props, "modalHandler")
      ) {
        return showedRoutes;
      }

      showedRoutes.push(transformToRoute(children, { key: index }));
      return showedRoutes;
    },
    [] as ReactElement[]
  );

  return <Routes>{resultChildren}</Routes>;
};

const RoutesWithModalRoute = (
  props:
    | (
      | (PathRouteProps & {
        modalId: string;
      })
      | (IndexRouteProps &
        (
          | {}
          | {
            modalHandler: boolean;
            modalId: string;
          }
        ))
    )
    | LayoutRouteProps
) => null;

export const RoutesWithModal = Object.assign(_RoutesWithModal, {
  Route: RoutesWithModalRoute,
  displayName: "RoutesWithModal",
});