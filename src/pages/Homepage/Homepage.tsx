import appStyle from "../../components/App/App.module.css";
import AppHeader from "../../components/AppHeader/AppHeader";
import { BurgerConstructor } from "../../components/BurgerConstructor/BurgerConstructor";
import { BurgerIngredients } from "../../components/BurgerIngredients/BurgerIngredients";

export const HomePage = () => (
  <div className={appStyle.App}>
    <AppHeader />
    <main className={appStyle.Main}>
      <BurgerIngredients />
      <BurgerConstructor />
    </main>
  </div>
);
