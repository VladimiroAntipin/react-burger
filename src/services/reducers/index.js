import { combineReducers } from "redux";
import { burgerConstructorReducer } from "./burgerConstructor";
import { ingredientDetailsReducer } from "./ingredientDetails";
import { ingredientsReducer } from "./ingredients";
import { orderReducer } from "./orderObject";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorIngredients: burgerConstructorReducer,
  ingredientDetails: ingredientDetailsReducer,
  orderObject: orderReducer,
});
