import { getUserInfo } from "../../../utils/sessionApi";
import { ThunkActionS, UserData } from "../../../utils/types";

export const GET_CURRENT_USER_REQUEST = "GET_CURRENT_USER_REQUEST";
export const GET_CURRENT_USER_SUCCESS = "GET_CURRENT_USER_SUCCESS";
export const GET_CURRENT_USER_FAILED = "GET_CURRENT_USER_FAILED";

export type SessionGetCurrentUserAction =
  | {
    type: typeof GET_CURRENT_USER_REQUEST | typeof GET_CURRENT_USER_FAILED;
  }
  | {
    type: typeof GET_CURRENT_USER_SUCCESS;
    payload: UserData;
  };

export const getCurrentUser = (): ThunkActionS<SessionGetCurrentUserAction> => {
  return async (dispatch) => {
    dispatch({
      type: GET_CURRENT_USER_REQUEST,
    });
    try {
      const data = await getUserInfo();
      if (!data.success) {
        throw data;
      }
      dispatch({
        type: GET_CURRENT_USER_SUCCESS,
        payload: data.user,
      });
    } catch {
      dispatch({
        type: GET_CURRENT_USER_FAILED,
      });
    }
  };
};