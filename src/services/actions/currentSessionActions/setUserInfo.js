import { setUserInfo } from "../../../utils/sessionApi";

export const EDIT_PROFILE_REQUEST = "EDIT_PROFILE_REQUEST";
export const EDIT_PROFILE_SUCCESS = "EDIT_PROFILE_SUCCESS";
export const EDIT_PROFILE_FAILED = "EDIT_PROFILE_FAILED";

export function editProfile(data) {
    const JWT = localStorage.getItem("accessToken");
    return function (dispatch) {
        dispatch({
            type: EDIT_PROFILE_REQUEST,
        });
        return setUserInfo(data, JWT)
            .then((data) => {
                    dispatch({
                        type: EDIT_PROFILE_SUCCESS,
                        currentUser: data.user,
                    });  
            })
            .catch((err) => {
                console.log(err);
                dispatch({
                    type: EDIT_PROFILE_FAILED,
                });
            });
    };
}
