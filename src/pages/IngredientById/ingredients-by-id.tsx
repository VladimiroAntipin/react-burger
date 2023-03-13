import AppHeader from "../../components/AppHeader/AppHeader";
import { IngredientDetailsWithParams } from "../../components/IngredientsDetails/IngredientsDetails";
import ingredientStyles from "./ingredients-by-id.module.css";

export const IngredientsDetailsPage = () => (
  <>
    <AppHeader />
    <div className={`${ingredientStyles.contentBox}`}>
      <IngredientDetailsWithParams />
    </div>
  </>
);