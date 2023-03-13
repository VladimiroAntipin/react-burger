import { resetPassword } from "../../../utils/sessionApi";
import { ThunkActionS } from "../../../utils/types";

export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILED = "FORGOT_PASSWORD_FAILED";

export type SessionForgotAction = {
  type:
    | typeof FORGOT_PASSWORD_REQUEST
    | typeof FORGOT_PASSWORD_SUCCESS
    | typeof FORGOT_PASSWORD_FAILED;
};

export const forgotPassword =
  (
    data: { email: string },
    func: () => void
  ): ThunkActionS<SessionForgotAction> =>
  (dispatch) => {
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