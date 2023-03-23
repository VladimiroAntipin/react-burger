import { checkResponse } from "./checkResponse";
import { updateToken } from "./refreshToken";
import { Tokens } from "./tokens";
import { get } from "./typesChecks";


export const fetchWithRefreshToken = async <T>(
  url: string,
  options?: Omit<RequestInit, "headers"> & { headers?: Record<string, string> }
) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse<T>(res);
  } catch (err) {
    if (get(err, "message") === "jwt expired") {
      const refreshData = await updateToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      Tokens.value = {
        accessToken: refreshData.accessToken,
        refreshToken: refreshData.refreshToken,
      };
      options ??= {};
      options.headers ??= {};
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return await checkResponse<T>(res);
    } else {
      return Promise.reject(err);
    }
  }
};

type BaseOptions = Omit<RequestInit, "headers"> & {
  headers?: Record<string, string>;
};

type FetchEnchancedOptions =
  | BaseOptions
  | ({
      json: unknown;
    } & Omit<BaseOptions, "body">);

export const fetchEnchanced = async <T>(
  url: string,
  options?: FetchEnchancedOptions
) => {
  const accessToken = Tokens.accessToken;
  options ??= {};
  options.headers ??= {};
  if (accessToken) {
    options.headers.authorization = accessToken;
  }

  const newOptions = (() => {
    if ("json" in options) {
      return {
        ...options,
        headers: {
          ...options.headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(options.json),
      };
    }
    return options;
  })();

  return fetchWithRefreshToken<T>(url, newOptions);
};