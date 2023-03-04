import { getCurrentUser } from "./getCurrentUser";

export const USER_IS_AUTH = "USER_IS_AUTH";
export const USER_IS_NOT_AUTH = "USER_IS_NOT_AUTH";
export const TOKEN_CHECKED = "TOKEN_CHECKED";

export const checkUserAuth = () => (dispatch) => {
  if (localStorage.getItem("accessToken")) {
    dispatch(getCurrentUser()).finally(() => dispatch({ type: TOKEN_CHECKED }));
  } else {
    dispatch({ type: TOKEN_CHECKED });
  }
};