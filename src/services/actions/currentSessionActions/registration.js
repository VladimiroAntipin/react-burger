import { register } from "../../../utils/sessionApi";

export const REGISTER_USER_REQUEST = "REGISTER_USER_REQUEST";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAILED = "REGISTER_USER_FAILED";

export function registerUser(data, func, err) {
  return function (dispatch) {
    register(data)
      .then(() => {
        dispatch({
          type: REGISTER_USER_REQUEST,
        });
        dispatch({
          type: REGISTER_USER_SUCCESS,
        });
        func();
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: REGISTER_USER_FAILED,
        });
        err();
      });
  };
}