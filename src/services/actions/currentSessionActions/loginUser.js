import { signIn } from "../../../utils/sessionApi";
import { GET_CURRENT_USER_SUCCESS } from "./getCurrentUser";

export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILED = "LOGIN_USER_FAILED";

export function loginUser(data, func) {
    return function (dispatch) {
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
                        currentUser: data.user,
                    });
                    dispatch({
                        type: GET_CURRENT_USER_SUCCESS,
                        currentUser: data.user,  
                    })
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
}