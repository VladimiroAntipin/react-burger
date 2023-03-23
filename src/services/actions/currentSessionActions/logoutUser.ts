import { signOut } from "../../../utils/sessionApi";
import { Tokens } from "../../../utils/tokens";
import { ThunkActionS } from "../../../utils/types";

export const LOGOUT_USER_SUCCESS = "LOGOUT_USER_SUCCESS";

export type SessionLogoutAction = Record<"type", typeof LOGOUT_USER_SUCCESS>;

export const logoutUser =
  (): ThunkActionS<SessionLogoutAction> => (dispatch) => {
    signOut()
      .then(() => {
        dispatch({
          type: LOGOUT_USER_SUCCESS,
        });
        Tokens.delete();
      })
      .catch((err) => {
        alert(err);
      });
  };