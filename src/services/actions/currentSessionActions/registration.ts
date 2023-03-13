import { register } from "../../../utils/sessionApi";
import { RegisterRequestData, ThunkActionS } from "../../../utils/types";

export const REGISTER_USER_REQUEST = "REGISTER_USER_REQUEST";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAILED = "REGISTER_USER_FAILED";

export type SessionRegisterAction = Record<
  "type",
  | typeof REGISTER_USER_REQUEST
  | typeof REGISTER_USER_SUCCESS
  | typeof REGISTER_USER_FAILED
>;

export const registerUser =
  (
    data: RegisterRequestData,
    func: () => void
  ): ThunkActionS<SessionRegisterAction> =>
    (dispatch) => {
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
        });
    };