import { Modal } from "../Modal/Modal";
import ingredientsDetailsStyle from "./IngredientsDetails.module.css";
import { func, number, string } from "prop-types";

export const IngredientsDetails = ({
  onClose,
  proteins,
  fat,
  calories,
  carbohydrates,
  image,
  name
}) => (
  <Modal onClose={onClose}>
    <div className={ingredientsDetailsStyle.modal__titleContainer}>
      <p className="text text_type_main-large">Детали ингредиента</p>
    </div>
    <img
      src={image}
      alt="ingredient"
      style={{ width: "520px", height: "240px", objectFit: "contain" }}
    />
    <p className="text text_type_main-medium mt-4 mb-8">{name}</p>
    <div className={ingredientsDetailsStyle.modal__ingredientsInfoContainer}>
      <div className={ingredientsDetailsStyle.modal__ingredientsInfo}>
        <p className="text text_type_main-default text_color_inactive">
          Калории,ккал
        </p>
        <p className="text text_type_digits-default text_color_inactive">
          {calories}
        </p>
      </div>
      <div className={ingredientsDetailsStyle.modal__ingredientsInfo}>
        <p className="text text_type_main-default text_color_inactive">
          Белки, г
        </p>
        <p className="text text_type_digits-default text_color_inactive">
          {proteins}
        </p>
      </div>
      <div className={ingredientsDetailsStyle.modal__ingredientsInfo}>
        <p className="text text_type_main-default text_color_inactive">
          Жиры, г
        </p>
        <p className="text text_type_digits-default text_color_inactive">
          {fat}
        </p>
      </div>
      <div className={ingredientsDetailsStyle.modal__ingredientsInfo}>
        <p className="text text_type_main-default text_color_inactive">
          Углеводы, г
        </p>
        <p className="text text_type_digits-default text_color_inactive">
          {carbohydrates}
        </p>
      </div>
    </div>
  </Modal>
);

IngredientsDetails.propTypes = {
  onClose: func,
  proteins: number,
  fat: number,
  calories: number,
  carbohydrates: number,
  image: string,
  name: string,
}