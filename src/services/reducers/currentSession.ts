import { UserData } from "../../utils/types";

import {
  EDIT_PROFILE_FAILED,
  EDIT_PROFILE_REQUEST,
  EDIT_PROFILE_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  GET_CURRENT_USER_FAILED,
  GET_CURRENT_USER_REQUEST,
  GET_CURRENT_USER_SUCCESS,
  LOGIN_USER_FAILED,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_SUCCESS,
  RECOVER_PASSWORD_FAILED,
  RECOVER_PASSWORD_REQUEST,
  RECOVER_PASSWORD_SUCCESS,
  REGISTER_USER_FAILED,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  SessionAction,
  TOKEN_CHECKED
} from "../actions/currentSessionActions";

export const initialState = {
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

export type CurrentSessionState = Omit<typeof initialState, "currentUser"> & {
  currentUser: null | UserData;
};

export const currentSessionReducer = (
  state: CurrentSessionState = initialState,
  action: SessionAction
): CurrentSessionState => {
  switch (action.type) {
    case TOKEN_CHECKED: {
      return {
        ...state,
        isCurrentUserChecked: true,
      };
    }
    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        isUserResetPassword: true,
        isAccountLoading: true,
        isCurrentUserAuth: false,
      };
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        isUserResetPassword: true,
        isAccountLoading: false,
        isCurrentUserAuth: false,
      };
    }
    case FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        isAccountLoading: false,
        isCurrentUserAuth: false,
      };
    }
    case GET_CURRENT_USER_REQUEST: {
      return {
        ...state,
        currentUserRequest: true,
        currentUserSuccess: false,
        currentUserFailed: false,
        isCurrentUserAuth: false,
      };
    }
    case GET_CURRENT_USER_SUCCESS: {
      return {
        ...state,
        currentUserRequest: false,
        currentUserSuccess: true,
        currentUserFailed: false,
        currentUser: action.payload,
        isCurrentUserAuth: true,
      };
    }
    case GET_CURRENT_USER_FAILED: {
      return {
        ...state,
        currentUserRequest: false,
        currentUserSuccess: false,
        currentUserFailed: true,
        isCurrentUserAuth: false,
        currentUser: null,
      };
    }
    case LOGIN_USER_REQUEST: {
      return {
        ...state,
        loginRequest: true,
        loginFailed: false,
        loginSuccess: false,
        isCurrentUserAuth: false,
      };
    }
    case LOGIN_USER_SUCCESS: {
      return {
        ...state,
        loginRequest: false,
        loginFailed: false,
        loginSuccess: true,
        currentUser: action.payload,
        isCurrentUserAuth: true,
      };
    }
    case LOGIN_USER_FAILED: {
      return {
        ...state,
        loginRequest: false,
        loginSuccess: false,
        loginFailed: true,
        isCurrentUserAuth: false,
      };
    }

    case LOGOUT_USER_SUCCESS: {
      return {
        ...state,
        currentUser: null,
        isCurrentUserAuth: false,
      };
    }

    case RECOVER_PASSWORD_REQUEST: {
      return {
        ...state,
        isUserResetPassword: false,
        isCurrentUserAuth: false,
      };
    }
    case RECOVER_PASSWORD_SUCCESS: {
      return {
        ...state,
        isUserResetPassword: true,
        isCurrentUserAuth: false,
      };
    }
    case RECOVER_PASSWORD_FAILED: {
      return {
        ...state,
        isUserResetPassword: false,
        isCurrentUserAuth: false,
      };
    }
    case REGISTER_USER_REQUEST: {
      return {
        ...state,
        registerRequest: true,
        registerFailed: false,
        registerSuccess: false,
        isCurrentUserAuth: false,
      };
    }
    case REGISTER_USER_SUCCESS: {
      return {
        ...state,
        registerRequest: false,
        registerFailed: false,
        registerSuccess: true,
        isCurrentUserAuth: false,
      };
    }
    case REGISTER_USER_FAILED: {
      return {
        ...state,
        registerRequest: false,
        registerFailed: true,
        registerSuccess: false,
        isCurrentUserAuth: false,
      };
    }
    case EDIT_PROFILE_REQUEST: {
      return {
        ...state,
        editProfileRequest: true,
        editProfileFailed: false,
        editProfileSuccess: false,
        isCurrentUserAuth: true,
      };
    }
    case EDIT_PROFILE_SUCCESS: {
      return {
        ...state,
        editProfileRequest: false,
        editProfileFailed: false,
        editProfileSuccess: true,
        currentUser: action.payload,
        isCurrentUserAuth: true,
      };
    }
    case EDIT_PROFILE_FAILED: {
      return {
        ...state,
        editProfileRequest: false,
        editProfileFailed: true,
        editProfileSuccess: false,
        isCurrentUserAuth: false,
      };
    }
    default: {
      return state;
    }
  }
};