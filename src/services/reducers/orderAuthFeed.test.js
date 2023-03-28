import { orderAuthFeedReducer as reducer } from "./orderAuthFeed";
import * as action from '../actions/wsAuthActions';
import { initialState } from "./orderAuthFeed";

describe('orderAuth reducer', () => {

    it('has initial state', () => {
        expect(reducer(initialState, { type: 'unexpected' })).toEqual(
            initialState
        );
    });

    it('can handle WS_AUTH_CONNECTION_START', () => {
        expect(reducer(initialState, {
            type: action.WS_AUTH_CONNECTION_START
        })).toEqual({
            ...initialState,
            isPageLoading: true,
        });
    });

    it('can handle WS_AUTH_CONNECTION_SUCCESS', () => {
        expect(reducer(initialState, {
            type: action.WS_AUTH_CONNECTION_SUCCESS
        })).toEqual({
            ...initialState,
            wsError: null,
            wsConnected: true,
        });
    });

    it('can handle WS_AUTH_CONNECTION_ERROR', () => {
        expect(reducer(initialState, {
            type: action.WS_AUTH_CONNECTION_ERROR
        })).toEqual({
            ...initialState,
            wsError: true,
            wsConnected: false,
        });
    });

    it('can handle WS_AUTH_CONNECTION_CLOSED', () => {
        expect(reducer(initialState, {
            type: action.WS_AUTH_CONNECTION_CLOSED
        })).toEqual({
            ...initialState,
            wsError: null,
            wsConnected: false,
        });
    });

    it('can handle WS_AUTH_GET_MESSAGE', () => {
        const orderFeedData = {
            orders: [],
            total: 10,
            totalToday: 100
        }
        expect(reducer(initialState, {
            type: action.WS_AUTH_GET_MESSAGE,
            payload: orderFeedData
        })).toEqual({
            ...initialState,
            orderFeedData,
            wsError: null,
            isPageLoading: false,
        });
    });
});