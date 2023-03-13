import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { INGREDIENT_DETAILS_MODAL_CLOSE } from "../../services/actions/ingredientDetails";
import { reverse } from "../../utils/reverse";
import { IngredientType } from "../../utils/types";
import { BurgerIngredientGroup } from "../BurgerIngredientGroup/BurgerIngredientGroup";
import { IngredientDetails } from "../IngredientsDetails/IngredientsDetails";
import { Modal } from "../Modal/Modal";
import burgerIngredientsStyle from "./BurgerIngredients.module.css";

const INGREDIENT_GROUPS = ["bun", "sauce", "main"] as const;
const SCROLL_MARGIN = 50;

export function BurgerIngredients() {
  const ingredient = useAppSelector((store) => store.ingredientDetails.data);

  const dispatch = useAppDispatch();

  const closeIngredientDetails = () => {
    dispatch({ type: INGREDIENT_DETAILS_MODAL_CLOSE });
  };

  const [current, setCurrent] = useState("bun");
  const parentRef = useRef<HTMLDivElement>(null);
  const groupRefs = {
    bun: useRef<HTMLDivElement>(null),
    main: useRef<HTMLDivElement>(null),
    sauce: useRef<HTMLDivElement>(null),
  } as const;

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
  const scrollToCurrent = (newCurrent: string) =>
    groupRefs[newCurrent as IngredientType]?.current?.scrollIntoView({
      behavior: "smooth",
    });

  return (
    <section className={burgerIngredientsStyle.ingredients}>
      <h1
        className={`${burgerIngredientsStyle.ingredients__title} text text_type_main-large mt-10 mb-5`}
      >
        Соберите бургер
      </h1>
      <div className={burgerIngredientsStyle.ingredients__tab}>
        <Tab value="bun" active={current === "bun"} onClick={scrollToCurrent}>
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={current === "sauce"}
          onClick={scrollToCurrent}
        >
          Соусы
        </Tab>
        <Tab value="main" active={current === "main"} onClick={scrollToCurrent}>
          Начинки
        </Tab>
      </div>

      <div
        ref={parentRef}
        className={burgerIngredientsStyle.ingredients__ingredientsContainer}
      >
        {INGREDIENT_GROUPS.map((groupName) => (
          <BurgerIngredientGroup
            key={groupName}
            ref={groupRefs[groupName]}
            ingredientType={groupName}
          />
        ))}
      </div>

      {ingredient && (
        <Modal onClose={closeIngredientDetails}>
          <IngredientDetails ingredientId={ingredient._id} />
        </Modal>
      )}
    </section>
  );
}