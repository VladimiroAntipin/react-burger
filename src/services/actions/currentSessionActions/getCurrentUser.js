import { getUserInfo } from "../../../utils/sessionApi";

export const GET_CURRENT_USER_REQUEST = "GET_CURRENT_USER_REQUEST";
export const GET_CURRENT_USER_SUCCESS = "GET_CURRENT_USER_SUCCESS";
export const GET_CURRENT_USER_FAILED = "GET_CURRENT_USER_FAILED";

export function getCurrentUser() {
  const JWT = localStorage.getItem("accessToken");
  return function (dispatch) {
    dispatch({
      type: GET_CURRENT_USER_REQUEST,
    });
    return getUserInfo(JWT)
      .then((data) => {
        dispatch({
          type: GET_CURRENT_USER_SUCCESS,
          currentUser: data.user,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_CURRENT_USER_FAILED,
        });
      });
  };
}
