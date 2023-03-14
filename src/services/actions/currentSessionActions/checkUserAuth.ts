import { ThunkActionS } from "../../../utils/types";
import { getCurrentUser } from "./getCurrentUser";

export const TOKEN_CHECKED = "TOKEN_CHECKED";
export type SessionCheckAuthAction = {
  type: typeof TOKEN_CHECKED;
};

export const checkUserAuth =
  (): ThunkActionS<SessionCheckAuthAction> => (dispatch) => {
    if (localStorage.getItem("accessToken")) {
      dispatch(getCurrentUser() as any).finally(() =>
        dispatch({ type: TOKEN_CHECKED })
      );
    } else {
      dispatch({ type: TOKEN_CHECKED });
    }
  };