import { any, element, string } from "prop-types";
import { forwardRef } from "react";
import { useIngredientByType } from "../../hooks/useIngredients";
import { BurgerIngredient } from "../BurgerIngredient/BurgerIngredient";
import ingredientGroupStyle from "./BurgerIngredientGroup.module.css";

const INGREDIENT_TYPE_TO_TITLE = {
  bun: "Булки",
  sauce: "Соусы",
  main: "Начинки",
};

export const BurgerIngredientGroup = forwardRef(({ ingredientType }, ref) => (
  <div ref={ref}>
    <h2 className="text text_type_main-medium mb-6 mt-10">
      {INGREDIENT_TYPE_TO_TITLE[ingredientType]}
    </h2>
    <ul className={ingredientGroupStyle.ingredients__list}>
      {useIngredientByType(ingredientType).map((ingredientData) => (
        <li key={ingredientData._id}>
          <BurgerIngredient ingredientData={ingredientData} />
        </li>
      ))}
    </ul>
  </div>
));

BurgerIngredientGroup.displayName = "BurgerIngredientGroup";

BurgerIngredientGroup.propTypes = {
  ingredientType: string.isRequired,
  className: string,
  ingredientData: any,
};
