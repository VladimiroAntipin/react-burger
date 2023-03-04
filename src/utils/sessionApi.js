import { BASE_URL } from "../services/reducers/fetchReducer";
import { checkResponse } from "./checkResponse";
import { fetchWithRefreshToken } from "./fetchWithRefreshToken";

export const getUserInfo = (accessToken) => {
  return fetchWithRefreshToken(`${BASE_URL}auth/user`, {
    method: "GET",
    headers: {
      Authorization: accessToken,
      "Content-Type": "application/json",
    },
  });
};

export const setUserInfo = (data, accessToken) => {
  return fetchWithRefreshToken(`${BASE_URL}auth/user`, {
    method: "PATCH",
    headers: {
      Authorization: accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

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

export const signIn = (data) => {
  return fetch(`${BASE_URL}auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(checkResponse);
};

export const resetPassword = (email) => {
  return fetch(`${BASE_URL}password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(email),
  }).then(checkResponse);
};

export const updatePassword = (data) => {
  return fetch(`${BASE_URL}password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(checkResponse);
};

export const register = (data) => {
  return fetch(`${BASE_URL}auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(checkResponse);
};
