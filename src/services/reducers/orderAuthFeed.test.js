import { orderAuthFeedReducer as reducer } from "./orderAuthFeed";
import * as action from '../actions/wsAuthActions';
import { initialState } from "./orderAuthFeed";

describe('orderAuth reducer', () => {

    it('has initial state', () => {
        expect(reducer(initialState, { type: 'unexpected' })).toEqual(
            initialState
        );
    });

    it('can handle ws connect', () => {
        expect(reducer(initialState, {
            type: 'orderHistory/connect'
        })).toEqual({
            ...initialState,
            wsError: null,
            wsConnected: true,
        });
    });

    it('can handle ws error', () => {
        expect(reducer(initialState, {
            type: 'orderHistory/error'
        })).toEqual({
            ...initialState,
            wsError: true,
            wsConnected: false,
        });
    });

    it('can handle ws close', () => {
        expect(reducer(initialState, {
            type: 'orderHistory/close'
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
            type: 'orderHistory/update',
            payload: orderFeedData
        })).toEqual({
            ...initialState,
            orderFeedData,
            wsError: null,
            isPageLoading: false,
        });
    });
});