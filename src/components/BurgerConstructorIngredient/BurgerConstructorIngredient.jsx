import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { atom } from "jotai";
import { useAtom } from "jotai/react";
import { number } from "prop-types";
import { useLayoutEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useIngredientById } from "../../hooks/useIngredients";
import { useSelectedMidIngredientByIndex } from "../../hooks/useSelectedIngredients";
import { mergeRefs } from "../../utils/mergeRefs";
import { ingredientToConstructorElementProps } from "../BurgerConstructor/BurgerConstructor";
import burgerConstructorStyle from "../BurgerConstructor/BurgerConstructor.module.css";
import { CONSTRUCTOR_MOVE_INGREDIENT, CONSTRUCTOR_DELETE_INGREDIENT } from "../../services/actions/burgerConstructor";
import { ingredientPropTypes } from "../../utils/types";



const overIndexAtom = atom(null);
const countOfOverItems = atom(0);

export function BurgerConstructorIngredient({ index, ingredient }) {
  const dispatch = useAppDispatch();

  const [{ isDragging }, dragRef] = useDrag({
    type: "MOVED_INGREDIENT",
    item: { index },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
      };
    },
  });

  const [overIndex, setOverIndex] = useAtom(overIndexAtom);
  const [countOfOver, setCountOfOver] = useAtom(countOfOverItems);

  const [{ isOver }, dropRef] = useDrop({
    accept: "MOVED_INGREDIENT",
    collect: (monitor) => ({ isOver: monitor.isOver() }),
    drop: (item) => {
      dispatch({
        type: CONSTRUCTOR_MOVE_INGREDIENT,
        payload: [index, item.index],
      });
    },
  });

  useLayoutEffect(() => {
    if (!isOver) {
      return;
    }
    setCountOfOver((count) => count + 1);
    return () => setCountOfOver((count) => count - 1);
  }, [isOver, setCountOfOver]);
  const overIngredient = useIngredientById(
    useSelectedMidIngredientByIndex(countOfOver === 0 ? null : overIndex)
  );

  useLayoutEffect(() => {
    if (isOver && overIndex !== index) {
      setOverIndex(index);
    }
  }, [index, isOver, overIndex, setOverIndex]);
  return (
    <li
      ref={mergeRefs(dragRef, dropRef)}
      style={
        isOver || (isDragging && !overIngredient) ? { opacity: 0 } : void 0
      }
      className={burgerConstructorStyle.cart__listItem}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        handleClose={() =>
          dispatch({
            type: CONSTRUCTOR_DELETE_INGREDIENT,
            payload: { index },
          })
        }
        {...ingredientToConstructorElementProps(
          isDragging && overIngredient ? overIngredient : ingredient
        )}
      />
    </li>
  );
}

BurgerConstructorIngredient.propTypes = {
  index: number,
  ingredient: ingredientPropTypes.isRequired,
};
