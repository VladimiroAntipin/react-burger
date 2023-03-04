import { signOut } from "../../../utils/sessionApi";

export const LOGOUT_USER_REQUEST = "LOGOUT_USER_REQUEST";
export const LOGOUT_USER_SUCCESS = "LOGOUT_USER_SUCCESS";
export const LOGOUT_USER_FAILED = "LOGOUT_USER_FAILED";

export function logoutUser() {
  return function (dispatch) {
    signOut()
      .then(() => {
        dispatch({
          type: LOGOUT_USER_SUCCESS,
        });
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      })
      .catch((err) => {
        alert(err);
      });
  };
}
