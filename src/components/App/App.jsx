import { element, string } from "prop-types";
import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { getIngredients } from "../../services/reducers/ingredients";
import AppHeader from "../AppHeader/AppHeader";
import { BurgerConstructor } from "../BurgerConstructor/BurgerConstructor";
import { BurgerIngredients } from "../BurgerIngredients/BurgerIngredients";
import appStyle from "./App.module.css";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={appStyle.App}>
      <AppHeader />
      <main className={appStyle.Main}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </div>
  );
}

App.propTypes = {
  className: string,
  AppHeader: element,
  BurgerIngredients: element,
  BurgerConstructor: element,
}

export default App;