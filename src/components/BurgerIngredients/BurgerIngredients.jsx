import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { useGroupedIngredients } from "../../hooks/useFilteredIngredient";
import { BurgerIngredientGroup } from "../BurgerIngredientGroup/BurgerIngredientGroup";
import burgerIngredientsStyle from "./BurgerIngredients.module.css";

function BurgerIngredients({ ingredients }) {
  const { buns, mains, sauces } = useGroupedIngredients(ingredients);
  const [current, setCurrent] = React.useState("bun");

  return (
    <section className={burgerIngredientsStyle.ingredients}>
      <h1
        className={`${burgerIngredientsStyle.ingredients__title} text text_type_main-large mt-10 mb-5`}
      >
        Соберите бургер
      </h1>
      <div className={burgerIngredientsStyle.ingredients__tab}>
        <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === "main"} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>

      <div className={burgerIngredientsStyle.ingredients__ingredientsContainer}>
        <BurgerIngredientGroup ingredientsList={buns} title="Булки" />
        <BurgerIngredientGroup ingredientsList={sauces} title="Соусы" />
        <BurgerIngredientGroup ingredientsList={mains} title="Начинки" />
      </div>
    </section>
  );
}

export default BurgerIngredients;