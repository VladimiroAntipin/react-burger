import { setUserInfo } from "../../../utils/sessionApi";
import { ThunkActionS, UserData } from "../../../utils/types";

export const EDIT_PROFILE_REQUEST = "EDIT_PROFILE_REQUEST";
export const EDIT_PROFILE_SUCCESS = "EDIT_PROFILE_SUCCESS";
export const EDIT_PROFILE_FAILED = "EDIT_PROFILE_FAILED";

export type SessionEditProfileAction =
    | {
        type: typeof EDIT_PROFILE_FAILED | typeof EDIT_PROFILE_REQUEST;
    }
    | {
        type: typeof EDIT_PROFILE_SUCCESS;
        payload: UserData;
    };

export const editProfile = (
    data: UserData
): ThunkActionS<SessionEditProfileAction> => {
    const JWT = localStorage.getItem("accessToken");

    if (!JWT) {
        throw new Error("jwt should exist");
    }

    return async (dispatch) => {
        dispatch({
            type: EDIT_PROFILE_REQUEST,
        });
        try {
            const result = await setUserInfo(data, JWT);
            if (!result.success) {
                throw result;
            }
            dispatch({
                type: EDIT_PROFILE_SUCCESS,
                payload: result.user,
            });
        } catch (err) {
            console.log(err);
            dispatch({
                type: EDIT_PROFILE_FAILED,
            });
        }
    };
};
