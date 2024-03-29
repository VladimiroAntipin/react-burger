import { Button, ConstructorElement, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo } from "react";
import { useDrop } from "react-dnd";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useSelectedIngredients, useSelectedIngredientsIds, useSelectedIngredientsPrice } from "../../hooks/useSelectedIngredients";
import { CONSTRUCTOR_ADD_INGREDIENT, CONSTRUCTOR_RESET_INGREDIENT } from "../../services/actions/burgerConstructor";
import { CLEAR_ORDER, makeOrder } from "../../services/actions/orderObject";
import { Ingredient, IngredientType } from "../../utils/types";
import { BurgerConstructorIngredient } from "../BurgerConstructorIngredient/BurgerConstructorIngredient";
import { Modal } from "../Modal/Modal";
import { OrderDetails } from "../OrderDetails/OrderDetails";
import burgerConstructorStyle from "./BurgerConstructor.module.css";

export const ingredientToConstructorElementProps = (
  ingredient: Ingredient
) => ({
  price: ingredient?.price ?? 0,
  thumbnail: ingredient?.image ?? void 0,
  text: ingredient?.name ?? "",
});

const EMPTY_BUN = {
  text: "Перетяните булочку сюда",
  price: 0,
  thumbnail: "/Loading.svg",
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
    () =>
    ({
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
    } as const),
    [bunProps]
  );
};

export function BurgerConstructor() {
  const hasOrder = useAppSelector((store) => !!store.orderObject.data);
  const navigate = useNavigate();

  const isUserAuth = !!useAppSelector(
    (state) => state.currentSession.isCurrentUserAuth
  );

  const showOrderDetails = () => {
    if (isUserAuth) {
      dispatch(makeOrder(selectedIngredientsIds));
    } else {
      navigate("/login");
    }
  };

  const closeOrderDetails = () => {
    dispatch({ type: CLEAR_ORDER });
    dispatch({ type: CONSTRUCTOR_RESET_INGREDIENT });
  };

  const totalPrice = useSelectedIngredientsPrice();
  const dispatch = useAppDispatch();
  const [, dropRef] = useDrop({
    accept: "ingredient",
    drop: (data) =>
      dispatch({
        type: CONSTRUCTOR_ADD_INGREDIENT,
        payload: data as { ingredientId: string; type: IngredientType },
      }),
  });

  const { mid: middleIngredients, bun: selectedBun } = useSelectedIngredients();
  const bun = useBun();
  const selectedIngredientsIds = useSelectedIngredientsIds();

  const isOrderPreparing = useAppSelector(
    (store) => store.orderObject.isLoading
  );
  

  return (
    <section className={`${burgerConstructorStyle.cart} mt-25 `}>
      <ul
        ref={dropRef}
        className={burgerConstructorStyle.cart__list}
        data-test={`cart__listIngredients`}
      >
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
        <li className={`${burgerConstructorStyle.cart__listItem}`} >
          <ConstructorElement {...bun.bottom} />
        </li>
      </ul>
      <div className={`${burgerConstructorStyle.cart__container} mt-10`}>
        <div className={`${burgerConstructorStyle.cart__totalContainer} mr-10`}>
          <p className="text text_type_digits-medium mr-3">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          disabled={
            isUserAuth && selectedIngredientsIds.length === 0 && !selectedBun
          }
          htmlType="button"
          onClick={showOrderDetails}
          type="primary"
          size="large"
          extraClass="mr-4"
          data-test={`button-order`}
        >
          { isOrderPreparing ? "Загрузка..." : isUserAuth ? "Оформить заказ" : "Войти в аккаунт" }
        </Button>
      </div>

      {hasOrder && (
        <Modal onClose={closeOrderDetails}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
}
