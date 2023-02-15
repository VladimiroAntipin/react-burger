import { forwardRef } from "react";
import { useIngredientByType } from "../../hooks/useIngredients";
import { BurgerIngredient } from "../BurgerIngredient/BurgerIngredient";
import ingredientGroupStyle from "./BurgerIngredientGroup.module.css";
import PropTypes from "prop-types";

const INGREDIENT_TYPE_TO_TITLE = {
  bun: "Булки",
  sauce: "Соусы",
  main: "Начинки",
};

export const BurgerIngredientGroup = forwardRef(
  ({ ingredientType, showIngredientDetails }, ref) => (
    <div ref={ref}>
      <h2 className="text text_type_main-medium mb-6 mt-10">
        {INGREDIENT_TYPE_TO_TITLE[ingredientType]}
      </h2>
      <ul className={ingredientGroupStyle.ingredients__list}>
        {useIngredientByType(ingredientType).map((ingredientData) => (
          <li key={ingredientData._id}>
            <BurgerIngredient
              ingredientData={ingredientData}
              showIngredientDetails={showIngredientDetails}
            />
          </li>
        ))}
      </ul>
    </div>
  )
);

BurgerIngredientGroup.displayName = "BurgerIngredientGroup";

BurgerIngredientGroup.propTypes = {
  ingredientType: PropTypes.string.isRequired,
  showIngredientDetails: PropTypes.func.isRequired,
};
