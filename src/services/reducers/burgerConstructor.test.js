import { burgerConstructorReducer as reducer } from './burgerConstructor';
import * as action from "../actions/burgerConstructor";
import { initialState } from './burgerConstructor';


describe("burgerConstructor reducer", () => {
  it("has initial state", () => {
    expect(reducer(undefined, { type: "unexpected" })).toEqual(
      initialState
    );
  });

  it("can handle CONSTRUCTOR_ADD_INGREDIENT", () => {
    const ingredientId = "60d3b41abdacab0026a733c6";
    const type = "bun";

    expect(
      reducer(initialState, {
        type: action.CONSTRUCTOR_ADD_INGREDIENT,
        payload: { ingredientId, type },
      })
    ).toEqual({
      bun: ingredientId,
      mid: [],
    });
  });

  it("can handle CONSTRUCTOR_DELETE_INGREDIENT", () => {
    expect(() =>
      reducer(initialState, {
        type: action.CONSTRUCTOR_DELETE_INGREDIENT,
        payload: { index: 1 },
      })
    ).not.toThrow();
  });

  it("can handle CONSTRUCTOR_MOVE_INGREDIENT", () => {
    
    expect(
      reducer({ mid: [0, 1], bun: null }, {
        type: action.CONSTRUCTOR_MOVE_INGREDIENT,
        payload: [0, 1],
      })
    ).toEqual({ mid: [1, 0], bun: null });
  });


  it("can handle CONSTRUCTOR_RESET_INGREDIENT", () => {
    expect(
      reducer(initialState, {
        type: action.CONSTRUCTOR_RESET_INGREDIENT,
      })
    ).toEqual({
      bun: null,
      mid: [],
    });
  });
});
