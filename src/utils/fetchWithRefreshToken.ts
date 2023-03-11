import { checkResponse } from "./checkResponse";
import { updateToken } from "./refreshToken";

export const fetchWithRefreshToken = async <T>(url: string, options?: RequestInit) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse<T>(res);
  } catch (err) {
    const error = err as {message: string};

    if (error.message === "jwt expired") {
      const refreshData = await updateToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }

      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);

      if (options?.headers) {
        (options.headers as Record<string, string>).authorization = refreshData.accessToken;
      }

      const res = await fetch(url, options);
      return await checkResponse<T>(res);
    } else {
      return Promise.reject(err);
    }
  }
};