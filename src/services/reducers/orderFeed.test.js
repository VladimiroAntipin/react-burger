import { orderFeedReducer as reducer } from "./orderFeed";
import * as action from '../actions/wsActions';
import { initialState } from "./orderFeed";

describe('orderFeed reducer', () => {

    it('has initial state', () => {
        expect(reducer(undefined, { type: 'unexpected' })).toEqual(
            initialState
        );
    });

    it('can handle WS_CONNECTION_START', () => {
        expect(reducer(initialState, {
            type: action.WS_CONNECTION_START
        })).toEqual({
            ...initialState,
            isPageLoading: true,
        });
    });

    it('can handle WS_CONNECTION_SUCCESS', () => {
        expect(reducer(initialState, {
            type: action.WS_CONNECTION_SUCCESS
        })).toEqual({
            ...initialState,
            wsError: null,
            wsConnected: true,
        });
    });

    it('can handle WS_CONNECTION_ERROR', () => {
        expect(reducer(initialState, {
            type: action.WS_CONNECTION_ERROR
        })).toEqual({
            ...initialState,
            wsError: true,
            wsConnected: false,
        });
    });

    it('can handle WS_CONNECTION_CLOSED', () => {
        expect(reducer(initialState, {
            type: action.WS_CONNECTION_CLOSED
        })).toEqual({
            ...initialState,
            wsError: null,
            wsConnected: false,
        });
    });

    it('can handle WS_GET_MESSAGE', () => {
        const orderFeedData = {
            orders: [],
            total: 10,
            totalToday: 100
        }
        expect(reducer(initialState, {
            type: action.WS_GET_MESSAGE,
            payload: orderFeedData
        })).toEqual({
            ...initialState,
            orderFeedData,
            wsError: null,
            isPageLoading: false,
        });
    });
});