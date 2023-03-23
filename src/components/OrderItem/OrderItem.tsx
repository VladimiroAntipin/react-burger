import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { OrderEnriched } from "../../pages/feed/feed";
import { formatOrderDate } from "../../utils/dateFormat";
import { Ingredient } from "../../utils/types";
import OrderItemStyles from "./OrderItem.module.css";

export const OrderItem = ({ order }: { order: OrderEnriched }) => {
  const ingredientsDataMap = order.ingredients.reduce((acc, ingredient) => {
    if (acc[ingredient._id]) {
      acc[ingredient._id].count += 1;
      return acc;
    } else {
      acc[ingredient._id] = { ...ingredient, count: 1 };
    }
    return acc;
  }, {} as Record<string, Ingredient & { count: number }>);

  const ingredientsData = Object.values(ingredientsDataMap);

  return (
    <>
      <div className={OrderItemStyles.orderBox}>
        <div className={OrderItemStyles.orderNumber}>
          <p className="text text_type_digits-default">#{order.number}</p>
        </div>

        <div className={OrderItemStyles.burgerName}>
          <p className="text text_type_main-medium">{order.name}</p>
        </div>

        <div className={OrderItemStyles.orderStatus}>
          <p className="text text_type_main-default">
            {order.status === "done" ? "Выполнен" : "Готовится"}
          </p>
        </div>

        <div className={OrderItemStyles.textBurgerFill}>
          <p className="text text_type_main-medium">Состав:</p>
        </div>

        <div className={OrderItemStyles.ingredientBox}>
          {ingredientsData.map((ingredient) => (
            <div
              key={ingredient._id}
              className={OrderItemStyles.ingredientSpecs}
            >
              <img
                className={OrderItemStyles.ingredientImg}
                src={ingredient.image}
                alt={ingredient.name}
              />
              <p
                className={`${OrderItemStyles.ingredientName} text text_type_main-default`}
              >
                {ingredient.name}
              </p>
              <div className={OrderItemStyles.priceContainer}>
                <p className="text text_type_digits-default mr-2">
                  {ingredient.count}x{ingredient.price}
                </p>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          ))}
        </div>

        <div className={OrderItemStyles.dataBox}>
          <p className="text text_type_main-default text_color_inactive">
            {formatOrderDate(order.createdAt)} i+GMT+3{" "}
          </p>
          <div className={OrderItemStyles.priceContainer}>
            <p className="text text_type_digits-default mr-2">{order.price}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </>
  );
};