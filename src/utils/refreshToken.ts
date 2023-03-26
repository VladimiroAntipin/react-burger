import { BASE_URL } from "../services/reducers/fetchReducer";
import { checkResponse } from "./checkResponse";
import { Tokens } from "./tokens";
import { get, isString } from "./typesChecks";

export type Credentials =
  | { success: false }
  | {
      success: true;
      accessToken: string;
      refreshToken: string;
    };

export const updateToken = () => {
  return fetch(`${BASE_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: getRefreshTokenFromLocalStorage(),
    }),
  }).then(checkResponse<Credentials>);
};

export const getRefreshTokenFromLocalStorage = () => {
  const refreshJwt = Tokens.refreshToken;
  if (!isString(refreshJwt)) {
    throw new Error("no refresh token");
  }

  return refreshJwt;
};

export function refreshToken() {
  updateToken()
    .then((data) => {
      const accessToken = get(data, "accessToken");
      if (isString(accessToken)) {
        Tokens.accessToken = accessToken;
      }
    })
    .catch((err) => {
      console.log(err);
    });
}