import { useMemo } from "react";

const useFilterIngredient = (ingredients, targetType) =>
  useMemo(
    () =>
      ingredients ? ingredients.filter(({ type }) => type === targetType) : [],
    [ingredients, targetType]
  );

export const useGroupedIngredients = (ingredients) => ({
  buns: useFilterIngredient(ingredients, "bun"),
  sauces: useFilterIngredient(ingredients, "sauce"),
  mains: useFilterIngredient(ingredients, "main"),
});
