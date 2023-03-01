import { Counter, CurrencyIcon, } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { useBasketCountOf } from "../../hooks/useBasketCountOf";
import ingredientCardStyle from "./BurgerIngredient.module.css";
import { ingredientPropTypes } from "../../utils/types";
import PropTypes from "prop-types";

export const BurgerIngredient = ({ ingredientData, showIngredientDetails }) => {
  const item = {
    ingredientId: ingredientData._id,
    type: ingredientData.type,
  };

  const [, drag] = useDrag({
    type: "ingredient",
    item,
  });

  const onClick = () => {
    showIngredientDetails(ingredientData._id);
  };

  return (
    <>
      <button
        ref={drag}
        className={ingredientCardStyle.ingredients__listCard}
        onClick={onClick}
      >
        <Counter count={useBasketCountOf(ingredientData._id)} size="default" />
        <img src={ingredientData.image} alt={ingredientData.name} />
        <div
          className={`${ingredientCardStyle.ingredients__priceContainer} mb-2`}
        >
          <p className="text text_type_digits-default">
            {ingredientData.price}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-small">{ingredientData.name}</p>
      </button>
    </>
  );
};

BurgerIngredient.propTypes = {
  ingredientData: ingredientPropTypes.isRequired,
  showIngredientDetails: PropTypes.func.isRequired,
};
