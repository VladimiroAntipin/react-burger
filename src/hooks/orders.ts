import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { AppStore } from "../services/store";
import { FeedState } from "../utils/types";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";
import { useIngredientsMap } from "./useIngredients";

const createGetFeedHook = (
  selector: (store: AppStore) => FeedState,
  connectAction: "WS_CONNECTION_START" | "WS_AUTH_CONNECTION_START"
) => {
  const useGetFeed = () => {
    const ingredients = useIngredientsMap();

    const dispatch = useAppDispatch();
    const wsConnected = useAppSelector((store) => selector(store).wsConnected);
    useEffect(() => {
      if (!wsConnected) {
        dispatch({
          type: connectAction,
        });
      }
    }, [dispatch, wsConnected]);
    const feed = useSelector(
      (store: AppStore) => selector(store).orderFeedData
    );

    return {
      ...feed,
      orders: useMemo(
        () =>
          feed?.orders
            ?.map((order) => ({
              ...order,
              ingredients: order.ingredients.map(
                (ingredient) => ingredients[ingredient]
              ),
            }))
            ?.map((order) => ({
              ...order,
              price: order.ingredients.reduce(
                (acc, ingredient) => acc + ingredient.price,
                0
              ),
            })),
        [feed?.orders, ingredients]
      ),
    };
  };

  return useGetFeed;
};

export const useGetFeed = createGetFeedHook(
  (store) => store.orderFeed,
  "WS_CONNECTION_START"
);

export const useGetOrderHistory = createGetFeedHook(
  (store) => store.orderAuthFeed,
  "WS_AUTH_CONNECTION_START"
);