import { useMemo } from "react";
import { IngredientType } from "../utils/types";
import { useAppSelector } from "./useAppSelector";
import { Ingredient } from "../utils/types";

const EMPTY = [] as const;

export const useIngredients = () =>
  useAppSelector((state) => state.ingredients.data?.data) ?? EMPTY;

export const useIngredientByType = (type: IngredientType) => {
  const ingredients = useIngredients();
  return useMemo(
    () => ingredients.filter((ingredient) => ingredient.type === type),
    [ingredients, type]
  );
};

export const useIngredientsMap = () => {
  const ingredients = useIngredients();
  return useMemo(
    () =>
      ingredients.reduce(
        (acc, ingredient) => ((acc[ingredient._id] = ingredient), acc),
        {} as Record<string, Ingredient>
      ),
    [ingredients]
  );
};

export const useIngredientById = (id: string | null) =>
  useAppSelector(
    (store) =>
      !!id && store.ingredients.data?.data?.find((item) => item._id === id)
  ) || null;
