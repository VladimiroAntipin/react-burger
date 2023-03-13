import { signIn } from "../../../utils/sessionApi";
import { SignInRequestData, ThunkActionS, UserData } from "../../../utils/types";
import { GET_CURRENT_USER_SUCCESS, SessionGetCurrentUserAction } from "./getCurrentUser";

export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILED = "LOGIN_USER_FAILED";
export type SessionUserLoginAction =
    | {
        type: typeof LOGIN_USER_REQUEST | typeof LOGIN_USER_FAILED;
    }
    | {
        type: typeof LOGIN_USER_SUCCESS;
        payload: UserData;
    };

export const loginUser =
    (
        data: SignInRequestData,
        func: () => void
    ): ThunkActionS<SessionGetCurrentUserAction | SessionUserLoginAction> =>
        (dispatch) => {
            dispatch({
                type: LOGIN_USER_REQUEST,
            });
            signIn(data)
                .then((data) => {
                    if (data && data.success) {
                        localStorage.setItem("accessToken", data.accessToken);
                        localStorage.setItem("refreshToken", data.refreshToken);
                        dispatch({
                            type: LOGIN_USER_SUCCESS,
                            payload: data.user,
                        });
                        dispatch({
                            type: GET_CURRENT_USER_SUCCESS,
                            payload: data.user,
                        });
                        func();
                    } else {
                        dispatch({
                            type: LOGIN_USER_FAILED,
                        });
                    }
                })
                .catch((error) => {
                    console.log(error);
                    dispatch({
                        type: LOGIN_USER_FAILED,
                    });
                });
        };