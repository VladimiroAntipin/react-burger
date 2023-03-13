import { useMemo } from "react";
import { Ingredient, IngredientType } from "../utils/types";

const useFilterIngredient = (ingredients: Ingredient[] , targetType: IngredientType) =>
  useMemo(
    () =>
      ingredients ? ingredients.filter(({ type }) => type === targetType) : [],
    [ingredients, targetType]
  );

export const useGroupedIngredients = (ingredients: Ingredient[]) => ({
  buns: useFilterIngredient(ingredients, "bun"),
  sauces: useFilterIngredient(ingredients, "sauce"),
  mains: useFilterIngredient(ingredients, "main"),
});