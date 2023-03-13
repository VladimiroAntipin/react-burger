import { RegisterRequestData, SignInRequestData, SignInResponse, UserData, UserResponse } from "./types";
import { BASE_URL } from "../services/reducers/fetchReducer";
import { checkResponse } from "./checkResponse";
import { fetchWithRefreshToken } from "./fetchWithRefreshToken";

export const getUserInfo = (accessToken: string) =>
  fetchWithRefreshToken<UserResponse>(`${BASE_URL}auth/user`, {
    method: "GET",
    headers: {
      Authorization: accessToken,
      "Content-Type": "application/json",
    },
  });

export const setUserInfo = (data: UserData, accessToken: string) =>
  fetchWithRefreshToken<UserResponse>(`${BASE_URL}auth/user`, {
    method: "PATCH",
    headers: {
      Authorization: accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

export const signOut = () => {
  return fetch(`${BASE_URL}auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(checkResponse);
};

export const signIn = (data: SignInRequestData) => {
  return fetch(`${BASE_URL}auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(checkResponse<SignInResponse>);
};

export const resetPassword = async (data: { email: string }) =>
  fetch(`${BASE_URL}password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(checkResponse);

export const updatePassword = async (data: {
  password: string;
  token: string;
}) =>
  fetch(`${BASE_URL}password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(checkResponse);

export const register = (data: RegisterRequestData) => {
  return fetch(`${BASE_URL}auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(checkResponse);
};