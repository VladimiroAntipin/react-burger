import { resetPassword } from "../../../utils/sessionApi";

export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILED = "FORGOT_PASSWORD_FAILED";

export function forgotPassword(data, func) {
    return function (dispatch) {
        dispatch({
            type: FORGOT_PASSWORD_REQUEST,
        });
        resetPassword(data)
            .then(() => {
                dispatch({
                    type: FORGOT_PASSWORD_SUCCESS,
                });
                func();
            })
            .catch((err) => {
                console.log(err);
                dispatch({
                    type: FORGOT_PASSWORD_FAILED,
                });
            });
    };
}