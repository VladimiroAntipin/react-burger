import { checkResponse } from "./checkResponse";
import { BASE_URL } from "../services/reducers/fetchReducer";
import { getCurrentUser } from "../services/actions/currentSessionActions/getCurrentUser";

export const updateToken = () => {
    return fetch(`${BASE_URL}/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8", 
      },
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    }).then(checkResponse);
  };

export function refreshToken() {
    const refreshJwt = localStorage.getItem("refreshToken");
    localStorage.removeItem("accessToken");
    updateToken(refreshJwt)
        .then((data) => {
            localStorage.setItem("accessToken", data.accessToken);
            getCurrentUser();
        })
        .catch((err) => {
            console.log(err);
        });
}