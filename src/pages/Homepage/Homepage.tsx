import AppHeader from "../../components/AppHeader/AppHeader";
import { useNavigate, useParams } from "react-router-dom";
import appStyle from "../../components/App/App.module.css";
import { BurgerConstructor } from "../../components/BurgerConstructor/BurgerConstructor";
import { BurgerIngredients } from "../../components/BurgerIngredients/BurgerIngredients";
import { IngredientsDetails } from "../../components/IngredientsDetails/IngredientsDetails";
import { Modal } from "../../components/Modal/Modal";

export const HomePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className={appStyle.App}>
      <AppHeader />
      <main className={appStyle.Main}>
        <BurgerIngredients />
        <BurgerConstructor />
        {!!id && (
          <Modal onClose={() => navigate("/")}>
            <IngredientsDetails ingredientId={id} />
          </Modal>
        )}
      </main>
    </div>
  );
};
