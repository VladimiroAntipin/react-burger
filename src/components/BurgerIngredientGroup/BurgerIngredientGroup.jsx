import ingredientGroupStyle from "./BurgerIngredientGroup.module.css";
import { BurgerIngredient } from "../BurgerIngredient/BurgerIngredient";
import { array, string } from "prop-types";

export const BurgerIngredientGroup = ({ ingredientsList, title }) => (
  <>
    <h2 className="text text_type_main-medium mb-6 mt-10">{title}</h2>
    <ul className={ingredientGroupStyle.ingredients__list}>
      {ingredientsList.map(({ _id: id, ...ingredientData }) => (
        <li key={id}>
          <BurgerIngredient ingredientData={ingredientData} />
        </li>
      ))}
    </ul>
  </>
);

BurgerIngredientGroup.propTypes = {
  title: string,
  ingredientsList: array,
}