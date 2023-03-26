import { ingredientDetailsReducer as reducer } from "./ingredientDetails";
import * as action from '../actions/ingredientDetails';

const INITIAL_STATE = {
    data: null
};

describe('ingredientDetails reducer', () => {


    it('has initial state', () => {
        expect(reducer(undefined, { type: 'unexpected' })).toEqual(
            INITIAL_STATE
        );
    });

    it('can handle INGREDIENT_DETAILS_MODAL_CLOSE', () => {
        expect(reducer(INITIAL_STATE, { 
            type: action.INGREDIENT_DETAILS_MODAL_CLOSE
        })).toEqual({
            data: null,
        });
    });

    it('can handle INGREDIENT_DETAILS_MODAL_OPEN', () => {
        const data = {}
        expect(reducer(INITIAL_STATE, {
            type: action.INGREDIENT_DETAILS_MODAL_OPEN,
            payload: data
        })).toEqual({
            data
        });
    });
});