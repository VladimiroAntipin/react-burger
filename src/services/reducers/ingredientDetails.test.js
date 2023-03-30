import { ingredientDetailsReducer as reducer } from "./ingredientDetails";
import * as action from '../actions/ingredientDetails';
import { initialState } from "./ingredientDetails";

describe('ingredientDetails reducer', () => {


    it('has initial state', () => {
        expect(reducer(undefined, { type: 'unexpected' })).toEqual(
            initialState
        );
    });

    it('can handle INGREDIENT_DETAILS_MODAL_CLOSE', () => {
        expect(reducer(initialState, { 
            type: action.INGREDIENT_DETAILS_MODAL_CLOSE
        })).toEqual({
            data: null,
        });
    });

    it('can handle INGREDIENT_DETAILS_MODAL_OPEN', () => {
        const data = {}
        expect(reducer(initialState, {
            type: action.INGREDIENT_DETAILS_MODAL_OPEN,
            payload: data
        })).toEqual({
            data
        });
    });
});