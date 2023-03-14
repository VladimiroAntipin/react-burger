import appStyle from "../../components/App/App.module.css";
import { BurgerConstructor } from "../../components/BurgerConstructor/BurgerConstructor";
import { BurgerIngredients } from "../../components/BurgerIngredients/BurgerIngredients";

export const HomePage = () => (
  <div className={appStyle.App}>
    <main className={appStyle.Main}>
      <BurgerIngredients />
      <BurgerConstructor />
    </main>
  </div>
);
