import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { PropsWithChildren } from "react";
import { Link, useLocation } from "react-router-dom";
import { OrderEnriched } from "../../pages/feed/feed";
import { formatOrderDate } from "../../utils/dateFormat";
import { formatOrderStatus } from "../../utils/formatOrderStatus";
import OrderCardStyles from "./OrderCard.module.css";

const MAX_SHOW_INGREDIENTS = 6;

const _OrderCard = ({ order, children }: PropsWithChildren<{ order: OrderEnriched }>) => {
  const countOfIngredients = order.ingredients.length;
  const countOfHiddenIngredients = countOfIngredients - MAX_SHOW_INGREDIENTS;
  const ingredients = order.ingredients.slice(0, MAX_SHOW_INGREDIENTS);

  const { pathname } = useLocation();

  return (
    <Link
      state={{
        backgroundUrl: pathname,
      }}
      to={[pathname, order._id].join("/")}
      className={OrderCardStyles.orderBox}
    >
      <div className={OrderCardStyles.orderNumberData}>
        <p className="text text_type_digits-default">#{order.number}</p>
        <p className="text text_type_main-default text_color_inactive">
          {formatOrderDate(order.createdAt)} i+GMT+3{" "}
        </p>
      </div>

      <p className="text text_type_main-medium">{order.name}</p>

      {children}

      <div className={OrderCardStyles.ingredientBox}>
        <div className={OrderCardStyles.ingredientImgContainer}>
          {ingredients.map((ingredient, index) => (
            <div className={OrderCardStyles.ingredientImgWrapper} key={index}>
              <img
                src={ingredient.image}
                alt={ingredient.name}
                className={OrderCardStyles.ingredientImg}
              />
              {countOfHiddenIngredients > 0 && index === 0 && (
                <div
                  className={[
                    OrderCardStyles.ingredientImgWrapperOverlay,
                    "text text_type_digits-default",
                  ].join(" ")}
                >
                  +{countOfHiddenIngredients}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className={OrderCardStyles.priceContainer}>
          <p className="text text_type_digits-default">{order.price}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </Link>
  );
};

_OrderCard.displayName = "OrderCard";

const Status = ({ status }: { status: string }) => (
  <p
    className="text text_type_main-default"
    style={{
      color: status === "done" ? "#00CCCC" : "#F2F2F3",
    }}
  >
    {formatOrderStatus(status)}
  </p>
);

export const OrderCard = Object.assign(_OrderCard, {
  Status,
});