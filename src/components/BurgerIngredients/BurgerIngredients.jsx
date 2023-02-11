import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { any, array, bool, func, string } from "prop-types";
import { useEffect, useRef, useState } from "react";
import { reverse } from "../../utils/reverse";
import { BurgerIngredientGroup } from "../BurgerIngredientGroup/BurgerIngredientGroup";
import burgerIngredientsStyle from "./BurgerIngredients.module.css";

const INGREDIENT_GROUPS = ["bun", "sauce", "main"];
const SCROLL_MARGIN = 50;

export function BurgerIngredients() {
  const [current, setCurrent] = useState("bun");
  const parentRef = useRef(null);
  const groupRefs = {
    bun: useRef(null),
    main: useRef(null),
    sauce: useRef(null),
  };
  const groupRefsRef = useRef(groupRefs);
  groupRefsRef.current = groupRefs;
  useEffect(() => {
    if (!parentRef.current) return;
    const ingredientGroups = INGREDIENT_GROUPS.map((groupName) => ({
      groupName,
      element: groupRefsRef.current[groupName].current,
    }));
    const intersectionObserver = new IntersectionObserver(
      () => {
        const parentRect = parentRef.current?.getBoundingClientRect();
        if (!parentRect) return;
        const currentGroup = reverse(
          ingredientGroups
            .map((item) => ({
              clientRect: item.element?.getBoundingClientRect(),
              groupName: item.groupName,
            }))
            .map(({ clientRect, ...item }) => ({
              ...item,
              y: parentRect.y - (clientRect?.y ?? 0),
            }))
        ).find((group) => group.y >= -SCROLL_MARGIN);
        if (!currentGroup) return;
        setCurrent(currentGroup.groupName);
      },
      {
        root: parentRef.current,
        threshold: [0.01, 0.1, 0.2, 0.4, 0.8, 1],
      }
    );
    ingredientGroups.forEach(({ element }) => {
      if (!element) return;
      intersectionObserver.observe(element);
    });
    return () => intersectionObserver.disconnect();
  }, []);
  const scrollToCurrent = (newCurrent) =>
    groupRefs[newCurrent]?.current?.scrollIntoView({
      behavior: "smooth",
    });
    
  return (
    <section className={burgerIngredientsStyle.ingredients}>
      <h1 className={`${burgerIngredientsStyle.ingredients__title} text text_type_main-large mt-10 mb-5`}>Соберите бургер</h1>
      <div className={burgerIngredientsStyle.ingredients__tab}>
        <Tab value="bun" active={current === "bun"} onClick={scrollToCurrent}>Булки</Tab>
        <Tab value="sauce" active={current === "sauce"} onClick={scrollToCurrent}>Соусы</Tab>
        <Tab value="main" active={current === "main"} onClick={scrollToCurrent}>Начинки</Tab>
      </div>

      <div ref={parentRef} className={burgerIngredientsStyle.ingredients__ingredientsContainer}>
        {INGREDIENT_GROUPS.map((groupName) => (
          <BurgerIngredientGroup
            key={groupName}
            ref={groupRefs[groupName]}
            ingredientType={groupName} />
        ))}
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  onClick: func,
  value: string,
  active: bool,
  ingredientsList: array,
  title: string,
  className: string,
};
