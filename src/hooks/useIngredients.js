import { useMemo } from "react";
import { useAppSelector } from "./useAppSelector";

const EMPTY = [];

export const useIngredients = () =>
  useAppSelector((state) => state.ingredients.data?.data) ?? EMPTY;

export const useIngredientByType = (type) => {
  const ingredients = useIngredients();
  return useMemo(
    () => ingredients.filter((ingredient) => ingredient.type === type),
    [ingredients, type]
  );
};

export const useIngredientsMap = () => {
  const ingredients = useIngredients();
  return useMemo(() => ingredients.reduce(
    (acc, ingredient) => {
      return ((acc[ingredient._id] = ingredient), acc);
    },
    {}
  ),
    [ingredients]
  );
};

export const useIngredientById = (id) =>
  useAppSelector(
    (store) =>
      !!id && store.ingredients.data?.data?.find((item) => item._id === id)
  ) || null;
