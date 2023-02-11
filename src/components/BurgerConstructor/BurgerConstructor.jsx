import { Button, ConstructorElement, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { bool, func, number, string } from "prop-types";
import { useMemo } from "react";
import { useDrop } from "react-dnd";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useSelectedIngredients, useSelectedIngredientsIds, useSelectedIngredientsPrice } from "../../hooks/useSelectedIngredients";
import { makeOrder } from "../../services/reducers/orderObject";
import { BurgerConstructorIngredient } from "../BurgerConstructorIngredient/BurgerConstructorIngredient";
import burgerConstructorStyle from "./BurgerConstructor.module.css";

export const ingredientToConstructorElementProps = (ingredient) => ({
  price: ingredient?.price ?? 0,
  thumbnail: ingredient?.image ?? void 0,
  text: ingredient?.name ?? "",
});

const EMPTY_BUN = {
  text: "Перетяните булочку сюда",
  price: 0,
  thumbnail: "/loading.svg",
};

const useBun = () => {
  const selectedBun = useSelectedIngredients().bun;
  const bunProps = useMemo(
    () =>
      selectedBun
        ? ingredientToConstructorElementProps(selectedBun)
        : EMPTY_BUN,
    [selectedBun]
  );

  return useMemo(
    () => ({
      top: {
        ...bunProps,
        text: [bunProps.text, "(верх)"].join(" "),
        type: "top",
        isLocked: true,
      },
      bottom: {
        ...bunProps,
        text: [bunProps.text, "(низ)"].join(" "),
        type: "bottom",
        isLocked: true,
      },
    }),
    [bunProps]
  );
};

export function BurgerConstructor() {
  const totalPrice = useSelectedIngredientsPrice();
  const dispatch = useAppDispatch();
  const [, dropRef] = useDrop({
    accept: "ingredient",
    drop: (data) =>
      dispatch({
        type: "CONSTRUCTOR_ADD_INGREDIENT",
        payload: data,
      }),
  });

  const { mid: middleIngredients, bun: selectedBun } = useSelectedIngredients();
  const bun = useBun();
  const selectedIngredientsIds = useSelectedIngredientsIds();

  return (
    <section className={`${burgerConstructorStyle.cart} mt-25 `}>
      <ul ref={dropRef} className={burgerConstructorStyle.cart__list}>
        <li className={`${burgerConstructorStyle.cart__listItem}`}>
          <ConstructorElement {...bun.top} />
        </li>
        <div className={`${burgerConstructorStyle.cart__listIngredients}`}>
          <ul className={burgerConstructorStyle.cart__list}>
            {middleIngredients.map((ingredient, index) => (
              <BurgerConstructorIngredient
                key={ingredient.key}
                index={index}
                ingredient={ingredient}
              />
            ))}
          </ul>
        </div>
        <li className={`${burgerConstructorStyle.cart__listItem}`}>
          <ConstructorElement {...bun.bottom} />
        </li>
      </ul>
      <div className={`${burgerConstructorStyle.cart__container} mt-10`}>
        <div className={`${burgerConstructorStyle.cart__totalContainer} mr-10`}>
          <p className="text text_type_digits-medium mr-3">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          disabled={selectedIngredientsIds.length === 0 || !selectedBun}
          htmlType="button"
          onClick={() => dispatch(makeOrder(selectedIngredientsIds))}
          type="primary"
          size="large"
          extraClass="mr-4"
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  price: number,
  thumbnail: string,
  text: string,
  totalPrice: number,
  isLocked: bool,
  disabled: bool,
  onClick: func,
  className: string,
  extraClass: string,
};
