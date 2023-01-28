import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo, useState } from "react";
import { useGroupedIngredients } from "../../hooks/useFilteredIngredient";
import { sum } from "../../utils/sum";
import { OrderDetails } from "../OrderDetails/OrderDetails";
import burgerConstructorStyle from "./BurgerConstructor.module.css";
import { number, string } from "prop-types";

const ingredientToConstructorElementProps = (ingredient) => ({
  price: ingredient?.price ?? 0,
  thumbnail: ingredient?.image ?? void 0,
  text: ingredient?.name ?? "",
});

export function BurgerConstructor({ selectedIngredients }) {
  const [isOpened, setIsOpened] = useState(false);
  const totalPrice = useMemo(
    () => sum(...selectedIngredients.map((ingredient) => ingredient.price)),
    [selectedIngredients]
  );
  const {
    buns: [burgerBun],
    mains,
    sauces,
  } = useGroupedIngredients(selectedIngredients);
  const middleIngredients = [...mains, ...sauces];
  const topAndBottomProps = {
    ...ingredientToConstructorElementProps(burgerBun),
    isLocked: true,
  };

  return (
    <section className={`${burgerConstructorStyle.cart} mt-25 `}>
      <ul className={burgerConstructorStyle.cart__list}>
        <li className={`${burgerConstructorStyle.cart__listItem}`}>
          <ConstructorElement type="top" {...topAndBottomProps} />
        </li>
        <div className={`${burgerConstructorStyle.cart__listIngredients}`}>
          <ul className={burgerConstructorStyle.cart__list}>
            {middleIngredients.map((ingredient) => (
              <li
                key={ingredient._id}
                className={burgerConstructorStyle.cart__listItem}
              >
                <DragIcon type="primary" />
                <ConstructorElement
                  {...ingredientToConstructorElementProps(ingredient)}
                />
              </li>
            ))}
          </ul>
        </div>
        <li className={`${burgerConstructorStyle.cart__listItem}`}>
          <ConstructorElement type="bottom" {...topAndBottomProps} />
        </li>
      </ul>
      <div className={`${burgerConstructorStyle.cart__container} mt-10`}>
        <div className={`${burgerConstructorStyle.cart__totalContainer} mr-10`}>
          <p className="text text_type_digits-medium mr-3">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          onClick={() => setIsOpened(true)}
          type="primary"
          size="large"
          style={{ marginRight: "16px" }}
        >
          Оформить заказ
        </Button>
        {isOpened && <OrderDetails onClose={() => setIsOpened(false)} />}
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  price: number,
  thumbnail: string,
  text: string,
  totalPrice: number,
}