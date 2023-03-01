import { updatePassword } from "../../../utils/sessionApi";

export const RECOVER_PASSWORD_REQUEST = "RECOVER_PASSWORD_REQUEST";
export const RECOVER_PASSWORD_SUCCESS = "RECOVER_PASSWORD_SUCCESS";
export const RECOVER_PASSWORD_FAILED = "RECOVER_PASSWORD_FAILED";

export function recoverPassword(data, func) {
    return function (dispatch) {
        dispatch({
            type: RECOVER_PASSWORD_REQUEST,
        });
        updatePassword(data)
            .then(() => {
                dispatch({
                    type: RECOVER_PASSWORD_SUCCESS,
                });
                func();
            })
            .catch((err) => {
                console.log(err);
                dispatch({
                    type: RECOVER_PASSWORD_FAILED,
                });
            });
    };
}