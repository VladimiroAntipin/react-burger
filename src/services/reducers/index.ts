import { combineReducers } from "redux";
import { burgerConstructorReducer } from "./burgerConstructor";
import { ingredientDetailsReducer } from "./ingredientDetails";
import { ingredientsReducer } from "./ingredients";
import { orderReducer } from "./orderObject";
import { currentSessionReducer } from "./currentSession";
import { orderAuthFeedReducer } from "./orderAuthFeed";
import { orderFeedReducer } from "./orderFeed";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorIngredients: burgerConstructorReducer,
  ingredientDetails: ingredientDetailsReducer,
  orderObject: orderReducer,
  currentSession: currentSessionReducer,
  orderAuthFeed: orderAuthFeedReducer,
  orderFeed: orderFeedReducer,
});
