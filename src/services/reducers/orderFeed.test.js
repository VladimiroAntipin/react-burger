import { orderFeedReducer as reducer } from "./orderFeed";
import * as action from '../actions/wsActions'

const INITIAL_STATE = {
    wsConnected: false,
    wsError: null,
    orderFeedData: null,
    isPageLoading: true,
};

describe('orderFeed reducer', () => {

    it('has initial state', () => {
        expect(reducer(undefined, { type: 'unexpected' })).toEqual(
            INITIAL_STATE
        );
    });

    it('can handle WS_CONNECTION_START', () => {
        expect(reducer(INITIAL_STATE, {
            type: action.WS_CONNECTION_START
        })).toEqual({
            ...INITIAL_STATE,
            isPageLoading: true,
        });
    });

    it('can handle WS_CONNECTION_SUCCESS', () => {
        expect(reducer(INITIAL_STATE, {
            type: action.WS_CONNECTION_SUCCESS
        })).toEqual({
            ...INITIAL_STATE,
            wsError: null,
            wsConnected: true,
        });
    });

    it('can handle WS_CONNECTION_ERROR', () => {
        expect(reducer(INITIAL_STATE, {
            type: action.WS_CONNECTION_ERROR
        })).toEqual({
            ...INITIAL_STATE,
            wsError: true,
            wsConnected: false,
        });
    });

    it('can handle WS_CONNECTION_CLOSED', () => {
        expect(reducer(INITIAL_STATE, {
            type: action.WS_CONNECTION_CLOSED
        })).toEqual({
            ...INITIAL_STATE,
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
        expect(reducer(INITIAL_STATE, {
            type: action.WS_GET_MESSAGE,
            payload: orderFeedData
        })).toEqual({
            ...INITIAL_STATE,
            orderFeedData,
            wsError: null,
            isPageLoading: false,
        });
    });
});