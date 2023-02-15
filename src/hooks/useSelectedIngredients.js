import { useMemo } from "react";
import { sum } from "../utils/sum";
import { useAppSelector } from "./useAppSelector";
import { useIngredientsMap } from "./useIngredients";

export const useSelectedIngredientsIds = () => {
  const store = useAppSelector((store) => store.constructorIngredients);
  return useMemo(() => [store.bun, ...store.mid].filter(isNotFalsy), [store.bun, store.mid]);
};

export const useSelectedIngredients = () => {
  const ingredientsMap = useIngredientsMap();
  const selectedIngredients = useAppSelector(
    (state) => state.constructorIngredients
  );
  return useMemo(() => {
    const bunData = selectedIngredients.bun
      ? ingredientsMap[selectedIngredients.bun]
      : null;
    const idToCountMap = {};
    return {
      bun: bunData && { ...bunData, key: bunData._id },
      mid: selectedIngredients.mid.map((ingredientId) => {
        idToCountMap[ingredientId] = (idToCountMap[ingredientId] ?? 0) + 1;
        const ingredientCount = idToCountMap[ingredientId];
        const ingredientData = ingredientsMap[ingredientId];
        return {
          ...ingredientData,
          key: `${ingredientData._id}${ingredientCount}`,
        };
      }),
    };
  }, [ingredientsMap, selectedIngredients.bun, selectedIngredients.mid]);
};

const extractPrice = (ingredient) => ingredient.price;
const isNotFalsy = (item) => !!item;

export const useSelectedIngredientsPrice = () => {
  const selectedIngredients = useSelectedIngredients();
  return useMemo(
    () =>
      sum(
        ...[
          selectedIngredients.bun,
          selectedIngredients.bun,
          ...selectedIngredients.mid,
        ]
          .filter(isNotFalsy)
          .map(extractPrice)
      ),
    [selectedIngredients.bun, selectedIngredients.mid]
  );
};

export const useSelectedMidIngredientByIndex = (index) =>
  useAppSelector((store) =>
    typeof index === "number" ? store.constructorIngredients.mid[index] : null
  );
