import { useParams } from "react-router-dom";
import AppHeader from "../../components/AppHeader/AppHeader";
import { IngredientsDetails } from "../../components/IngredientsDetails/IngredientsDetails";
import ingredientStyles from "./ingredients-by-id.module.css";

export function IngredientsDetailsPage() {
  return (
    <>
      <AppHeader />
      <div className={`${ingredientStyles.contentBox}`}>
        <IngredientsDetails ingredientId={useParams().id} />
      </div>
    </>
  );
}