import { orderReducer as reducer } from "./orderObject";
import * as action from '../actions/orderObject';
import { initialState } from "./orderObject";

describe('orderObject reducer', () => {

    it('has initial state', () => {
        expect(reducer(undefined, { type: 'unexpected' })).toEqual(
            initialState
        );
    });

    it('can handle SEND_ORDER_IS_LOADING', () => {
        expect(reducer(initialState, {
            type: action.SEND_ORDER_IS_LOADING
        })).toEqual({
            ...initialState,
            isLoading: true,
            error: null,
        });
    });

    it('can handle SEND_ORDER_SUCCESS', () => {
        const data = {}
        expect(reducer(initialState, {
            type: action.SEND_ORDER_SUCCESS,
            payload: data
        })).toEqual({
            ...initialState,
            data,
            isLoading: false,
            error: null,
        });
    });

    it('can handle SEND_ORDER_FAILED', () => {
        const error = ""
        expect(reducer(initialState, {
            type: action.SEND_ORDER_FAILED,
            payload: error
        })).toEqual({
            ...initialState,
            isLoading: false,
            error
        });
    });

    it("can handle CLEAR_ORDER", () => {
        expect(
          reducer(initialState, {
            type: action.CLEAR_ORDER,
          })
        ).toEqual({
            data: null,
            isLoading: false,
            error: null,
        });
      });
});