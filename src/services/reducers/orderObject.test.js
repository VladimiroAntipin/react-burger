import { orderReducer as reducer } from "./orderObject";
import * as action from '../actions/orderObject'

const INITIAL_STATE = {
    data: null,
    isLoading: false,
    error: null,
};

describe('orderObject reducer', () => {

    it('has initial state', () => {
        expect(reducer(undefined, { type: 'unexpected' })).toEqual(
            INITIAL_STATE
        );
    });

    it('can handle SEND_ORDER_IS_LOADING', () => {
        expect(reducer(INITIAL_STATE, {
            type: action.SEND_ORDER_IS_LOADING
        })).toEqual({
            ...INITIAL_STATE,
            isLoading: true,
            error: null,
        });
    });

    it('can handle SEND_ORDER_SUCCESS', () => {
        const data = {}
        expect(reducer(INITIAL_STATE, {
            type: action.SEND_ORDER_SUCCESS,
            payload: data
        })).toEqual({
            ...INITIAL_STATE,
            data,
            isLoading: false,
            error: null,
        });
    });

    it('can handle SEND_ORDER_FAILED', () => {
        const error = ""
        expect(reducer(INITIAL_STATE, {
            type: action.SEND_ORDER_FAILED,
            payload: error
        })).toEqual({
            ...INITIAL_STATE,
            isLoading: false,
            error
        });
    });

    it("can handle CLEAR_ORDER", () => {
        expect(
          reducer(INITIAL_STATE, {
            type: action.CLEAR_ORDER,
          })
        ).toEqual({
            data: null,
            isLoading: false,
            error: null,
        });
      });
});