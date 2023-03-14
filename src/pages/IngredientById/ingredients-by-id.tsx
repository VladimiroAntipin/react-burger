import { IngredientDetailsWithParams } from "../../components/IngredientsDetails/IngredientsDetails";
import ingredientStyles from "./ingredients-by-id.module.css";

export const IngredientsDetailsPage = () => (
  <>
    <div className={`${ingredientStyles.contentBox}`}>
      <IngredientDetailsWithParams />
    </div>
  </>
);