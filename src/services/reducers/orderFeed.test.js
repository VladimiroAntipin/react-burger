import { orderFeedReducer as reducer } from "./orderFeed";
import * as action from '../actions/wsActions';
import { initialState } from "./orderFeed";

describe('orderFeed reducer', () => {

    it('has initial state', () => {
        expect(reducer(undefined, { type: 'unexpected' })).toEqual(
            initialState
        );
    });

    it('can handle ws connect', () => {
        expect(reducer(initialState, {
            type: 'orderFeed/connect'
        })).toEqual({
            ...initialState,
            wsError: null,
            wsConnected: true,
        });
    });

    it('can handle ws error', () => {
        expect(reducer(initialState, {
            type: 'orderFeed/error'
        })).toEqual({
            ...initialState,
            wsError: true,
            wsConnected: false,
        });
    });

    it('can handle ws close', () => {
        expect(reducer(initialState, {
            type: 'orderFeed/close'
        })).toEqual({
            ...initialState,
            wsError: null,
            wsConnected: false,
        });
    });

    it('can handle ws update', () => {
        const orderFeedData = {
            orders: [],
            total: 10,
            totalToday: 100
        }
        expect(reducer(initialState, {
            type: 'orderFeed/update',
            payload: orderFeedData
        })).toEqual({
            ...initialState,
            orderFeedData,
            wsError: null,
            isPageLoading: false,
        });
    });
});