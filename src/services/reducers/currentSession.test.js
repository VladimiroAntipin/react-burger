import { currentSessionReducer as reducer } from "./currentSession";
import * as action from '../actions/currentSessionActions/index'

const INITIAL_STATE = {
    currentUser: null,
    isCurrentUserAuth: false,
    isCurrentUserChecked: false,

    isAccountLoading: false,
    isUserResetPassword: false,

    currentUserRequest: false,
    currentUserFailed: false,
    currentUserSuccess: false,

    loginRequest: false,
    loginFailed: false,
    loginSuccess: false,

    registerRequest: false,
    registerFailed: false,
    registerSuccess: false,

    editProfileRequest: false,
    editProfileFailed: false,
    editProfileSuccess: false,
};

describe('currentSession reducer', () => {

    it('has initial state', () => {
        expect(reducer(undefined, { type: 'unexpected' })).toEqual(
            INITIAL_STATE
        );
    });

    it("can handle TOKEN_CHECKED", () => {
        expect(reducer(INITIAL_STATE, {
            type: action.TOKEN_CHECKED,
        })
        ).toEqual({
            ...INITIAL_STATE,
            isCurrentUserChecked: true,
        });
    });

    // FORGOT_PASSWORD //

    it("can handle FORGOT_PASSWORD_REQUEST", () => {
        expect(reducer(INITIAL_STATE, {
            type: action.FORGOT_PASSWORD_REQUEST
        }))
            .toEqual({
                ...INITIAL_STATE,
                isUserResetPassword: true,
                isAccountLoading: true,
                isCurrentUserAuth: false,
            });
    });

    it("can handle FORGOT_PASSWORD_SUCCESS", () => {
        expect(reducer(INITIAL_STATE, {
            type: action.FORGOT_PASSWORD_SUCCESS
        }))
            .toEqual({
                ...INITIAL_STATE,
                isUserResetPassword: true,
                isAccountLoading: false,
                isCurrentUserAuth: false,
            });
    });

    it("can handle FORGOT_PASSWORD_FAILED", () => {
        expect(reducer(INITIAL_STATE, {
            type: action.FORGOT_PASSWORD_FAILED
        }))
            .toEqual({
                ...INITIAL_STATE,
                isAccountLoading: false,
                isCurrentUserAuth: false,
            });
    });

    // GET CURRENT USER //

    it("can handle GET_CURRENT_USER_REQUEST", () => {
        expect(reducer(INITIAL_STATE, {
            type: action.GET_CURRENT_USER_REQUEST
        }))
            .toEqual({
                ...INITIAL_STATE,
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
        expect(reducer(INITIAL_STATE, {
            type: action.GET_CURRENT_USER_SUCCESS,
            payload: currentUser
        }))
            .toEqual({
                ...INITIAL_STATE,
                currentUser,
                currentUserSuccess: true,
                isCurrentUserAuth: true
            });
    });

    it("can handle GET_CURRENT_USER_FAILED", () => {
        expect(reducer(INITIAL_STATE, {
            type: action.GET_CURRENT_USER_FAILED,
        }))
            .toEqual({
                ...INITIAL_STATE,
                currentUserRequest: false,
                currentUserSuccess: false,
                currentUserFailed: true,
                isCurrentUserAuth: false,
                currentUser: null,
            });
    });

    // LOGIN //

    it("can handle LOGIN_USER_REQUEST", () => {
        expect(reducer(INITIAL_STATE, {
            type: action.LOGIN_USER_REQUEST,
        }))
            .toEqual({
                ...INITIAL_STATE,
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
        expect(reducer(INITIAL_STATE, {
            type: action.LOGIN_USER_SUCCESS,
            payload: currentUser
        }))
            .toEqual({
                ...INITIAL_STATE,
                currentUser,
                loginRequest: false,
                loginFailed: false,
                loginSuccess: true,
                isCurrentUserAuth: true
            });
    });

    it("can handle LOGIN_USER_FAILED", () => {
        expect(reducer(INITIAL_STATE, {
            type: action.LOGIN_USER_FAILED,
        }))
            .toEqual({
                ...INITIAL_STATE,
                loginRequest: false,
                loginSuccess: false,
                loginFailed: true,
                isCurrentUserAuth: false,
            });
    });

    // LOGOUT //

    it("can handle LOGOUT_USER_SUCCESS", () => {
        expect(reducer(INITIAL_STATE, {
            type: action.LOGOUT_USER_SUCCESS,
        }))
            .toEqual({
                ...INITIAL_STATE,
                currentUser: null,
                isCurrentUserAuth: false,
            });
    });

    // RECOVER PASSWORD //

    it("can handle RECOVER_PASSWORD_REQUEST", () => {
        expect(reducer(INITIAL_STATE, {
            type: action.RECOVER_PASSWORD_REQUEST,
        }))
            .toEqual({
                ...INITIAL_STATE,
                isUserResetPassword: false,
                isCurrentUserAuth: false,
            });
    });

    it("can handle RECOVER_PASSWORD_SUCCESS", () => {
        expect(reducer(INITIAL_STATE, {
            type: action.RECOVER_PASSWORD_SUCCESS,
        }))
            .toEqual({
                ...INITIAL_STATE,
                isUserResetPassword: true,
                isCurrentUserAuth: false,
            });
    });

    it("can handle RECOVER_PASSWORD_FAILED", () => {
        expect(reducer(INITIAL_STATE, {
            type: action.RECOVER_PASSWORD_FAILED,
        }))
            .toEqual({
                ...INITIAL_STATE,
                isUserResetPassword: false,
                isCurrentUserAuth: false,
            });
    });

    // REGISTER USER //

    it("can handle REGISTER_USER_REQUEST", () => {
        expect(reducer(INITIAL_STATE, {
            type: action.REGISTER_USER_REQUEST,
        }))
            .toEqual({
                ...INITIAL_STATE,
                registerRequest: true,
                registerFailed: false,
                registerSuccess: false,
                isCurrentUserAuth: false,
            });
    });

    it("can handle REGISTER_USER_SUCCESS", () => {
        expect(reducer(INITIAL_STATE, {
            type: action.REGISTER_USER_SUCCESS,
        }))
            .toEqual({
                ...INITIAL_STATE,
                registerRequest: false,
                registerFailed: false,
                registerSuccess: true,
                isCurrentUserAuth: false,
            });
    });

    it("can handle REGISTER_USER_FAILED", () => {
        expect(reducer(INITIAL_STATE, {
            type: action.REGISTER_USER_FAILED,
        }))
            .toEqual({
                ...INITIAL_STATE,
                registerRequest: false,
                registerFailed: true,
                registerSuccess: false,
                isCurrentUserAuth: false,
            });
    });

    // EDIT PROFILE //

    it("can handle EDIT_PROFILE_REQUEST", () => {
        expect(reducer(INITIAL_STATE, {
            type: action.EDIT_PROFILE_REQUEST,
        }))
            .toEqual({
                ...INITIAL_STATE,
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
        expect(reducer(INITIAL_STATE, {
            type: action.EDIT_PROFILE_SUCCESS,
            payload: currentUser
        }))
            .toEqual({
                ...INITIAL_STATE,
                editProfileRequest: false,
                editProfileFailed: false,
                editProfileSuccess: true,
                currentUser,
                isCurrentUserAuth: true,
            });
    });

    it("can handle EDIT_PROFILE_FAILED", () => {
        expect(reducer(INITIAL_STATE, {
            type: action.EDIT_PROFILE_FAILED,
        }))
            .toEqual({
                ...INITIAL_STATE,
                editProfileRequest: false,
                editProfileFailed: true,
                editProfileSuccess: false,
                isCurrentUserAuth: false,
            });
    });
});