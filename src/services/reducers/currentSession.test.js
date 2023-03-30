import { currentSessionReducer as reducer } from "./currentSession";
import * as action from '../actions/currentSessionActions/index';
import { initialState } from "./currentSession";

describe('currentSession reducer', () => {

    it('has initial state', () => {
        expect(reducer(undefined, { type: 'unexpected' })).toEqual(
            initialState
        );
    });

    it("can handle TOKEN_CHECKED", () => {
        expect(reducer(initialState, {
            type: action.TOKEN_CHECKED,
        })
        ).toEqual({
            ...initialState,
            isCurrentUserChecked: true,
        });
    });

    // FORGOT_PASSWORD //

    it("can handle FORGOT_PASSWORD_REQUEST", () => {
        expect(reducer(initialState, {
            type: action.FORGOT_PASSWORD_REQUEST
        }))
            .toEqual({
                ...initialState,
                isUserResetPassword: true,
                isAccountLoading: true,
                isCurrentUserAuth: false,
            });
    });

    it("can handle FORGOT_PASSWORD_SUCCESS", () => {
        expect(reducer(initialState, {
            type: action.FORGOT_PASSWORD_SUCCESS
        }))
            .toEqual({
                ...initialState,
                isUserResetPassword: true,
                isAccountLoading: false,
                isCurrentUserAuth: false,
            });
    });

    it("can handle FORGOT_PASSWORD_FAILED", () => {
        expect(reducer(initialState, {
            type: action.FORGOT_PASSWORD_FAILED
        }))
            .toEqual({
                ...initialState,
                isAccountLoading: false,
                isCurrentUserAuth: false,
            });
    });

    // GET CURRENT USER //

    it("can handle GET_CURRENT_USER_REQUEST", () => {
        expect(reducer(initialState, {
            type: action.GET_CURRENT_USER_REQUEST
        }))
            .toEqual({
                ...initialState,
                currentUserRequest: true,
                currentUserSuccess: false,
                currentUserFailed: false,
                isCurrentUserAuth: false,
            });
    });

    it("can handle GET_CURRENT_USER_SUCCESS", () => {
        const currentUser = {
            email: "",
            name: '',
        }
        expect(reducer(initialState, {
            type: action.GET_CURRENT_USER_SUCCESS,
            payload: currentUser
        }))
            .toEqual({
                ...initialState,
                currentUser,
                currentUserSuccess: true,
                isCurrentUserAuth: true
            });
    });

    it("can handle GET_CURRENT_USER_FAILED", () => {
        expect(reducer(initialState, {
            type: action.GET_CURRENT_USER_FAILED,
        }))
            .toEqual({
                ...initialState,
                currentUserRequest: false,
                currentUserSuccess: false,
                currentUserFailed: true,
                isCurrentUserAuth: false,
                currentUser: null,
            });
    });

    // LOGIN //

    it("can handle LOGIN_USER_REQUEST", () => {
        expect(reducer(initialState, {
            type: action.LOGIN_USER_REQUEST,
        }))
            .toEqual({
                ...initialState,
                loginRequest: true,
                loginFailed: false,
                loginSuccess: false,
                isCurrentUserAuth: false,
            });
    });

    it("can handle LOGIN_USER_SUCCESS", () => {
        const currentUser = {
            email: "",
            password: '',
        }
        expect(reducer(initialState, {
            type: action.LOGIN_USER_SUCCESS,
            payload: currentUser
        }))
            .toEqual({
                ...initialState,
                currentUser,
                loginRequest: false,
                loginFailed: false,
                loginSuccess: true,
                isCurrentUserAuth: true
            });
    });

    it("can handle LOGIN_USER_FAILED", () => {
        expect(reducer(initialState, {
            type: action.LOGIN_USER_FAILED,
        }))
            .toEqual({
                ...initialState,
                loginRequest: false,
                loginSuccess: false,
                loginFailed: true,
                isCurrentUserAuth: false,
            });
    });

    // LOGOUT //

    it("can handle LOGOUT_USER_SUCCESS", () => {
        expect(reducer(initialState, {
            type: action.LOGOUT_USER_SUCCESS,
        }))
            .toEqual({
                ...initialState,
                currentUser: null,
                isCurrentUserAuth: false,
            });
    });

    // RECOVER PASSWORD //

    it("can handle RECOVER_PASSWORD_REQUEST", () => {
        expect(reducer(initialState, {
            type: action.RECOVER_PASSWORD_REQUEST,
        }))
            .toEqual({
                ...initialState,
                isUserResetPassword: false,
                isCurrentUserAuth: false,
            });
    });

    it("can handle RECOVER_PASSWORD_SUCCESS", () => {
        expect(reducer(initialState, {
            type: action.RECOVER_PASSWORD_SUCCESS,
        }))
            .toEqual({
                ...initialState,
                isUserResetPassword: true,
                isCurrentUserAuth: false,
            });
    });

    it("can handle RECOVER_PASSWORD_FAILED", () => {
        expect(reducer(initialState, {
            type: action.RECOVER_PASSWORD_FAILED,
        }))
            .toEqual({
                ...initialState,
                isUserResetPassword: false,
                isCurrentUserAuth: false,
            });
    });

    // REGISTER USER //

    it("can handle REGISTER_USER_REQUEST", () => {
        expect(reducer(initialState, {
            type: action.REGISTER_USER_REQUEST,
        }))
            .toEqual({
                ...initialState,
                registerRequest: true,
                registerFailed: false,
                registerSuccess: false,
                isCurrentUserAuth: false,
            });
    });

    it("can handle REGISTER_USER_SUCCESS", () => {
        expect(reducer(initialState, {
            type: action.REGISTER_USER_SUCCESS,
        }))
            .toEqual({
                ...initialState,
                registerRequest: false,
                registerFailed: false,
                registerSuccess: true,
                isCurrentUserAuth: false,
            });
    });

    it("can handle REGISTER_USER_FAILED", () => {
        expect(reducer(initialState, {
            type: action.REGISTER_USER_FAILED,
        }))
            .toEqual({
                ...initialState,
                registerRequest: false,
                registerFailed: true,
                registerSuccess: false,
                isCurrentUserAuth: false,
            });
    });

    // EDIT PROFILE //

    it("can handle EDIT_PROFILE_REQUEST", () => {
        expect(reducer(initialState, {
            type: action.EDIT_PROFILE_REQUEST,
        }))
            .toEqual({
                ...initialState,
                editProfileRequest: true,
                editProfileFailed: false,
                editProfileSuccess: false,
                isCurrentUserAuth: true,
            });
    });

    it("can handle EDIT_PROFILE_SUCCESS", () => {
        const currentUser = {
            email: "",
            name: '',
        }
        expect(reducer(initialState, {
            type: action.EDIT_PROFILE_SUCCESS,
            payload: currentUser
        }))
            .toEqual({
                ...initialState,
                editProfileRequest: false,
                editProfileFailed: false,
                editProfileSuccess: true,
                currentUser,
                isCurrentUserAuth: true,
            });
    });

    it("can handle EDIT_PROFILE_FAILED", () => {
        expect(reducer(initialState, {
            type: action.EDIT_PROFILE_FAILED,
        }))
            .toEqual({
                ...initialState,
                editProfileRequest: false,
                editProfileFailed: true,
                editProfileSuccess: false,
                isCurrentUserAuth: false,
            });
    });
});