import { Counter, CurrencyIcon, } from "@ya.praktikum/react-developer-burger-ui-components";
import { bool, element, func, number, object, string } from "prop-types";
import { useDrag } from "react-dnd";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useBasketCountOf } from "../../hooks/useBasketCountOf";
import ingredientCardStyle from "./BurgerIngredient.module.css";
import { INGREDIENT_DETAILS_MODAL_OPEN } from "../../services/actions/ingredientDetails";

export const BurgerIngredient = ({ ingredientData }) => {
  const item = {
    ingredientId: ingredientData._id,
    type: ingredientData.type,
  };

  const [, drag] = useDrag({
    type: "ingredient",
    item,
  });

  const dispatch = useAppDispatch();
  return (
    <>
      <div
        ref={drag}
        className={ingredientCardStyle.ingredients__listCard}
        onClick={() => dispatch({
          type: INGREDIENT_DETAILS_MODAL_OPEN,
          payload: ingredientData,
        })
        }>
        <Counter count={useBasketCountOf(ingredientData._id)} size="default" />
        <img src={ingredientData.image} alt={ingredientData.name} />
        <div className={`${ingredientCardStyle.ingredients__priceContainer} mb-2`}>
          <p className="text text_type_digits-default">
            {ingredientData.price}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-small">{ingredientData.name}</p>
      </div>
    </>
  );
};

BurgerIngredient.propTypes = {
  isModalOpened: bool,
  onClick: func,
  ingredientData: object,
  onClose: func,
  ref: element,
  className: string,
  count: number,
  
};
