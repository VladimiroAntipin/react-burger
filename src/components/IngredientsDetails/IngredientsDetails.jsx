import { func, number, string } from "prop-types";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { Modal } from "../Modal/Modal";
import ingredientsDetailsStyle from "./IngredientsDetails.module.css";
import { INGREDIENT_DETAILS_MODAL_CLOSE } from "../../services/actions/ingredientDetails";

export const IngredientsDetails = () => {
  const { status, data: ingredient } = useAppSelector(
    (store) => store.ingredientDetails
  );

  const dispatch = useAppDispatch();
  if (status === "CLOSED") return null;

  return (
    <Modal onClose={() => dispatch({ type: INGREDIENT_DETAILS_MODAL_CLOSE })}>
      <div className={ingredientsDetailsStyle.modal__titleContainer}>
        <p className="text text_type_main-large">Детали ингредиента</p>
      </div>
      <img src={ingredient.image} alt={ingredient.name} className={ingredientsDetailsStyle.modal__ingredientsImg} />
      <p className="text text_type_main-medium mt-4 mb-8">{ingredient.name}</p>

      <div className={ingredientsDetailsStyle.modal__ingredientsInfoContainer}>
        <div className={ingredientsDetailsStyle.modal__ingredientsInfo}>
          <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.calories}</p>
        </div>

        <div className={ingredientsDetailsStyle.modal__ingredientsInfo}>
          <p className="text text_type_main-default text_color_inactive">Белки, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.proteins}</p>
        </div>

        <div className={ingredientsDetailsStyle.modal__ingredientsInfo}>
          <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.fat}</p>
        </div>

        <div className={ingredientsDetailsStyle.modal__ingredientsInfo}>
          <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.carbohydrates}</p>
        </div>
      </div>
    </Modal>
  );
};

IngredientsDetails.propTypes = {
  onClose: func,
  proteins: number,
  fat: number,
  calories: number,
  carbohydrates: number,
  image: string,
  name: string,
  className: string,
  type: string,
  src: string,
  alt: string,
};
