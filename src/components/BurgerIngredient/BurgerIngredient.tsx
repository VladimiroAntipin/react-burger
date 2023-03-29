import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import { useBasketCountOf } from "../../hooks/useBasketCountOf";
import { Ingredient } from "../../utils/types";
import { LocationState } from "../App/App";
import ingredientCardStyle from "./BurgerIngredient.module.css";

export const BurgerIngredient = ({
  ingredientData: { _id: ingredientId, image, price, name, type },
}: {
  ingredientData: Ingredient;
}) => {
  const item = {
    ingredientId,
    type: type,
  };

  const [, drag] = useDrag({
    type: "ingredient",
    item,
  });

  const locationPathname = useLocation().pathname;

  return (
    <>
      <Link
        to={`/ingredients/${ingredientId}`}
        ref={drag}
        state={
          {
            backgroundUrl: locationPathname,
          } satisfies LocationState
        }
        className={ingredientCardStyle.ingredients__listCard}
        data-test={`burgerIngredient_${ingredientId}`}
      >
        <Counter count={useBasketCountOf(ingredientId)} size="default" />
        <img src={image} alt={name} />
        <div
          data-test={`ingredients__listCard_${ingredientId}`}
          className={`${ingredientCardStyle.ingredients__priceContainer} mb-2`}
        >
          <p className="text text_type_digits-default">{price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-small">{name}</p>
      </Link>
    </>
  );
};
