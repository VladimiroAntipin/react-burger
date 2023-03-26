import { useMemo } from "react";
import { OrderCard } from "../../components/OrderCard/OrderCard";
import { useGetFeed } from "../../hooks/orders";
import { Ingredient, Order } from "../../utils/types";
import FeedStyles from "./feed.module.css";
import appStyles from "../../components/App/App.module.css"
import { useAppSelector } from "../../hooks/useAppSelector";

export type OrderEnriched = Omit<Order, "ingredients"> & {
  ingredients: Ingredient[];
  price: number;
};

export const OrderFeed = () => {
  const { total, orders: transformedOrders, totalToday } = useGetFeed() ?? {};
  const doneOrders = useMemo(
    () =>
      transformedOrders
        ?.filter((order) => order.status === "done")
        ?.map((order) => order.number),
    [transformedOrders]
  );
  const inProgressOrders = useMemo(
    () =>
      transformedOrders
        ?.filter((order) => order.status !== "done")
        ?.map((order) => order.number),
    [transformedOrders]
  );

  const wsConnected = useAppSelector(
    (store) => store.orderFeed.wsConnected
  );

  const isPageLoading = useAppSelector(
    (store) => store.orderFeed.isPageLoading
  );

  if (wsConnected === false || isPageLoading === true) {
    return <div className={`${appStyles.loading} text text_type_main-large`}>Загрузка...</div>
  }

  return (
      <div className={FeedStyles.orderFeed}>
        <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
        <div className={FeedStyles.contentBox}>
          <ul className={FeedStyles.list}>
            {transformedOrders?.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </ul>

          <div className={FeedStyles.ordersData}>

            <div className={`${FeedStyles.orderStatusBox} mb-15`}>
              <p className="text text_type_main-medium">
                Готовы:
              </p>

              <p className="text text_type_main-medium">
                В работе: 
              </p>
              <ul className={FeedStyles.orderList}>
                <li className="text text_type_digits-default mb-2">{doneOrders?.slice(0, -45).join("\n")}</li>
                <li className="text text_type_digits-default mb-2">{doneOrders?.slice(5, -40).join("\n")}</li> 
              </ul>
             
                <ul className={FeedStyles.orderListReady}>
                {doneOrders?.length === transformedOrders?.length && (
                  <li className="text text_type_main-small">
                    Все текущие заказы готовы!
                  </li>
                  )}
                  {inProgressOrders?.slice(0, 10).map((order) => (
                  <li
                    className="text text_type_digits-default mb-2"
                    key={order}
                  >
                    {order}
                  </li>
                ))}
                </ul>
              

            </div>
            <div className={`${FeedStyles.numBox} mb-15`}>
              <p className="text text_type_main-medium">
                Выполнено за все время:
              </p>
              <p className={`${FeedStyles.number} text text_type_digits-large`}>
                {total}
              </p>
            </div>
            <div className={FeedStyles.numBox}>
              <p className="text text_type_main-medium">
                Выполнено за сегодня:
              </p>
              <p className={`${FeedStyles.number} text text_type_digits-large`}>
                {totalToday}
              </p>
            </div>
          </div>
        </div>
      </div>
  );
}