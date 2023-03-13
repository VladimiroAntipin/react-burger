import { updatePassword } from "../../../utils/sessionApi";
import { ThunkActionS } from "../../../utils/types";

export const RECOVER_PASSWORD_REQUEST = "RECOVER_PASSWORD_REQUEST";
export const RECOVER_PASSWORD_SUCCESS = "RECOVER_PASSWORD_SUCCESS";
export const RECOVER_PASSWORD_FAILED = "RECOVER_PASSWORD_FAILED";

export type SessionRecoverPasswordAction = Record<
    "type",
    | typeof RECOVER_PASSWORD_REQUEST
    | typeof RECOVER_PASSWORD_SUCCESS
    | typeof RECOVER_PASSWORD_FAILED
>;

export const recoverPassword =
    (
        data: { password: string; token: string },
        func: () => void
    ): ThunkActionS<SessionRecoverPasswordAction> =>
        (dispatch) => {
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