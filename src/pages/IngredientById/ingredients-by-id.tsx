import { useParams } from "react-router-dom";
import AppHeader from "../../components/AppHeader/AppHeader";
import { IngredientsDetails } from "../../components/IngredientsDetails/IngredientsDetails";
import ingredientStyles from "./ingredients-by-id.module.css";

export const IngredientsDetailsPage = () => (
  <>
    <AppHeader />
    <div className={`${ingredientStyles.contentBox}`}>
      <IngredientsDetails ingredientId={useParams().id as string} />
    </div>
  </>
);