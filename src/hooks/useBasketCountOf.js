import { useAppSelector } from "./useAppSelector";

export const useBasketCountOf = (id) =>
  useAppSelector((store) => {
    const { constructorIngredients } = store;
    if (constructorIngredients.bun === id) {
      return 2;
    }

    return constructorIngredients.mid.reduce(
      (count, currentId) => (currentId === id ? count + 1 : count),
      0
    );
  });