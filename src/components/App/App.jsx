import "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import { BurgerConstructor } from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import { useFetch } from "../../hooks/useFetch";

const ingredientsUrl = "https://norma.nomoreparties.space/api/ingredients";

function App() {
  const { data } = useFetch(ingredientsUrl);
  const ingredients = data?.data;
  return (
    <div className="App">
      <AppHeader />
      <main
        style={{
          display: "flex",
          margin: "0 auto",
          maxWidth: "1280px",
          justifyContent: "center",
        }}
      >
        <BurgerIngredients ingredients={ingredients} />
        <BurgerConstructor selectedIngredients={ingredients ?? []} />
      </main>
    </div>
  );
}

export default App;