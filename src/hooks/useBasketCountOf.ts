import { useAppSelector } from "./useAppSelector";

export const useBasketCountOf = (id: string) =>
  useAppSelector((store) => {
    const { constructorIngredients } = store;
    if (constructorIngredients.bun === id) {
      return 2;
    }

    return constructorIngredients.mid.reduce(
      (count: number, currentId: string) => (currentId === id ? count + 1 : count),
      0
    );
  });