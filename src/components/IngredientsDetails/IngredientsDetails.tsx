import { useIngredientById } from "../../hooks/useIngredients";
import ingredientsDetailsStyle from "./IngredientsDetails.module.css";

export const IngredientsDetails = ({ ingredientId }: { ingredientId: string }) => {
  const ingredient = useIngredientById(ingredientId);

  if (!ingredient) return null;
  return (
    <>
      <div className={ingredientsDetailsStyle.modal__titleContainer}>
        <p className="text text_type_main-large">Детали ингредиента</p>
      </div>
      <img
        src={ingredient.image}
        alt={ingredient.name}
        className={ingredientsDetailsStyle.modal__ingredientsImg}
      />
      <p className="text text_type_main-medium mt-4 mb-8">{ingredient.name}</p>

      <div className={ingredientsDetailsStyle.modal__ingredientsInfoContainer}>
        <div className={ingredientsDetailsStyle.modal__ingredientsInfo}>
          <p className="text text_type_main-default text_color_inactive">
            Калории,ккал
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.calories}
          </p>
        </div>

        <div className={ingredientsDetailsStyle.modal__ingredientsInfo}>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.proteins}
          </p>
        </div>

        <div className={ingredientsDetailsStyle.modal__ingredientsInfo}>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.fat}
          </p>
        </div>

        <div className={ingredientsDetailsStyle.modal__ingredientsInfo}>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.carbohydrates}
          </p>
        </div>
      </div>
    </>
  );
};