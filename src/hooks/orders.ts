import { useEffect, useMemo } from "react";
import { WsConnectAction } from "../services/middlewares/socketMiddleware";
import { AppStore } from "../services/store";
import { FeedState } from "../utils/types";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";
import { useIngredientsMap } from "./useIngredients";

const createGetFeedHook = (
  selector: (store: AppStore) => FeedState,
  getPayload: () => { actionPrefix: "orderFeed" | "orderHistory"; url: string }
) => {
  const useGetFeed = () => {
    const ingredients = useIngredientsMap();

    const dispatch = useAppDispatch();
    const wsConnected = useAppSelector((store) => selector(store).wsConnected);
    useEffect(() => {
      if (!wsConnected) {
        dispatch({
          type: "WS_CONNECT",
          payload: getPayload(),
        } as WsConnectAction as any);
      }
    }, [dispatch, wsConnected]);
    const feed = useAppSelector(
      (store: AppStore) => selector(store).orderFeedData
    );

    return {
      ...feed,
      orders: useMemo(
        () =>
          feed?.orders
            ?.map((order) => ({
              ...order,
              ingredients: order.ingredients
                .map((ingredient) => ingredients[ingredient])
                .filter(Boolean),
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
  () => ({
    actionPrefix: "orderFeed",
    url: "wss://norma.nomoreparties.space/orders/all",
  })
);

export const useGetOrderHistory = createGetFeedHook(
  (store) => store.orderAuthFeed,
  () => {
    const token = localStorage.getItem("accessToken")?.replace("Bearer ", "");
    return {
      actionPrefix: "orderHistory",
      url: `wss://norma.nomoreparties.space/orders?token=${token}`,
    };
  }
);