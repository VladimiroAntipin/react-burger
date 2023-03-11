import { checkResponse } from "./checkResponse";
import { BASE_URL } from "../services/reducers/fetchReducer";
import { getCurrentUser } from "../services/actions/currentSessionActions/getCurrentUser";

export type TCredentials = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}

export const updateToken = () => {
  return fetch(`${BASE_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(checkResponse<TCredentials>);
};

export function refreshToken() {
  localStorage.getItem("refreshToken");
  localStorage.removeItem("accessToken");
  updateToken()
    .then((data: any) => {
      localStorage.setItem("accessToken", data.accessToken);
      getCurrentUser();
    })
    .catch((err) => {
      console.log(err);
    });
}